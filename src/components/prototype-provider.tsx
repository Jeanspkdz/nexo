"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { readSession } from "@/lib/auth-storage";
import { providerCategories, providers, providerServices } from "@/lib/mock-catalog";
import { prototypeStore } from "@/lib/prototype-store";
import type { QuotationRequest } from "@/domain/marketplace";
import { ProviderDashboardLayout } from "@/components/layouts/provider-dashboard-layout";

const money = (value: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);
const shortId = (id: string) => id.replace(/^[^-]+-/, "").slice(0, 8);

export function ProviderPanelRedirect() {
  const router = useRouter();
  useEffect(() => {
    const account = readSession();
    router.replace(
      account?.role === "company" && account.company ? `/panel/${account.company.id}` : "/login",
    );
  }, [router]);
  return null;
}

function Gate({ providerId, children }: { providerId: string; children: ReactNode }) {
  const router = useRouter();
  const [account, setAccount] = useState<ReturnType<typeof readSession>>(null);
  useEffect(() => {
    const account = readSession();
    if (!account || account.role !== "company" || account.company?.id !== providerId)
      router.replace("/login");
    else setAccount(account);
  }, [providerId, router]);
  return account?.company ? (
    <ProviderDashboardLayout companyId={providerId} companyName={account.company.name}>
      {children}
    </ProviderDashboardLayout>
  ) : null;
}

type ProviderSection = "summary" | "requests" | "quotes" | "services" | "contracts";

function ProviderFrame({
  providerId,
  children,
}: {
  providerId: string;
  active: ProviderSection;
  children: ReactNode;
}) {
  const company = providers.find((item) => item.id === providerId);
  return (
    <section className="product-page provider-flow">
      <header className="provider-flow-head">
        <div>
          <p className="provider-flow-kicker">Panel operativo</p>
          <strong>{company?.name ?? "Tu empresa"}</strong>
        </div>
      </header>
      {children}
    </section>
  );
}

function quotesForProvider(providerId: string) {
  const quotes = prototypeStore
    .requests(providerId)
    .flatMap((request) => prototypeStore.quotesForEvent(request.userEventId))
    .filter((quote) => quote.providerId === providerId);
  return [...new Map(quotes.map((quote) => [quote.id, quote])).values()];
}

export function ProviderSummary({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Summary providerId={providerId} />
    </Gate>
  );
}
function Summary({ providerId }: { providerId: string }) {
  const [data, setData] = useState({
    requests: [] as QuotationRequest[],
    quotes: [] as ReturnType<typeof quotesForProvider>,
    contracts: [] as ReturnType<typeof prototypeStore.contractsForProvider>,
  });
  useEffect(
    () =>
      setData({
        requests: prototypeStore.requests(providerId),
        quotes: quotesForProvider(providerId),
        contracts: prototypeStore.contractsForProvider(providerId),
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
              const event = prototypeStore.event(request.userEventId);
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
                <strong>{money(installment.amount)}</strong>
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

export function ProviderServices({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Services providerId={providerId} />
    </Gate>
  );
}
function Services({ providerId }: { providerId: string }) {
  const services = providerServices.filter((service) => service.providerId === providerId);
  const unitLabel = { person: "persona", hour: "hora", fixed: "servicio" } as const;
  return (
    <ProviderFrame providerId={providerId} active="services">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Catálogo vigente</p>
          <h1>Servicios</h1>
          <p>Consulta las ofertas publicadas por tu empresa y su precio mínimo contratable.</p>
        </div>
        <span className="provider-count">
          {services.length} servicio{services.length === 1 ? "" : "s"}
        </span>
      </div>
      {services.length ? (
        <div className="provider-service-list">
          {services.map((service) => (
            <article key={service.id}>
              <header>
                <div>
                  <span className="status-chip">
                    {
                      providerCategories.find((category) => category.id === service.categoryId)
                        ?.name
                    }
                  </span>
                  <h2>{service.name}</h2>
                </div>
                <strong>{money(service.currentUnitPrice * service.minimumQuantity)}</strong>
              </header>
              <dl>
                <div>
                  <dt>Precio vigente</dt>
                  <dd>
                    {money(service.currentUnitPrice)} por {unitLabel[service.unit]}
                  </dd>
                </div>
                <div>
                  <dt>Cantidad mínima</dt>
                  <dd>
                    {service.minimumQuantity} {unitLabel[service.unit]}
                    {service.minimumQuantity === 1 ? "" : "s"}
                  </dd>
                </div>
                <div>
                  <dt>Unidad</dt>
                  <dd>{service.unit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>Aún no hay servicios publicados</h2>
          <p>Los servicios de esta empresa aparecerán aquí cuando formen parte del catálogo.</p>
        </section>
      )}
    </ProviderFrame>
  );
}

export function ProviderProfile({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Profile providerId={providerId} />
    </Gate>
  );
}
function Profile({ providerId }: { providerId: string }) {
  const provider = providers.find((item) => item.id === providerId);
  return (
    <ProviderFrame providerId={providerId} active="summary">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Perfil público</p>
          <h1>{provider?.name ?? "Tu empresa"}</h1>
          <p>{provider?.description ?? "Completa la información pública de tu empresa."}</p>
        </div>
      </div>
      <dl className="provider-profile-facts">
        <div>
          <dt>Ubicación</dt>
          <dd>{provider?.location ?? "Por definir"}</dd>
        </div>
        <div>
          <dt>Cobertura</dt>
          <dd>{provider?.coverage ?? "Por definir"}</dd>
        </div>
        <div>
          <dt>Valoración</dt>
          <dd>
            {provider ? `${provider.rating} · ${provider.reviewCount} reseñas` : "Sin valoraciones"}
          </dd>
        </div>
      </dl>
    </ProviderFrame>
  );
}

export function ProviderRequests({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Requests providerId={providerId} />
    </Gate>
  );
}
function Requests({ providerId }: { providerId: string }) {
  const [requests, setRequests] = useState<QuotationRequest[]>([]);
  useEffect(() => setRequests(prototypeStore.requests(providerId)), [providerId]);
  const pending = requests.filter((request) => request.status === "pending").length;
  return (
    <ProviderFrame providerId={providerId} active="requests">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Bandeja de entrada</p>
          <h1>Solicitudes</h1>
          <p>Revisa el contexto antes de preparar una propuesta clara y completa.</p>
        </div>
        <span className="provider-count">
          {pending} pendiente{pending === 1 ? "" : "s"}
        </span>
      </div>
      {requests.length ? (
        <div className="provider-request-list">
          {requests.map((request) => {
            const event = prototypeStore.event(request.userEventId);
            const services = providerServices.filter((service) =>
              request.providerServiceIds.includes(service.id),
            );
            return (
              <article key={request.id} className="provider-request-row">
                <div className="provider-request-status">
                  <span
                    className={request.status === "quoted" ? "status-chip success" : "status-chip"}
                  >
                    {request.status === "quoted" ? "Propuesta enviada" : "Requiere cotización"}
                  </span>
                  <small>Solicitud #{shortId(request.id)}</small>
                </div>
                <div>
                  <h2>{event?.name ?? "Evento sin nombre"}</h2>
                  <p>
                    {event
                      ? `${event.type} · ${event.date} · ${event.guestCount} invitados`
                      : "El contexto del evento no está disponible."}
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Ubicación</dt>
                    <dd>{event?.location ?? "Por confirmar"}</dd>
                  </div>
                  <div>
                    <dt>Servicios</dt>
                    <dd>{services.map((service) => service.name).join(", ") || "Sin servicios"}</dd>
                  </div>
                </dl>
                <Link
                  className={request.status === "pending" ? "primary" : "secondary"}
                  href={`/panel/${providerId}/solicitudes/${request.id}${request.status === "pending" ? "/cotizar" : ""}`}
                >
                  {request.status === "pending" ? "Preparar propuesta" : "Ver solicitud"}
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>Aún no hay solicitudes</h2>
          <p>
            Las solicitudes de clientes aparecerán aquí con el evento, los servicios y la siguiente
            acción requerida.
          </p>
        </section>
      )}
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
    <Gate providerId={providerId}>
      <QuoteForm providerId={providerId} requestId={requestId} />
    </Gate>
  );
}
function QuoteForm({ providerId, requestId }: { providerId: string; requestId: string }) {
  const router = useRouter();
  const request = prototypeStore.requests(providerId).find((item) => item.id === requestId);
  const customerEvent = request ? prototypeStore.event(request.userEventId) : null;
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
  const [installments, setInstallments] = useState(() => {
    const advance = Math.round(initialTotal * 0.3);
    return [
      { label: "Adelanto", amount: advance, dueDate: "" },
      { label: "Saldo", amount: initialTotal - advance, dueDate: "" },
    ];
  });
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
  const updateLine = (serviceId: string, field: "quantity" | "unitPrice", value: number) =>
    setLines((current) =>
      current.map((line) => (line.serviceId === serviceId ? { ...line, [field]: value } : line)),
    );
  const selectInstallmentCount = (count: number) => {
    const nextCount = Math.max(1, Math.floor(count) || 1);
    setInstallmentCount(nextCount);
    setInstallments((current) =>
      Array.from(
        { length: nextCount },
        (_, index) => current[index] ?? { label: `Cuota ${index + 1}`, amount: 0, dueDate: "" },
      ),
    );
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
    prototypeStore.quoteRequest(requestId, {
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
                    type="number"
                    value={line.quantity}
                    min="1"
                    onChange={(event) =>
                      updateLine(line.serviceId, "quantity", Number(event.target.value))
                    }
                  />
                </label>
                <label>
                  Unidad
                  <input value={line.unit} readOnly />
                </label>
                <label>
                  Precio unitario
                  <input
                    type="number"
                    value={line.unitPrice}
                    min="0"
                    onChange={(event) =>
                      updateLine(line.serviceId, "unitPrice", Number(event.target.value))
                    }
                  />
                </label>
                <output>Subtotal {money(line.quantity * line.unitPrice)}</output>
              </fieldset>
            ))}
          </section>
          <section className="quote-payment-editor">
            <h2>Calendario de pagos</h2>
            <label className="installment-count">
              Cantidad de cuotas
              <input
                type="number"
                value={installmentCount}
                min="1"
                onChange={(event) => selectInstallmentCount(Number(event.target.value))}
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
                    type="number"
                    value={installment.amount}
                    min="1"
                    required
                    onChange={(event) =>
                      updateInstallment(index, "amount", Number(event.target.value))
                    }
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
          <strong>{money(total)}</strong>
          <label>
            Vencimiento de cotización
            <input name="validUntil" type="date" required />
          </label>
          <p>
            Cuotas: {money(installments.reduce((sum, installment) => sum + installment.amount, 0))}{" "}
            de {money(total)}
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

export function ProviderQuotes({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Quotes providerId={providerId} />
    </Gate>
  );
}
function Quotes({ providerId }: { providerId: string }) {
  const [quotes, setQuotes] = useState<ReturnType<typeof prototypeStore.quotesForEvent>>([]);
  useEffect(() => {
    const requests = prototypeStore.requests(providerId);
    setQuotes(
      requests
        .flatMap((request) => prototypeStore.quotesForEvent(request.userEventId))
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
                <h2>{money(quote.total)}</h2>
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

export function ProviderContracts({ providerId }: { providerId: string }) {
  return (
    <Gate providerId={providerId}>
      <Contracts providerId={providerId} />
    </Gate>
  );
}
function Contracts({ providerId }: { providerId: string }) {
  const [contracts, setContracts] = useState<
    ReturnType<typeof prototypeStore.contractsForProvider>
  >([]);
  useEffect(() => setContracts(prototypeStore.contractsForProvider(providerId)), [providerId]);
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
            const event = prototypeStore.event(contract.userEventId);
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
                  <strong>{money(contract.agreedTotal)}</strong>
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
                          {service.quantity} {service.unit} × {money(service.unitPrice)}
                        </small>
                      </span>
                      <b>{money(service.subtotal)}</b>
                    </div>
                  ))}
                </section>
                <div className="provider-contract-totals">
                  <div>
                    <span>Pagado</span>
                    <strong>{money(paid)}</strong>
                  </div>
                  <div>
                    <span>Saldo pendiente</span>
                    <strong>{money(balance)}</strong>
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
                      <strong>{money(installment.amount)}</strong>
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
