"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providerServices, type QuotationRequest } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatCurrencyPEN } from "@/shared/lib/money";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function quotesForProvider(providerId: string) {
  const quotes = transactionStore
    .requests(providerId)
    .flatMap((request) => transactionStore.quotesForEvent(request.userEventId))
    .filter((quote) => quote.providerId === providerId);
  return [...new Map(quotes.map((quote) => [quote.id, quote])).values()];
}

function Summary({ providerId }: { providerId: string }) {
  const [data, setData] = useState({
    requests: [] as QuotationRequest[],
    quotes: [] as ReturnType<typeof quotesForProvider>,
    contracts: [] as ReturnType<typeof transactionStore.contractsForProvider>,
  });

  useEffect(
    () =>
      setData({
        requests: transactionStore.requests(providerId),
        quotes: quotesForProvider(providerId),
        contracts: transactionStore.contractsForProvider(providerId),
      }),
    [providerId],
  );

  const pendingRequests = data.requests.filter((request) => request.status === "pending");
  const pendingInstallments = data.contracts
    .flatMap((contract) => contract.paymentInstallments)
    .filter((installment) => installment.status === "pending")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const metrics = [
    [
      "Servicios publicados",
      providerServices.filter((service) => service.providerId === providerId).length,
      `/panel/${providerId}/servicios`,
    ],
    ["Solicitudes pendientes", pendingRequests.length, `/panel/${providerId}/solicitudes`],
    ["Propuestas enviadas", data.quotes.length, `/panel/${providerId}/cotizaciones`],
    [
      "Contratos activos",
      data.contracts.filter((contract) => contract.status === "active").length,
      `/panel/${providerId}/contratos`,
    ],
  ] as const;

  return (
    <ProviderFrame providerId={providerId} active="summary">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Resumen</p>
          <h1>Tu operación de un vistazo</h1>
          <p>Prioriza solicitudes, propuestas y cobros sin perder el contexto de cada evento.</p>
        </div>
      </div>
      <div className="provider-summary-metrics">
        {metrics.map(([label, value, href]) => (
          <Link href={href} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <b>Revisar →</b>
          </Link>
        ))}
      </div>
      <div className="provider-summary-actions">
        <section>
          <h2>Solicitudes por responder</h2>
          {pendingRequests.length ? (
            pendingRequests.slice(0, 3).map((request) => {
              const event = transactionStore.event(request.userEventId);
              return (
                <Link
                  href={`/panel/${providerId}/solicitudes/${request.id}/cotizar`}
                  key={request.id}
                >
                  <span>{event?.name ?? "Evento sin nombre"}</span>
                  <strong>Preparar propuesta</strong>
                </Link>
              );
            })
          ) : (
            <p>No tienes solicitudes pendientes.</p>
          )}
        </section>
        <section>
          <h2>Próximos cobros</h2>
          {pendingInstallments.length ? (
            pendingInstallments.slice(0, 3).map((installment) => (
              <Link href={`/panel/${providerId}/contratos`} key={installment.id}>
                <span>
                  {installment.label} · {installment.dueDate || "Fecha por definir"}
                </span>
                <strong>{formatCurrencyPEN(installment.amount)}</strong>
              </Link>
            ))
          ) : (
            <p>No tienes cuotas pendientes.</p>
          )}
        </section>
      </div>
    </ProviderFrame>
  );
}

export function ProviderSummary({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Summary providerId={providerId} />
    </ProviderGate>
  );
}
