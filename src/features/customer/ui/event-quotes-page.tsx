"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { providers } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui";
import { ClientGate } from "./client-gate";
import {
  customerPage,
  primaryLink,
  progressCurrent,
  progressDone,
  progressList,
  progressStep,
  statusNeutral,
} from "./customer-styles";

export function EventQuotes({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [quotes, setQuotes] = useState<ReturnType<typeof transactionStore.quotesForEvent>>([]);
  const event = transactionStore.event(eventId);

  useEffect(() => setQuotes(transactionStore.quotesForEvent(eventId)), [eventId]);

  if (!event)
    return (
      <section className={customerPage}>
        <p>Evento no encontrado.</p>
      </section>
    );
  if (!quotes.length)
    return (
      <section className={cn(customerPage, "grid max-w-[38rem] justify-items-start gap-4")}>
        <h1 className="m-0">Aún no tienes propuestas</h1>
        <p className="m-0 text-nexo-muted">
          Cuando un proveedor responda, verás aquí el desglose, las condiciones y el siguiente paso.
        </p>
        <Link className={primaryLink} href="/proveedores">
          Buscar proveedores
        </Link>
      </section>
    );

  return (
    <section className={cn(customerPage, "max-w-[1180px] pb-12")}>
      <header className="mb-6">
        <p className="mb-2 text-[0.85rem] font-[650] text-nexo-muted">Tu evento</p>
        <h1 className="mb-3 font-nexo-sans text-[2rem] leading-[1.15] tracking-[-0.02em] text-nexo-plum-deep">
          Tu decisión pendiente
        </h1>
        <span className="text-nexo-muted">
          {event.name} · {event.date} · {event.guestCount} invitados
        </span>
      </header>
      <ol className={progressList} aria-label="Estado de la solicitud">
        <li className={cn(progressStep, progressDone)}>Solicitud enviada</li>
        <li className={cn(progressStep, progressDone)}>Propuesta recibida</li>
        <li className={cn(progressStep, progressCurrent)}>Decisión pendiente</li>
      </ol>
      <div className="grid grid-cols-[15rem_minmax(0,1fr)] items-start gap-8 max-[820px]:grid-cols-1 max-[820px]:gap-6">
        <div
          className="border-t border-nexo-line max-[820px]:flex max-[820px]:overflow-x-auto"
          aria-label="Propuestas recibidas"
        >
          {quotes.map((quote) => (
            <button
              key={quote.id}
              className="flex min-h-20 w-full justify-between gap-3 border-0 border-b border-nexo-line bg-transparent py-4 text-left text-nexo-plum-deep hover:text-nexo-plum max-[820px]:min-w-60 max-[820px]:border"
              type="button"
            >
              <span className="grid gap-1">
                <strong>
                  {providers.find((provider) => provider.id === quote.providerId)?.name ??
                    "Proveedor"}
                </strong>
                <small className="grid gap-1 text-[0.82rem] font-normal text-nexo-muted">
                  {quote.items.length} servicio(s) cotizado(s) · vence {quote.validUntil}
                </small>
              </span>
              <b className="tabular-nums">{formatPEN(quote.total)}</b>
            </button>
          ))}
        </div>
        {quotes.map((quote) => (
          <article
            className="overflow-hidden rounded-nexo-surface border border-nexo-line bg-nexo-white"
            key={`detail-${quote.id}`}
          >
            <header className="flex justify-between gap-4 border-b border-nexo-line p-6">
              <div>
                <p className="mb-2 text-[0.85rem] font-[650] text-nexo-muted">Propuesta recibida</p>
                <h2 className="m-0 font-nexo-sans text-xl text-nexo-plum-deep">
                  {providers.find((provider) => provider.id === quote.providerId)?.name ??
                    "Proveedor"}
                </h2>
                <span className="text-[0.85rem] text-nexo-muted">Solicitud {quote.requestId}</span>
              </div>
              <span className={statusNeutral}>
                {quote.status === "accepted" ? "Confirmada" : "En revisión"}
              </span>
            </header>
            <section className="p-6" aria-labelledby={`items-${quote.id}`}>
              <h3
                className="mb-3 font-nexo-sans text-base text-nexo-plum-deep"
                id={`items-${quote.id}`}
              >
                Resumen de la propuesta
              </h3>
              {quote.items.map((item, index) => (
                <div
                  className="flex justify-between gap-4 border-b border-nexo-line py-3"
                  key={`${quote.id}-${index}`}
                >
                  <span className="grid gap-1">
                    {item.description}
                    <small className="text-nexo-muted">
                      {item.quantity} {item.unit} × {formatPEN(item.unitPrice)}
                    </small>
                  </span>
                  <b className="tabular-nums">{formatPEN(item.quantity * item.unitPrice)}</b>
                </div>
              ))}
            </section>
            <section className="grid grid-cols-2 border-y border-nexo-line bg-nexo-surface max-[620px]:grid-cols-1">
              <div className="grid gap-2 px-6 py-4">
                <span className="text-[0.85rem] text-nexo-muted">Total</span>
                <strong>{formatPEN(quote.total)}</strong>
              </div>
              <div className="grid gap-2 border-l border-nexo-line px-6 py-4 max-[620px]:border-t max-[620px]:border-l-0">
                <span className="text-[0.85rem] text-nexo-muted">Vigencia</span>
                <strong>Hasta {quote.validUntil}</strong>
              </div>
            </section>
            <section className="p-6" aria-labelledby={`payments-${quote.id}`}>
              <h3
                className="mb-3 font-nexo-sans text-base text-nexo-plum-deep"
                id={`payments-${quote.id}`}
              >
                Términos de pago
              </h3>
              {quote.paymentInstallments.map((item) => (
                <div
                  className="flex justify-between gap-4 border-b border-nexo-line py-3"
                  key={item.id}
                >
                  <span className="grid gap-1">
                    {item.label}
                    <small className="text-nexo-muted">Vence {item.dueDate}</small>
                  </span>
                  <b className="tabular-nums">{formatPEN(item.amount)}</b>
                </div>
              ))}
            </section>
            <footer className="flex justify-end gap-3 p-6 max-[620px]:flex-col-reverse">
              <Button
                className="max-[620px]:w-full"
                variant="secondary"
                type="button"
                onClick={() => router.push(`/mis-eventos/${eventId}`)}
              >
                Volver al evento
              </Button>
              {quote.status === "sent" && (
                <Button
                  className="max-[620px]:w-full"
                  onClick={() => {
                    transactionStore.acceptQuote(quote.id);
                    setQuotes(transactionStore.quotesForEvent(eventId));
                    router.push(`/mis-eventos/${eventId}/contratos`);
                  }}
                >
                  Elegir propuesta
                </Button>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventQuotesPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <EventQuotes eventId={eventId} />
    </ClientGate>
  );
}
