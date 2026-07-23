"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { UserEvent } from "@/features/marketplace";
import { providerServices } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { ClientGate, useClientAccount } from "./client-gate";

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
      <section className="product-page client-request-page">
        <section className="flow-empty">
          <h1>Elige un evento antes de solicitar</h1>
          <p>
            La cotización necesita fecha, ubicación e invitados para que la empresa pueda
            responderte.
          </p>
          <Link className="primary" href="/mis-eventos">
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
    <section className="product-page client-request-page">
      <header className="flow-page-heading">
        <div>
          <p>Enviar solicitud</p>
          <h1>Define lo que quieres cotizar</h1>
          <span>Selecciona los servicios que quieres incluir para {activeEvent.name}.</span>
        </div>
        <Link className="back-link" href={`/servicios/${service.id}`}>
          Volver al servicio
        </Link>
      </header>
      <div className="request-context-card">
        <span>Evento activo</span>
        <strong>{activeEvent.name}</strong>
        <small>
          {activeEvent.date} · {activeEvent.guestCount} invitados · {activeEvent.location}
        </small>
      </div>
      <form className="request-services-form" onSubmit={submit}>
        <fieldset>
          <legend>Servicios de este proveedor</legend>
          {sameProvider.map((item) => (
            <label key={item.id}>
              <input
                name="serviceIds"
                type="checkbox"
                value={item.id}
                defaultChecked={item.id === serviceId}
              />
              <span>
                <b>{item.name}</b>
                <small>
                  Desde {formatPEN(item.startingPrice)} · {item.priceUnit}
                </small>
              </span>
            </label>
          ))}
        </fieldset>
        <footer>
          <Link className="secondary" href={`/servicios/${service.id}`}>
            Cancelar
          </Link>
          <button className="primary">Enviar solicitud</button>
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
