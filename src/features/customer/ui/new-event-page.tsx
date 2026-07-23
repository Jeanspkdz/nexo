"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { eventTypes } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { cn } from "@/shared/lib/cn";
import { Button, Input } from "@/shared/ui";
import { ClientGate, useClientAccount } from "./client-gate";
import {
  backLink,
  customerPage,
  fieldControl,
  fieldLabel,
  flowHeading,
  secondaryLink,
} from "./customer-styles";

function NewEvent() {
  const account = useClientAccount();
  const router = useRouter();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const record = transactionStore.saveEvent({
      userId: account.id,
      name: String(data.get("name")),
      type: String(data.get("type")),
      date: String(data.get("date")),
      guestCount: Number(data.get("guestCount")),
      location: String(data.get("location")),
    });
    router.push(`/mis-eventos/${record.id}`);
  };

  return (
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <p>Nuevo evento</p>
          <h1>Define lo esencial</h1>
          <span>
            Con estos datos prepararemos el contexto que verán los proveedores al responderte.
          </span>
        </div>
        <Link href="/mis-eventos" className={backLink}>
          Volver a Mis eventos
        </Link>
      </header>
      <form className="grid w-full max-w-[48rem] gap-4" onSubmit={submit}>
        <fieldset className="m-0 grid gap-3 rounded-nexo-control border border-nexo-line p-6">
          <legend className="px-[0.35rem] font-bold text-nexo-plum-deep">Datos del evento</legend>
          <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1">
            <label className={cn(fieldLabel, "col-span-full max-[680px]:col-span-1")}>
              Nombre del evento
              <Input
                className="min-h-11"
                name="name"
                placeholder="Ej. Celebración de aniversario"
                required
              />
            </label>
            <label className={fieldLabel}>
              Tipo
              <select className={fieldControl} name="type">
                {eventTypes.map((type) => (
                  <option key={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
            <label className={fieldLabel}>
              Fecha
              <Input className="min-h-11" name="date" type="date" required />
            </label>
            <label className={fieldLabel}>
              Invitados
              <Input
                className="min-h-11"
                name="guestCount"
                type="number"
                min="1"
                placeholder="80"
                required
              />
            </label>
            <label className={fieldLabel}>
              Ubicación
              <Input
                className="min-h-11"
                name="location"
                placeholder="Distrito o ciudad"
                required
              />
            </label>
          </div>
        </fieldset>
        <footer className="flex justify-end gap-3 max-[680px]:flex-col-reverse">
          <Link className={cn(secondaryLink, "max-[680px]:w-full")} href="/mis-eventos">
            Cancelar
          </Link>
          <Button className="max-[680px]:w-full" type="submit">
            Guardar y continuar
          </Button>
        </footer>
      </form>
    </section>
  );
}

export function NewEventPage() {
  return (
    <ClientGate>
      <NewEvent />
    </ClientGate>
  );
}
