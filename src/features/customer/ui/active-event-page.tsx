"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { transactionStore } from "@/features/transactions";
import { ClientGate, useClientAccount } from "./client-gate";
import { customerPage, flowEmpty, primaryLink, secondaryLink } from "./customer-styles";
import { EventContracts } from "./event-contracts-page";
import { EventQuotes } from "./event-quotes-page";
import { EventSummary } from "./event-summary-page";

type ActiveSection = "plan" | "quotes" | "payments";

function ActiveEvent({ section }: { section: ActiveSection }) {
  const account = useClientAccount();
  const [eventId, setEventId] = useState<string | null | undefined>(undefined);

  useEffect(() => setEventId(transactionStore.selectedEvent(account.id)?.id ?? null), [account.id]);

  if (eventId === undefined) return <section className={customerPage} aria-busy="true" />;
  if (!eventId) {
    const content = {
      plan: [
        "Elige un evento para empezar tu plan",
        "Aquí organizarás solicitudes, decisiones y próximos pasos.",
      ],
      quotes: [
        "Elige un evento para ver sus propuestas",
        "Las cotizaciones siempre se organizan dentro del evento al que pertenecen.",
      ],
      payments: [
        "Elige un evento para revisar sus pagos",
        "Los contratos, cuotas y saldos se mantienen separados por evento y proveedor.",
      ],
    }[section];

    return (
      <section className={customerPage}>
        <section className={flowEmpty}>
          <h1>{content[0]}</h1>
          <p>{content[1]}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={primaryLink} href="/mis-eventos">
              Seleccionar evento
            </Link>
            <Link className={secondaryLink} href="/mis-eventos/nuevo">
              Crear evento
            </Link>
          </div>
        </section>
      </section>
    );
  }

  if (section === "plan") return <EventSummary eventId={eventId} />;
  if (section === "quotes") return <EventQuotes eventId={eventId} />;
  return <EventContracts eventId={eventId} />;
}

export function ActivePlanPage() {
  return (
    <ClientGate>
      <ActiveEvent section="plan" />
    </ClientGate>
  );
}

export function ActiveQuotesPage() {
  return (
    <ClientGate>
      <ActiveEvent section="quotes" />
    </ClientGate>
  );
}

export function ActivePaymentsPage() {
  return (
    <ClientGate>
      <ActiveEvent section="payments" />
    </ClientGate>
  );
}
