"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { UserEvent } from "@/features/marketplace";
import { providerServices } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";
import { Button, Checkbox } from "@/shared/ui";
import { ClientGate, useClientAccount } from "./client-gate";
import {
  backLink,
  customerPage,
  flowEmpty,
  flowHeading,
  primaryLink,
  secondaryLink,
} from "./customer-styles";

function RequestForm({ serviceId }: { serviceId: string }) {
  const account = useClientAccount();
  const router = useRouter();
  const service = providerServices.find((item) => item.id === serviceId);
  const sameProvider = providerServices.filter((item) => item.providerId === service?.providerId);
  const [activeEvent, setActiveEvent] = useState<UserEvent | null>(null);

  useEffect(() => setActiveEvent(transactionStore.selectedEvent(account.id)), [account.id]);

  if (!service) return null;
  if (!activeEvent)
    return (
      <section className={customerPage}>
        <section className={flowEmpty}>
          <h1>Elige un evento antes de solicitar</h1>
          <p>
            La cotización necesita fecha, ubicación e invitados para que la empresa pueda
            responderte.
          </p>
          <Link className={primaryLink} href="/mis-eventos">
            Ir a Mis eventos
          </Link>
        </section>
      </section>
    );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    transactionStore.createRequest({
      userEventId: activeEvent.id,
      providerId: service.providerId,
      providerServiceIds: data.getAll("serviceIds").map(String),
    });
    router.push(`/mis-eventos/${activeEvent.id}`);
  };

  return (
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <p>Enviar solicitud</p>
          <h1>Define lo que quieres cotizar</h1>
          <span>Selecciona los servicios que quieres incluir para {activeEvent.name}.</span>
        </div>
        <Link className={backLink} href={`/servicios/${service.id}`}>
          Volver al servicio
        </Link>
      </header>
      <div className="mb-6 grid gap-[0.28rem] rounded-nexo-surface border border-nexo-line bg-nexo-surface px-6 py-4">
        <span className="text-[0.85rem] text-nexo-muted">Evento activo</span>
        <strong className="text-nexo-plum-deep">{activeEvent.name}</strong>
        <small className="text-[0.85rem] text-nexo-muted">
          {activeEvent.date} · {activeEvent.guestCount} invitados · {activeEvent.location}
        </small>
      </div>
      <form className="grid w-full max-w-[48rem] gap-4" onSubmit={submit}>
        <fieldset className="m-0 grid gap-3 rounded-nexo-control border border-nexo-line p-4">
          <legend className="px-[0.35rem] font-bold text-nexo-plum-deep">
            Servicios de este proveedor
          </legend>
          {sameProvider.map((item) => (
            <label
              className="flex items-start gap-3 border-b border-nexo-line py-4 last:border-b-0"
              key={item.id}
            >
              <Checkbox name="serviceIds" value={item.id} defaultChecked={item.id === serviceId} />
              <span className="grid gap-1">
                <b>{item.name}</b>
                <small className="font-normal text-nexo-muted">
                  Desde {formatPEN(item.startingPrice)} · {item.priceUnit}
                </small>
              </span>
            </label>
          ))}
        </fieldset>
        <footer className="flex justify-end gap-3 max-[680px]:flex-col-reverse">
          <Link
            className={cn(secondaryLink, "max-[680px]:w-full")}
            href={`/servicios/${service.id}`}
          >
            Cancelar
          </Link>
          <Button className="max-[680px]:w-full" type="submit">
            Enviar solicitud
          </Button>
        </footer>
      </form>
    </section>
  );
}

export function RequestPage({ serviceId }: { serviceId: string }) {
  return (
    <ClientGate>
      <RequestForm serviceId={serviceId} />
    </ClientGate>
  );
}
