"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { eventTypes } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { ClientGate, useClientAccount } from "./client-gate";

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
    <section className="product-page client-new-event-page">
      <header className="flow-page-heading">
        <div>
          <p>Nuevo evento</p>
          <h1>Define lo esencial</h1>
          <span>
            Con estos datos prepararemos el contexto que verán los proveedores al responderte.
          </span>
        </div>
        <Link href="/mis-eventos" className="back-link">
          Volver a Mis eventos
        </Link>
      </header>
      <form className="event-setup-form" onSubmit={submit}>
        <fieldset>
          <legend>Datos del evento</legend>
          <div className="form-grid">
            <label className="full">
              Nombre del evento
              <input name="name" placeholder="Ej. Celebración de aniversario" required />
            </label>
            <label>
              Tipo
              <select name="type">
                {eventTypes.map((type) => (
                  <option key={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input name="date" type="date" required />
            </label>
            <label>
              Invitados
              <input name="guestCount" type="number" min="1" placeholder="80" required />
            </label>
            <label>
              Ubicación
              <input name="location" placeholder="Distrito o ciudad" required />
            </label>
          </div>
        </fieldset>
        <footer>
          <Link className="secondary" href="/mis-eventos">
            Cancelar
          </Link>
          <button className="primary">Guardar y continuar</button>
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
