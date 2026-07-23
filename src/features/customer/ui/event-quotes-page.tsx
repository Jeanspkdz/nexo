"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { providers } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { ClientGate } from "./client-gate";

export function EventQuotes({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [quotes, setQuotes] = useState<ReturnType<typeof transactionStore.quotesForEvent>>([]);
  const event = transactionStore.event(eventId);

  useEffect(() => setQuotes(transactionStore.quotesForEvent(eventId)), [eventId]);

  if (!event)
    return (
      <section className="product-page">
        <p>Evento no encontrado.</p>
      </section>
    );
  if (!quotes.length)
    return (
      <section className="product-page decision-empty">
        <h1>Aún no tienes propuestas</h1>
        <p>
          Cuando un proveedor responda, verás aquí el desglose, las condiciones y el siguiente paso.
        </p>
        <Link className="primary" href="/proveedores">
          Buscar proveedores
        </Link>
      </section>
    );

  return (
    <section className="product-page quote-decision-page">
      <header className="decision-context">
        <p>Tu evento</p>
        <h1>Tu decisión pendiente</h1>
        <span>
          {event.name} · {event.date} · {event.guestCount} invitados
        </span>
      </header>
      <ol className="request-progress" aria-label="Estado de la solicitud">
        <li className="done">Solicitud enviada</li>
        <li className="done">Propuesta recibida</li>
        <li className="current">Decisión pendiente</li>
      </ol>
      <div className="quote-decision-layout">
        <div className="quote-decision-list" aria-label="Propuestas recibidas">
          {quotes.map((quote) => (
            <button key={quote.id} className="quote-choice" type="button">
              <span>
                <strong>
                  {providers.find((provider) => provider.id === quote.providerId)?.name ??
                    "Proveedor"}
                </strong>
                <small>
                  {quote.items.length} servicio(s) cotizado(s) · vence {quote.validUntil}
                </small>
              </span>
              <b>{formatPEN(quote.total)}</b>
            </button>
          ))}
        </div>
        {quotes.map((quote) => (
          <article className="quote-decision-document" key={`detail-${quote.id}`}>
            <header>
              <div>
                <p>Propuesta recibida</p>
                <h2>
                  {providers.find((provider) => provider.id === quote.providerId)?.name ??
                    "Proveedor"}
                </h2>
                <span>Solicitud {quote.requestId}</span>
              </div>
              <span className="status-neutral">
                {quote.status === "accepted" ? "Confirmada" : "En revisión"}
              </span>
            </header>
            <section className="quote-decision-items" aria-labelledby={`items-${quote.id}`}>
              <h3 id={`items-${quote.id}`}>Resumen de la propuesta</h3>
              {quote.items.map((item, index) => (
                <div key={`${quote.id}-${index}`}>
                  <span>
                    {item.description}
                    <small>
                      {item.quantity} {item.unit} × {formatPEN(item.unitPrice)}
                    </small>
                  </span>
                  <b>{formatPEN(item.quantity * item.unitPrice)}</b>
                </div>
              ))}
            </section>
            <section className="quote-decision-terms">
              <div>
                <span>Total</span>
                <strong>{formatPEN(quote.total)}</strong>
              </div>
              <div>
                <span>Vigencia</span>
                <strong>Hasta {quote.validUntil}</strong>
              </div>
            </section>
            <section className="quote-decision-payments" aria-labelledby={`payments-${quote.id}`}>
              <h3 id={`payments-${quote.id}`}>Términos de pago</h3>
              {quote.paymentInstallments.map((item) => (
                <div key={item.id}>
                  <span>
                    {item.label}
                    <small>Vence {item.dueDate}</small>
                  </span>
                  <b>{formatPEN(item.amount)}</b>
                </div>
              ))}
            </section>
            <footer>
              <button
                className="secondary"
                type="button"
                onClick={() => router.push(`/mis-eventos/${eventId}`)}
              >
                Volver al evento
              </button>
              {quote.status === "sent" && (
                <button
                  className="primary"
                  onClick={() => {
                    transactionStore.acceptQuote(quote.id);
                    setQuotes(transactionStore.quotesForEvent(eventId));
                    router.push(`/mis-eventos/${eventId}/contratos`);
                  }}
                >
                  Elegir propuesta
                </button>
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
