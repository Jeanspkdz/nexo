"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserEvent } from "@/features/marketplace/domain/models";
import { transactionStore } from "@/features/transactions";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { ClientGate, useClientAccount } from "./client-gate";
import {
  customerPage,
  flowEmpty,
  flowHeading,
  primaryLink,
  secondaryLink,
} from "./customer-styles";

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
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <p>Planificación</p>
          <h1>Mis eventos</h1>
          <span>
            Selecciona el evento que estás organizando para mantener solicitudes, propuestas y pagos
            en un mismo lugar.
          </span>
        </div>
        <Link className={cn(primaryLink, "max-[680px]:w-full")} href="/mis-eventos/nuevo">
          Crear evento
        </Link>
      </header>
      <div className="border-t border-nexo-line" />
      {events.length === 0 ? (
        <section className={flowEmpty}>
          <h2>Tu planificación empieza aquí</h2>
          <p>Crea un evento para reunir tus solicitudes, cotizaciones y contratos.</p>
          <Link className={secondaryLink} href="/mis-eventos/nuevo">
            Crear mi primer evento
          </Link>
        </section>
      ) : (
        <ul className="m-0 list-none border-t border-nexo-line p-0">
          {events.map((event) => (
            <li
              className="flex items-center justify-between gap-4 border-b border-nexo-line py-4 max-[680px]:flex-col max-[680px]:items-start"
              key={event.id}
            >
              <div className="grid gap-[0.28rem]">
                <span className="text-[0.85rem] font-[650] text-nexo-muted">{event.date}</span>
                <strong className="text-[1.1rem] text-nexo-plum-deep">{event.name}</strong>
                <small className="text-nexo-muted">
                  {event.type} · {event.guestCount} invitados · {event.location}
                </small>
              </div>
              <Button
                className={cn("max-[680px]:w-full", selected === event.id && "bg-nexo-surface")}
                variant="secondary"
                onClick={() => {
                  transactionStore.selectEvent(account.id, event.id);
                  setSelected(event.id);
                  router.push(`/mis-eventos/${event.id}`);
                }}
              >
                {selected === event.id ? "Evento activo" : "Abrir evento"}
              </Button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-8 inline-flex min-h-10 items-center border-0 bg-transparent p-0 font-[650] text-nexo-plum underline"
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
