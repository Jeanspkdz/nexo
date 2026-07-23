"use client";

import { useEffect, useState } from "react";
import { transactionStore } from "@/features/transactions";
import { shortId } from "@/shared/lib/ids";
import { formatCurrencyPEN } from "@/shared/lib/money";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function Quotes({ providerId }: { providerId: string }) {
  const [quotes, setQuotes] = useState<ReturnType<typeof transactionStore.quotesForEvent>>([]);

  useEffect(() => {
    const requests = transactionStore.requests(providerId);
    setQuotes(
      requests
        .flatMap((request) => transactionStore.quotesForEvent(request.userEventId))
        .filter((quote) => quote.providerId === providerId),
    );
  }, [providerId]);

  return (
    <ProviderFrame providerId={providerId} active="quotes">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Seguimiento</p>
          <h1>Cotizaciones enviadas</h1>
          <p>Consulta las propuestas activas y la decisión que espera cada una.</p>
        </div>
      </div>
      {quotes.length ? (
        <div className="provider-quote-list">
          {quotes.map((quote) => (
            <article key={quote.id}>
              <div>
                <span className={`status-chip ${quote.status === "accepted" ? "success" : ""}`}>
                  {quote.status === "sent"
                    ? "En decisión"
                    : quote.status === "accepted"
                      ? "Aceptada"
                      : "No seleccionada"}
                </span>
                <small>Propuesta #{shortId(quote.id)}</small>
              </div>
              <div>
                <h2>{formatCurrencyPEN(quote.total)}</h2>
                <p>
                  {quote.items.length} línea{quote.items.length === 1 ? "" : "s"} · vigente hasta{" "}
                  {quote.validUntil || "sin fecha"}
                </p>
              </div>
              <dl>
                <div>
                  <dt>Pagos</dt>
                  <dd>
                    {quote.paymentInstallments.length} cuota
                    {quote.paymentInstallments.length === 1 ? "" : "s"}
                  </dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>{quote.status === "sent" ? "Esperando al cliente" : quote.status}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>No hay cotizaciones enviadas</h2>
          <p>Cuando envíes una propuesta desde una solicitud aparecerá aquí con su estado.</p>
        </section>
      )}
    </ProviderFrame>
  );
}

export function ProviderQuotes({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Quotes providerId={providerId} />
    </ProviderGate>
  );
}
