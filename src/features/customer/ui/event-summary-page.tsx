"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providers, type UserEvent } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { cn } from "@/shared/lib/cn";
import { ClientGate, useClientAccount } from "./client-gate";
import {
  customerPage,
  primaryLink,
  progressCurrent,
  progressDone,
  progressList,
  progressStep,
  secondaryLink,
  statusNeutral,
  statusSuccess,
} from "./customer-styles";

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
      <section className={customerPage}>
        <p>Evento no encontrado.</p>
        <Link href="/mis-eventos">Volver a Mis eventos</Link>
      </section>
    );

  return (
    <section className={customerPage}>
      <header className="flex items-center justify-between gap-6 rounded-nexo-surface border border-nexo-line bg-nexo-surface p-8 max-[680px]:flex-col max-[680px]:items-stretch">
        <div className="max-w-[44rem]">
          <p className="mb-[0.55rem] text-[0.82rem] font-[750] text-nexo-plum">Evento activo</p>
          <h1 className="m-0 text-4xl leading-[1.1] tracking-[-0.025em] text-nexo-plum-deep">
            {event.name}
          </h1>
          <span className="mt-3 block text-nexo-muted">
            {event.type} · {event.date} · {event.guestCount} invitados · {event.location}
          </span>
        </div>
        <Link className={cn(primaryLink, "max-[680px]:w-full")} href="/proveedores">
          Buscar proveedores
        </Link>
      </header>
      <ol className={progressList} aria-label="Progreso del evento">
        <li className={cn(progressStep, progressDone)}>Explorar servicios</li>
        <li className={cn(progressStep, requests.length ? progressDone : progressCurrent)}>
          Solicitudes
        </li>
        <li className={cn(progressStep, quotes && progressCurrent)}>Propuestas</li>
        <li className={cn(progressStep, contracts && progressDone)}>Contratos</li>
      </ol>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_17rem] gap-6 max-[680px]:grid-cols-1">
        <section className="border-t border-nexo-line">
          <header className="flex items-center justify-between gap-4 border-b border-nexo-line py-6 max-[680px]:flex-col max-[680px]:items-stretch">
            <div>
              <p className="mb-[0.55rem] text-[0.82rem] font-[750] text-nexo-plum">
                Siguiente tarea
              </p>
              <h2 className="m-0 text-[1.2rem]">
                {quotes ? "Revisa tus propuestas" : "Solicita servicios para tu evento"}
              </h2>
            </div>
            <Link
              className={cn(secondaryLink, "max-[680px]:w-full")}
              href={quotes ? `/mis-eventos/${eventId}/cotizaciones` : "/proveedores"}
            >
              {quotes ? "Ver cotizaciones" : "Explorar proveedores"}
            </Link>
          </header>
          <h2 className="my-6 mb-3 text-base">Solicitudes enviadas</h2>
          {requests.length ? (
            <ul className="list-none border-t border-nexo-line p-0">
              {requests.map((request) => (
                <li
                  className="flex justify-between gap-4 border-b border-nexo-line py-4"
                  key={request.id}
                >
                  <span className="grid gap-1">
                    <strong>
                      {providers.find((provider) => provider.id === request.providerId)?.name}
                    </strong>
                    <small className="text-nexo-muted">Solicitud {request.id}</small>
                  </span>
                  <em className={request.status === "pending" ? statusNeutral : statusSuccess}>
                    {request.status === "pending" ? "Pendiente de respuesta" : "Cotizada"}
                  </em>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-nexo-muted">
              Aún no has enviado solicitudes. Empieza explorando proveedores.
            </p>
          )}
        </section>
        <aside className="self-start rounded-nexo-surface border border-nexo-line p-6">
          <h2 className="mt-0 mb-3 text-base">Resumen del evento</h2>
          <dl className="mb-4">
            <div className="flex justify-between border-b border-nexo-line py-3">
              <dt className="text-nexo-muted">Solicitudes</dt>
              <dd className="m-0 font-[750]">{requests.length}</dd>
            </div>
            <div className="flex justify-between border-b border-nexo-line py-3">
              <dt className="text-nexo-muted">Propuestas</dt>
              <dd className="m-0 font-[750]">{quotes}</dd>
            </div>
            <div className="flex justify-between border-b border-nexo-line py-3">
              <dt className="text-nexo-muted">Contratos</dt>
              <dd className="m-0 font-[750]">{contracts}</dd>
            </div>
          </dl>
          <Link
            className="flex min-h-10 items-center font-bold text-nexo-plum no-underline"
            href={`/mis-eventos/${eventId}/cotizaciones`}
          >
            Gestionar cotizaciones
          </Link>
          <Link
            className="flex min-h-10 items-center font-bold text-nexo-plum no-underline"
            href={`/mis-eventos/${eventId}/contratos`}
          >
            Ver contratos y pagos
          </Link>
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
