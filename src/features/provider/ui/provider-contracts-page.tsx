"use client";

import { useEffect, useState } from "react";
import { transactionStore } from "@/features/transactions";
import { shortId } from "@/shared/lib/ids";
import { formatCurrencyPEN } from "@/shared/lib/money";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function Contracts({ providerId }: { providerId: string }) {
  const [contracts, setContracts] = useState<
    ReturnType<typeof transactionStore.contractsForProvider>
  >([]);

  useEffect(() => setContracts(transactionStore.contractsForProvider(providerId)), [providerId]);

  return (
    <ProviderFrame providerId={providerId} active="contracts">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Operación</p>
          <h1>Contratos y pagos</h1>
          <p>Consulta qué se acordó, para qué evento y cómo avanza cada calendario de cobro.</p>
        </div>
      </div>
      {contracts.length ? (
        <div className="provider-contract-list">
          {contracts.map((contract) => {
            const event = transactionStore.event(contract.userEventId);
            const paid = contract.paymentInstallments
              .filter((item) => item.status === "paid")
              .reduce((sum, item) => sum + item.amount, 0);
            const balance = contract.agreedTotal - paid;
            const next = contract.paymentInstallments
              .filter((item) => item.status === "pending")
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
            return (
              <article key={contract.id}>
                <header>
                  <div>
                    <span className="status-chip success">Contrato activo</span>
                    <h2>{event?.name ?? `Contrato #${shortId(contract.id)}`}</h2>
                    <small>
                      Contrato #{shortId(contract.id)} · creado{" "}
                      {new Date(contract.createdAt).toLocaleDateString("es-PE")}
                    </small>
                  </div>
                  <strong>{formatCurrencyPEN(contract.agreedTotal)}</strong>
                </header>
                <dl className="provider-contract-context">
                  <div>
                    <dt>Evento</dt>
                    <dd>{event ? `${event.type} · ${event.date}` : "Información no disponible"}</dd>
                  </div>
                  <div>
                    <dt>Ubicación</dt>
                    <dd>{event?.location ?? "Por confirmar"}</dd>
                  </div>
                  <div>
                    <dt>Invitados</dt>
                    <dd>{event?.guestCount ?? "Por confirmar"}</dd>
                  </div>
                  <div>
                    <dt>Propuesta aceptada</dt>
                    <dd>#{shortId(contract.acceptedQuotationId)}</dd>
                  </div>
                </dl>
                <section className="provider-contract-services">
                  <h3>Servicios acordados</h3>
                  {contract.services.map((service) => (
                    <div key={service.providerServiceId}>
                      <span>
                        <strong>{service.nameSnapshot}</strong>
                        <small>
                          {service.quantity} {service.unit} × {formatCurrencyPEN(service.unitPrice)}
                        </small>
                      </span>
                      <b>{formatCurrencyPEN(service.subtotal)}</b>
                    </div>
                  ))}
                </section>
                <div className="provider-contract-totals">
                  <div>
                    <span>Pagado</span>
                    <strong>{formatCurrencyPEN(paid)}</strong>
                  </div>
                  <div>
                    <span>Saldo pendiente</span>
                    <strong>{formatCurrencyPEN(balance)}</strong>
                  </div>
                  <div>
                    <span>Próximo vencimiento</span>
                    <strong>{next?.dueDate || "Sin cuotas pendientes"}</strong>
                  </div>
                </div>
                <div className="provider-payment-table">
                  <div className="provider-payment-heading">
                    <span>Cuota</span>
                    <span>Vencimiento</span>
                    <span>Importe</span>
                    <span>Estado</span>
                  </div>
                  {contract.paymentInstallments.map((installment) => (
                    <div className="provider-payment-row" key={installment.id}>
                      <span>{installment.label}</span>
                      <span>{installment.dueDate || "Por definir"}</span>
                      <strong>{formatCurrencyPEN(installment.amount)}</strong>
                      <span
                        className={
                          installment.status === "paid" ? "status-chip success" : "status-chip"
                        }
                      >
                        {installment.status === "paid" ? "Pagada" : "Pendiente"}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>No hay contratos aceptados</h2>
          <p>
            Cuando un cliente elija una propuesta, el contrato, los servicios acordados y su
            calendario de pagos aparecerán aquí.
          </p>
        </section>
      )}
    </ProviderFrame>
  );
}

export function ProviderContracts({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Contracts providerId={providerId} />
    </ProviderGate>
  );
}
