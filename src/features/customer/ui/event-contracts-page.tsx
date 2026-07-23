"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providers } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { ClientGate } from "./client-gate";

export function EventContracts({ eventId }: { eventId: string }) {
  const [contracts, setContracts] = useState<ReturnType<typeof transactionStore.contracts>>([]);

  useEffect(() => setContracts(transactionStore.contracts(eventId)), [eventId]);

  const pending = contracts
    .flatMap((contract) => contract.paymentInstallments)
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="product-page client-contracts-page">
      <header className="flow-page-heading">
        <div>
          <p>Compromisos del evento</p>
          <h1>Contratos y pagos</h1>
          <span>Cada acuerdo mantiene sus condiciones y calendario de pago por separado.</span>
        </div>
        <Link className="secondary" href={`/mis-eventos/${eventId}`}>
          Volver al evento
        </Link>
      </header>
      {contracts.length ? (
        <>
          <aside className="payment-overview">
            <span>Próximos pagos pendientes</span>
            <strong>{formatPEN(pending)}</strong>
            <small>{contracts.length} contrato(s) confirmado(s)</small>
          </aside>
          <div className="contract-ledger">
            {contracts.map((contract) => (
              <article key={contract.id}>
                <header>
                  <div>
                    <span>Contrato confirmado</span>
                    <h2>
                      {providers.find((provider) => provider.id === contract.providerId)?.name}
                    </h2>
                  </div>
                  <strong>{formatPEN(contract.agreedTotal)}</strong>
                </header>
                <ul>
                  {contract.paymentInstallments.map((item) => (
                    <li key={item.id}>
                      <span>
                        <b>{item.label}</b>
                        <small>Vence {item.dueDate}</small>
                      </span>
                      <strong>{formatPEN(item.amount)}</strong>
                      <em
                        className={item.status === "pending" ? "status-neutral" : "status-success"}
                      >
                        {item.status === "pending" ? "Pendiente" : "Pagada"}
                      </em>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </>
      ) : (
        <section className="flow-empty">
          <h2>Aún no hay contratos</h2>
          <p>Cuando elijas una propuesta, su calendario de pagos aparecerá aquí.</p>
          <Link className="primary" href={`/mis-eventos/${eventId}/cotizaciones`}>
            Ver cotizaciones
          </Link>
        </section>
      )}
    </section>
  );
}

export function EventContractsPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <EventContracts eventId={eventId} />
    </ClientGate>
  );
}
