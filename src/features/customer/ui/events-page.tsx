"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserEvent } from "@/features/marketplace/domain/models";
import { transactionStore } from "@/features/transactions";
import { ClientGate, useClientAccount } from "./client-gate";

function Events() {
  const account = useClientAccount();
  const router = useRouter();
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setEvents(transactionStore.events(account.id));
    setSelected(transactionStore.selectedEvent(account.id)?.id ?? null);
  }, [account.id]);

  return (
    <section className="product-page client-events-page">
      <header className="flow-page-heading">
        <div>
          <p>Planificación</p>
          <h1>Mis eventos</h1>
          <span>
            Selecciona el evento que estás organizando para mantener solicitudes, propuestas y pagos
            en un mismo lugar.
          </span>
        </div>
        <Link className="primary" href="/mis-eventos/nuevo">
          Crear evento
        </Link>
      </header>
      <div className="flow-rule" />
      {events.length === 0 ? (
        <section className="flow-empty">
          <h2>Tu planificación empieza aquí</h2>
          <p>Crea un evento para reunir tus solicitudes, cotizaciones y contratos.</p>
          <Link className="secondary" href="/mis-eventos/nuevo">
            Crear mi primer evento
          </Link>
        </section>
      ) : (
        <ul className="event-directory">
          {events.map((event) => (
            <li key={event.id}>
              <div>
                <span className="event-date">{event.date}</span>
                <strong>{event.name}</strong>
                <small>
                  {event.type} · {event.guestCount} invitados · {event.location}
                </small>
              </div>
              <button
                className={selected === event.id ? "secondary event-active" : "secondary"}
                onClick={() => {
                  transactionStore.selectEvent(account.id, event.id);
                  setSelected(event.id);
                  router.push(`/mis-eventos/${event.id}`);
                }}
              >
                {selected === event.id ? "Evento activo" : "Abrir evento"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="quiet-action"
        onClick={() => {
          transactionStore.reset();
          setEvents([]);
          setSelected(null);
        }}
      >
        Reiniciar datos de prueba
      </button>
    </section>
  );
}

export function EventsPage() {
  return (
    <ClientGate>
      <Events />
    </ClientGate>
  );
}
