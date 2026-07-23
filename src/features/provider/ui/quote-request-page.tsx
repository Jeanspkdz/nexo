"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { providerServices } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { shortId } from "@/shared/lib/ids";
import { formatCurrencyPEN } from "@/shared/lib/money";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function distributeEvenly(count: number, totalAmount: number) {
  if (count < 1) return [];
  const cents = Math.round(totalAmount * 100);
  const base = Math.floor(cents / count);
  return Array.from({ length: count }, (_, index) => ({
    label: `Cuota ${index + 1}`,
    amount: index === count - 1 ? (cents - base * (count - 1)) / 100 : base / 100,
    dueDate: "",
  }));
}

function QuoteForm({ providerId, requestId }: { providerId: string; requestId: string }) {
  const router = useRouter();
  const request = transactionStore.requests(providerId).find((item) => item.id === requestId);
  const customerEvent = request ? transactionStore.event(request.userEventId) : null;
  const services = providerServices.filter((service) =>
    request?.providerServiceIds.includes(service.id),
  );
  const [lines, setLines] = useState(() =>
    services.map((service) => ({
      serviceId: service.id,
      description: service.name,
      unit: service.unit,
      quantity:
        service.unit === "person"
          ? Math.max(service.minimumQuantity, customerEvent?.guestCount ?? 0)
          : service.minimumQuantity,
      unitPrice: service.currentUnitPrice,
    })),
  );
  const initialTotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const [installmentCount, setInstallmentCount] = useState(2);
  const [installments, setInstallments] = useState(() => distributeEvenly(2, initialTotal));
  const [error, setError] = useState<string | null>(null);
  const total = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);

  if (!request)
    return (
      <ProviderFrame providerId={providerId} active="requests">
        <section className="provider-empty">
          <h1>Solicitud no encontrada</h1>
          <p>Puede haber sido eliminada o ya no estar disponible.</p>
        </section>
      </ProviderFrame>
    );

  const updateLine = (serviceId: string, field: "quantity" | "unitPrice", value: number) => {
    const newTotal = lines.reduce((sum, line) => {
      const quantity = line.serviceId === serviceId && field === "quantity" ? value : line.quantity;
      const price = line.serviceId === serviceId && field === "unitPrice" ? value : line.unitPrice;
      return sum + quantity * price;
    }, 0);
    setLines((current) =>
      current.map((line) => (line.serviceId === serviceId ? { ...line, [field]: value } : line)),
    );
    if (installmentCount > 0) {
      setInstallments(distributeEvenly(installmentCount, newTotal));
    }
  };

  const updateInstallment = (
    index: number,
    field: "label" | "amount" | "dueDate",
    value: string | number,
  ) =>
    setInstallments((current) =>
      current.map((installment, currentIndex) =>
        currentIndex === index ? { ...installment, [field]: value } : installment,
      ),
    );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paymentInstallments = installments.map((installment, index) => ({
      id: `payment-${index + 1}`,
      label: String(data.get(`installment-${index}-label`)),
      amount: Number(data.get(`installment-${index}-amount`)),
      dueDate: String(data.get(`installment-${index}-due-date`)),
      status: "pending" as const,
    }));
    if (
      paymentInstallments.some((installment) => installment.amount <= 0) ||
      paymentInstallments.reduce((sum, installment) => sum + installment.amount, 0) !== total
    ) {
      setError(
        "Los importes de las cuotas deben ser mayores que cero y sumar el total de la cotización.",
      );
      return;
    }
    transactionStore.quoteRequest(requestId, {
      providerId,
      items: lines.map(({ serviceId, description, quantity, unit, unitPrice }) => ({
        providerServiceId: serviceId,
        description,
        quantity,
        unit,
        unitPrice,
      })),
      total,
      validUntil: String(data.get("validUntil")),
      paymentInstallments,
    });
    router.push(`/panel/${providerId}/cotizaciones`);
  };

  return (
    <ProviderFrame providerId={providerId} active="requests">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Solicitud #{shortId(request.id)}</p>
          <h1>Preparar propuesta</h1>
          <p>
            {customerEvent
              ? `${customerEvent.name} · ${customerEvent.date} · ${customerEvent.guestCount} invitados`
              : "Define servicios, pagos y vigencia antes de enviarla."}
          </p>
        </div>
      </div>
      <ol className="request-progress" aria-label="Estado de la solicitud">
        <li className="done">Solicitud enviada</li>
        <li className="current">Preparando propuesta</li>
        <li>Decisión del cliente</li>
      </ol>
      <form onSubmit={submit} className="quote-workbench-layout">
        <main>
          {customerEvent && (
            <section className="request-context">
              <h2>Contexto del evento</h2>
              <dl>
                <div>
                  <dt>Tipo</dt>
                  <dd>{customerEvent.type}</dd>
                </div>
                <div>
                  <dt>Ubicación</dt>
                  <dd>{customerEvent.location}</dd>
                </div>
                <div>
                  <dt>Servicios</dt>
                  <dd>{lines.length} solicitado(s)</dd>
                </div>
              </dl>
            </section>
          )}
          <section className="quote-line-editor">
            <h2>Servicios solicitados</h2>
            {lines.map((line) => (
              <fieldset key={line.serviceId}>
                <legend>{line.description}</legend>
                <label>
                  Cantidad
                  <input
                    type="text"
                    inputMode="numeric"
                    value={line.quantity || ""}
                    onChange={(event) => {
                      const cleaned = event.target.value.replace(/\D/g, "");
                      updateLine(line.serviceId, "quantity", cleaned === "" ? 0 : Number(cleaned));
                    }}
                  />
                </label>
                <label>
                  Precio unitario
                  <input
                    type="text"
                    inputMode="decimal"
                    value={line.unitPrice || ""}
                    onChange={(event) => {
                      const cleaned = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/^(\d*\.?\d{0,2}).*/, "$1");
                      updateLine(
                        line.serviceId,
                        "unitPrice",
                        cleaned === "" || cleaned === "." ? 0 : Number(cleaned),
                      );
                    }}
                  />
                </label>
                <output>Subtotal {formatCurrencyPEN(line.quantity * line.unitPrice)}</output>
              </fieldset>
            ))}
          </section>
          <section className="quote-payment-editor">
            <h2>Calendario de pagos</h2>
            <label className="installment-count">
              Cantidad de cuotas
              <input
                type="text"
                inputMode="numeric"
                value={installmentCount || ""}
                onChange={(event) => {
                  const cleaned = event.target.value.replace(/\D/g, "");
                  setInstallmentCount(cleaned === "" ? 0 : Number(cleaned));
                }}
                onBlur={() => {
                  const nextCount = Math.max(1, installmentCount || 1);
                  setInstallmentCount(nextCount);
                  setInstallments(distributeEvenly(nextCount, total));
                }}
              />
            </label>
            {installments.map((installment, index) => (
              <fieldset key={index}>
                <legend>Cuota {index + 1}</legend>
                <label>
                  Concepto
                  <input
                    name={`installment-${index}-label`}
                    value={installment.label}
                    required
                    onChange={(event) => updateInstallment(index, "label", event.target.value)}
                  />
                </label>
                <label>
                  Importe
                  <input
                    name={`installment-${index}-amount`}
                    type="text"
                    inputMode="decimal"
                    value={installment.amount || ""}
                    required
                    onChange={(event) => {
                      const cleaned = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/^(\d*\.?\d{0,2}).*/, "$1");
                      updateInstallment(
                        index,
                        "amount",
                        cleaned === "" || cleaned === "." ? 0 : Number(cleaned),
                      );
                    }}
                  />
                </label>
                <label>
                  Vencimiento
                  <input
                    name={`installment-${index}-due-date`}
                    type="date"
                    value={installment.dueDate}
                    required
                    onChange={(event) => updateInstallment(index, "dueDate", event.target.value)}
                  />
                </label>
              </fieldset>
            ))}
          </section>
        </main>
        <aside className="quote-submit-panel">
          <span>Resumen de la propuesta</span>
          <strong>{formatCurrencyPEN(total)}</strong>
          <label>
            Vencimiento de cotización
            <input name="validUntil" type="date" required />
          </label>
          <p>
            Cuotas:{" "}
            {formatCurrencyPEN(
              installments.reduce((sum, installment) => sum + installment.amount, 0),
            )}{" "}
            de {formatCurrencyPEN(total)}
          </p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="primary">Enviar propuesta</button>
          <small>El cliente verá este desglose y decidirá desde su evento.</small>
        </aside>
      </form>
    </ProviderFrame>
  );
}

export function QuoteRequestPage({
  providerId,
  requestId,
}: {
  providerId: string;
  requestId: string;
}) {
  return (
    <ProviderGate providerId={providerId}>
      <QuoteForm providerId={providerId} requestId={requestId} />
    </ProviderGate>
  );
}
