"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providers, type UserEvent } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { ClientGate, useClientAccount } from "./client-gate";

export function EventSummary({ eventId }: { eventId: string }) {
  const account = useClientAccount();
  const [event, setEvent] = useState<UserEvent | null>(null);
  const [quotes, setQuotes] = useState(0);
  const [contracts, setContracts] = useState(0);
  const [requests, setRequests] = useState<ReturnType<typeof transactionStore.requestsForEvent>>(
    [],
  );

  useEffect(() => {
    const selected =
      transactionStore.events(account.id).find((item) => item.id === eventId) ?? null;
    setEvent(selected);
    setRequests(transactionStore.requestsForEvent(eventId));
    setQuotes(transactionStore.quotesForEvent(eventId).length);
    setContracts(transactionStore.contracts(eventId).length);
  }, [account.id, eventId]);

  if (!event)
    return (
      <section className="product-page">
        <p>Evento no encontrado.</p>
        <Link href="/mis-eventos">Volver a Mis eventos</Link>
      </section>
    );

  return (
    <section className="product-page client-event-page">
      <header className="event-command-header">
        <div>
          <p>Evento activo</p>
          <h1>{event.name}</h1>
          <span>
            {event.type} · {event.date} · {event.guestCount} invitados · {event.location}
          </span>
        </div>
        <Link className="primary" href="/proveedores">
          Buscar proveedores
        </Link>
      </header>
      <ol className="request-progress" aria-label="Progreso del evento">
        <li className="done">Explorar servicios</li>
        <li className={requests.length ? "done" : "current"}>Solicitudes</li>
        <li className={quotes ? "current" : ""}>Propuestas</li>
        <li className={contracts ? "done" : ""}>Contratos</li>
      </ol>
      <div className="event-work-grid">
        <section className="event-activity">
          <header>
            <div>
              <p>Siguiente tarea</p>
              <h2>{quotes ? "Revisa tus propuestas" : "Solicita servicios para tu evento"}</h2>
            </div>
            <Link
              className="secondary"
              href={quotes ? `/mis-eventos/${eventId}/cotizaciones` : "/proveedores"}
            >
              {quotes ? "Ver cotizaciones" : "Explorar proveedores"}
            </Link>
          </header>
          <h2>Solicitudes enviadas</h2>
          {requests.length ? (
            <ul className="request-register">
              {requests.map((request) => (
                <li key={request.id}>
                  <span>
                    <strong>
                      {providers.find((provider) => provider.id === request.providerId)?.name}
                    </strong>
                    <small>Solicitud {request.id}</small>
                  </span>
                  <em
                    className={request.status === "pending" ? "status-neutral" : "status-success"}
                  >
                    {request.status === "pending" ? "Pendiente de respuesta" : "Cotizada"}
                  </em>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-copy">
              Aún no has enviado solicitudes. Empieza explorando proveedores.
            </p>
          )}
        </section>
        <aside className="event-ledger">
          <h2>Resumen del evento</h2>
          <dl>
            <div>
              <dt>Solicitudes</dt>
              <dd>{requests.length}</dd>
            </div>
            <div>
              <dt>Propuestas</dt>
              <dd>{quotes}</dd>
            </div>
            <div>
              <dt>Contratos</dt>
              <dd>{contracts}</dd>
            </div>
          </dl>
          <Link href={`/mis-eventos/${eventId}/cotizaciones`}>Gestionar cotizaciones</Link>
          <Link href={`/mis-eventos/${eventId}/contratos`}>Ver contratos y pagos</Link>
        </aside>
      </div>
    </section>
  );
}

export function EventPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <EventSummary eventId={eventId} />
    </ClientGate>
  );
}
