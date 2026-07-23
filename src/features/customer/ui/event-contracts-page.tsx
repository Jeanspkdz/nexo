"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providers } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { formatPEN } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";
import { ClientGate } from "./client-gate";
import {
  customerPage,
  flowEmpty,
  flowHeading,
  primaryLink,
  secondaryLink,
  statusNeutral,
  statusSuccess,
} from "./customer-styles";

export function EventContracts({ eventId }: { eventId: string }) {
  const [contracts, setContracts] = useState<ReturnType<typeof transactionStore.contracts>>([]);

  useEffect(() => setContracts(transactionStore.contracts(eventId)), [eventId]);

  const pending = contracts
    .flatMap((contract) => contract.paymentInstallments)
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className={cn(customerPage, "max-w-[62rem]")}>
      <header className={flowHeading}>
        <div>
          <p>Compromisos del evento</p>
          <h1>Contratos y pagos</h1>
          <span>Cada acuerdo mantiene sus condiciones y calendario de pago por separado.</span>
        </div>
        <Link className={cn(secondaryLink, "max-[680px]:w-full")} href={`/mis-eventos/${eventId}`}>
          Volver al evento
        </Link>
      </header>
      {contracts.length ? (
        <>
          <aside className="mb-6 grid gap-[0.4rem] rounded-nexo-surface border border-nexo-line bg-nexo-surface p-6">
            <span className="text-nexo-muted">Próximos pagos pendientes</span>
            <strong className="text-[1.7rem] text-nexo-plum-deep">{formatPEN(pending)}</strong>
            <small className="text-nexo-muted">{contracts.length} contrato(s) confirmado(s)</small>
          </aside>
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <article
                className="rounded-nexo-surface border border-nexo-line bg-white p-6"
                key={contract.id}
              >
                <header className="flex items-center justify-between gap-4 max-[680px]:flex-col max-[680px]:items-start">
                  <div>
                    <span className="text-[0.85rem] text-nexo-muted">Contrato confirmado</span>
                    <h2 className="mt-1 mb-0 text-[1.2rem]">
                      {providers.find((provider) => provider.id === contract.providerId)?.name}
                    </h2>
                  </div>
                  <strong>{formatPEN(contract.agreedTotal)}</strong>
                </header>
                <ul className="mt-4 list-none border-t border-nexo-line p-0">
                  {contract.paymentInstallments.map((item) => (
                    <li
                      className="flex items-center justify-between gap-4 border-b border-nexo-line py-4 max-[680px]:flex-col max-[680px]:items-start"
                      key={item.id}
                    >
                      <span className="grid gap-[0.2rem]">
                        <b>{item.label}</b>
                        <small className="text-[0.85rem] text-nexo-muted">
                          Vence {item.dueDate}
                        </small>
                      </span>
                      <strong>{formatPEN(item.amount)}</strong>
                      <em className={item.status === "pending" ? statusNeutral : statusSuccess}>
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
        <section className={flowEmpty}>
          <h2>Aún no hay contratos</h2>
          <p>Cuando elijas una propuesta, su calendario de pagos aparecerá aquí.</p>
          <Link className={primaryLink} href={`/mis-eventos/${eventId}/cotizaciones`}>
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
