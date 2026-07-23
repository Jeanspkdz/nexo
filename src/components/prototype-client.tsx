"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { readSession, type LocalAccount } from "@/lib/auth-storage";
import { eventTypes, providerCategories, providers, providerServices } from "@/lib/mock-catalog";
import { prototypeStore } from "@/lib/prototype-store";
import type { UserEvent } from "@/domain/marketplace";
import { ClientDashboardLayout } from "@/components/layouts/client-dashboard-layout";

const money = (amount: number) => `S/ ${amount.toLocaleString("es-PE")}`;

const ClientAccountContext = createContext<LocalAccount | null>(null);
function useClientAccount() {
  const account = useContext(ClientAccountContext);
  if (!account) throw new Error("Missing client session");
  return account;
}
function ClientGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [account, setAccount] = useState<LocalAccount | null>(null);
  useEffect(() => {
    const current = readSession();
    if (!current || current.role !== "client") router.replace("/login");
    else setAccount(current);
  }, [router]);
  return account ? (
    <ClientAccountContext.Provider value={account}>
      <ClientDashboardLayout name={account.firstName} accountId={account.id}>
        {children}
      </ClientDashboardLayout>
    </ClientAccountContext.Provider>
  ) : null;
}

export function EventsPage() {
  return (
    <ClientGate>
      <Events />
    </ClientGate>
  );
}
function Events() {
  const account = useClientAccount();
  const router = useRouter();
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    setEvents(prototypeStore.events(account.id));
    setSelected(prototypeStore.selectedEvent(account.id)?.id ?? null);
  }, [account.id]);
  return (
    <section className="product-page client-events-page">
      <header className="flow-page-heading">
        <div>
          <p>Planificación</p>
          <h1>Mis eventos</h1>
          <span>
            Selecciona el evento que estás organizando para mantener solicitudes, propuestas y pagos
            en un mismo lugar.
          </span>
        </div>
        <Link className="primary" href="/mis-eventos/nuevo">
          Crear evento
        </Link>
      </header>
      <div className="flow-rule" />
      {events.length === 0 ? (
        <section className="flow-empty">
          <h2>Tu planificación empieza aquí</h2>
          <p>Crea un evento para reunir tus solicitudes, cotizaciones y contratos.</p>
          <Link className="secondary" href="/mis-eventos/nuevo">
            Crear mi primer evento
          </Link>
        </section>
      ) : (
        <ul className="event-directory">
          {events.map((event) => (
            <li key={event.id}>
              <div>
                <span className="event-date">{event.date}</span>
                <strong>{event.name}</strong>
                <small>
                  {event.type} · {event.guestCount} invitados · {event.location}
                </small>
              </div>
              <button
                className={selected === event.id ? "secondary event-active" : "secondary"}
                onClick={() => {
                  prototypeStore.selectEvent(account.id, event.id);
                  setSelected(event.id);
                  router.push(`/mis-eventos/${event.id}`);
                }}
              >
                {selected === event.id ? "Evento activo" : "Abrir evento"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="quiet-action"
        onClick={() => {
          prototypeStore.reset();
          setEvents([]);
          setSelected(null);
        }}
      >
        Reiniciar datos de prueba
      </button>
    </section>
  );
}

export function NewEventPage() {
  return (
    <ClientGate>
      <NewEvent />
    </ClientGate>
  );
}
function NewEvent() {
  const account = useClientAccount();
  const router = useRouter();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const record = prototypeStore.saveEvent({
      userId: account.id,
      name: String(data.get("name")),
      type: String(data.get("type")),
      date: String(data.get("date")),
      guestCount: Number(data.get("guestCount")),
      location: String(data.get("location")),
    });
    router.push(`/mis-eventos/${record.id}`);
  };
  return (
    <section className="product-page client-new-event-page">
      <header className="flow-page-heading">
        <div>
          <p>Nuevo evento</p>
          <h1>Define lo esencial</h1>
          <span>
            Con estos datos prepararemos el contexto que verán los proveedores al responderte.
          </span>
        </div>
        <Link href="/mis-eventos" className="back-link">
          Volver a Mis eventos
        </Link>
      </header>
      <form className="event-setup-form" onSubmit={submit}>
        <fieldset>
          <legend>Datos del evento</legend>
          <div className="form-grid">
            <label className="full">
              Nombre del evento
              <input name="name" placeholder="Ej. Celebración de aniversario" required />
            </label>
            <label>
              Tipo
              <select name="type">
                {eventTypes.map((type) => (
                  <option key={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input name="date" type="date" required />
            </label>
            <label>
              Invitados
              <input name="guestCount" type="number" min="1" placeholder="80" required />
            </label>
            <label>
              Ubicación
              <input name="location" placeholder="Distrito o ciudad" required />
            </label>
          </div>
        </fieldset>
        <footer>
          <Link className="secondary" href="/mis-eventos">
            Cancelar
          </Link>
          <button className="primary">Guardar y continuar</button>
        </footer>
      </form>
    </section>
  );
}

export function EventPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <EventSummary eventId={eventId} />
    </ClientGate>
  );
}
export function EventQuotesPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <Quotes eventId={eventId} />
    </ClientGate>
  );
}
export function ActivePlanPage() {
  return (
    <ClientGate>
      <ActiveEventSection section="plan" />
    </ClientGate>
  );
}
export function ActiveQuotesPage() {
  return (
    <ClientGate>
      <ActiveEventSection section="quotes" />
    </ClientGate>
  );
}
export function ActivePaymentsPage() {
  return (
    <ClientGate>
      <ActiveEventSection section="payments" />
    </ClientGate>
  );
}

function ActiveEventSection({ section }: { section: "plan" | "quotes" | "payments" }) {
  const account = useClientAccount();
  const [eventId, setEventId] = useState<string | null | undefined>(undefined);
  useEffect(() => setEventId(prototypeStore.selectedEvent(account.id)?.id ?? null), [account.id]);

  if (eventId === undefined) return <section className="product-page" aria-busy="true" />;
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
      <section className="product-page">
        <section className="flow-empty">
          <h1>{content[0]}</h1>
          <p>{content[1]}</p>
          <div className="empty-actions">
            <Link className="primary" href="/mis-eventos">
              Seleccionar evento
            </Link>
            <Link className="secondary" href="/mis-eventos/nuevo">
              Crear evento
            </Link>
          </div>
        </section>
      </section>
    );
  }

  if (section === "plan") return <EventSummary eventId={eventId} />;
  if (section === "quotes") return <Quotes eventId={eventId} />;
  return <Contracts eventId={eventId} />;
}
function Quotes({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [quotes, setQuotes] = useState<ReturnType<typeof prototypeStore.quotesForEvent>>([]);
  const event = prototypeStore.event(eventId);
  useEffect(() => setQuotes(prototypeStore.quotesForEvent(eventId)), [eventId]);
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
              <b>{money(quote.total)}</b>
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
                      {item.quantity} {item.unit} × {money(item.unitPrice)}
                    </small>
                  </span>
                  <b>{money(item.quantity * item.unitPrice)}</b>
                </div>
              ))}
            </section>
            <section className="quote-decision-terms">
              <div>
                <span>Total</span>
                <strong>{money(quote.total)}</strong>
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
                  <b>{money(item.amount)}</b>
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
                    prototypeStore.acceptQuote(quote.id);
                    setQuotes(prototypeStore.quotesForEvent(eventId));
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
export function EventContractsPage({ eventId }: { eventId: string }) {
  return (
    <ClientGate>
      <Contracts eventId={eventId} />
    </ClientGate>
  );
}
function Contracts({ eventId }: { eventId: string }) {
  const [contracts, setContracts] = useState<ReturnType<typeof prototypeStore.contracts>>([]);
  useEffect(() => setContracts(prototypeStore.contracts(eventId)), [eventId]);
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
            <strong>{money(pending)}</strong>
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
                  <strong>{money(contract.agreedTotal)}</strong>
                </header>
                <ul>
                  {contract.paymentInstallments.map((item) => (
                    <li key={item.id}>
                      <span>
                        <b>{item.label}</b>
                        <small>Vence {item.dueDate}</small>
                      </span>
                      <strong>{money(item.amount)}</strong>
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
function EventSummary({ eventId }: { eventId: string }) {
  const account = useClientAccount();
  const [event, setEvent] = useState<UserEvent | null>(null);
  const [quotes, setQuotes] = useState(0);
  const [contracts, setContracts] = useState(0);
  const [requests, setRequests] = useState<ReturnType<typeof prototypeStore.requestsForEvent>>([]);
  useEffect(() => {
    const selected = prototypeStore.events(account.id).find((item) => item.id === eventId) ?? null;
    setEvent(selected);
    setRequests(prototypeStore.requestsForEvent(eventId));
    setQuotes(prototypeStore.quotesForEvent(eventId).length);
    setContracts(prototypeStore.contracts(eventId).length);
  }, [account.id, eventId]);
  if (!event)
    return (
      <section className="product-page">
        <p>Evento no encontrado.</p>
        <Link href="/mis-eventos">Volver a Mis eventos</Link>
      </section>
    );
  return (
    <section className="product-page client-event-page">
      <header className="event-command-header">
        <div>
          <p>Evento activo</p>
          <h1>{event.name}</h1>
          <span>
            {event.type} · {event.date} · {event.guestCount} invitados · {event.location}
          </span>
        </div>
        <Link className="primary" href="/proveedores">
          Buscar proveedores
        </Link>
      </header>
      <ol className="request-progress" aria-label="Progreso del evento">
        <li className="done">Explorar servicios</li>
        <li className={requests.length ? "done" : "current"}>Solicitudes</li>
        <li className={quotes ? "current" : ""}>Propuestas</li>
        <li className={contracts ? "done" : ""}>Contratos</li>
      </ol>
      <div className="event-work-grid">
        <section className="event-activity">
          <header>
            <div>
              <p>Siguiente tarea</p>
              <h2>{quotes ? "Revisa tus propuestas" : "Solicita servicios para tu evento"}</h2>
            </div>
            <Link
              className="secondary"
              href={quotes ? `/mis-eventos/${eventId}/cotizaciones` : "/proveedores"}
            >
              {quotes ? "Ver cotizaciones" : "Explorar proveedores"}
            </Link>
          </header>
          <h2>Solicitudes enviadas</h2>
          {requests.length ? (
            <ul className="request-register">
              {requests.map((request) => (
                <li key={request.id}>
                  <span>
                    <strong>
                      {providers.find((provider) => provider.id === request.providerId)?.name}
                    </strong>
                    <small>Solicitud {request.id}</small>
                  </span>
                  <em
                    className={request.status === "pending" ? "status-neutral" : "status-success"}
                  >
                    {request.status === "pending" ? "Pendiente de respuesta" : "Cotizada"}
                  </em>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-copy">
              Aún no has enviado solicitudes. Empieza explorando proveedores.
            </p>
          )}
        </section>
        <aside className="event-ledger">
          <h2>Resumen del evento</h2>
          <dl>
            <div>
              <dt>Solicitudes</dt>
              <dd>{requests.length}</dd>
            </div>
            <div>
              <dt>Propuestas</dt>
              <dd>{quotes}</dd>
            </div>
            <div>
              <dt>Contratos</dt>
              <dd>{contracts}</dd>
            </div>
          </dl>
          <Link href={`/mis-eventos/${eventId}/cotizaciones`}>Gestionar cotizaciones</Link>
          <Link href={`/mis-eventos/${eventId}/contratos`}>Ver contratos y pagos</Link>
        </aside>
      </div>
    </section>
  );
}

export function ProvidersPage() {
  return (
    <ClientGate>
      <Providers />
    </ClientGate>
  );
}
function Providers() {
  return (
    <section className="product-page client-providers-page">
      <header className="flow-page-heading">
        <div>
          <p>Explorar servicios</p>
          <h1>¿Qué necesitas resolver?</h1>
          <span>Elige una categoría para comparar propuestas adecuadas para tu evento.</span>
        </div>
      </header>
      <ul className="category-directory">
        {providerCategories
          .filter((category) => category.active)
          .map((category) => (
            <li key={category.id}>
              <Link href={`/proveedores/${category.id}`}>
                <span>Servicios para eventos</span>
                <strong>{category.name}</strong>
                <b>Explorar →</b>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
export function CategoryPage({ categoryId }: { categoryId: string }) {
  return (
    <ClientGate>
      <Category categoryId={categoryId} />
    </ClientGate>
  );
}
function Category({ categoryId }: { categoryId: string }) {
  const category = providerCategories.find((item) => item.id === categoryId);
  const services = providerServices
    .filter((service) => service.categoryId === categoryId)
    .sort(
      (a, b) =>
        Number(Boolean(providers.find((provider) => provider.id === b.providerId)?.sponsored)) -
        Number(Boolean(providers.find((provider) => provider.id === a.providerId)?.sponsored)),
    );
  return (
    <section className="product-page client-category-page">
      <header className="flow-page-heading">
        <div>
          <Link className="back-link" href="/proveedores">
            Todas las categorías
          </Link>
          <p>Servicios disponibles</p>
          <h1>{category?.name ?? "Categoría"}</h1>
          <span>Compara alternativas según lo incluido y el precio de partida.</span>
        </div>
      </header>
      <div className="service-results">
        {services.map((service) => {
          const provider = providers.find((item) => item.id === service.providerId)!;
          return (
            <article key={service.id}>
              <header>
                <div>
                  {provider.sponsored && <em>Patrocinado</em>}
                  <h2>{service.name}</h2>
                  <p>{provider.name}</p>
                </div>
                <strong>
                  Desde {money(service.startingPrice)}
                  <small>{service.priceUnit}</small>
                </strong>
              </header>
              <footer>
                <span>{service.included.slice(0, 2).join(" · ")}</span>
                <Link className="secondary" href={`/servicios/${service.id}`}>
                  Ver servicio
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
export function ServicePage({ serviceId }: { serviceId: string }) {
  return (
    <ClientGate>
      <Service serviceId={serviceId} />
    </ClientGate>
  );
}
function Service({ serviceId }: { serviceId: string }) {
  const service = providerServices.find((item) => item.id === serviceId);
  if (!service) return <section className="product-page">Servicio no encontrado.</section>;
  const provider = providers.find((item) => item.id === service.providerId)!;
  return (
    <section className="product-page client-service-page">
      <header className="flow-page-heading">
        <div>
          <Link className="back-link" href={`/proveedores/${service.categoryId}`}>
            Volver a resultados
          </Link>
          <p>{provider.name}</p>
          <h1>{service.name}</h1>
          <span>Consulta lo incluido y pide una propuesta con el contexto de tu evento.</span>
        </div>
        <div className="service-price">
          Desde <strong>{money(service.startingPrice)}</strong>
          <small>{service.priceUnit}</small>
        </div>
      </header>
      <div className="service-detail-grid">
        <section>
          <h2>Incluye</h2>
          <ul>
            {service.included.map((included) => (
              <li key={included}>{included}</li>
            ))}
          </ul>
        </section>
        <aside>
          <h2>Antes de solicitar</h2>
          <p>
            La empresa recibirá los datos de tu evento y podrá responderte con una propuesta
            detallada.
          </p>
          <Link className="primary" href={`/servicios/${service.id}/solicitar`}>
            Solicitar cotización
          </Link>
        </aside>
      </div>
    </section>
  );
}

export function RequestPage({ serviceId }: { serviceId: string }) {
  return (
    <ClientGate>
      <RequestForm serviceId={serviceId} />
    </ClientGate>
  );
}
function RequestForm({ serviceId }: { serviceId: string }) {
  const account = useClientAccount();
  const router = useRouter();
  const service = providerServices.find((item) => item.id === serviceId);
  const sameProvider = providerServices.filter((item) => item.providerId === service?.providerId);
  const [activeEvent, setActiveEvent] = useState<UserEvent | null>(null);
  useEffect(() => setActiveEvent(prototypeStore.selectedEvent(account.id)), [account.id]);
  if (!service) return null;
  if (!activeEvent)
    return (
      <section className="product-page client-request-page">
        <section className="flow-empty">
          <h1>Elige un evento antes de solicitar</h1>
          <p>
            La cotización necesita fecha, ubicación e invitados para que la empresa pueda
            responderte.
          </p>
          <Link className="primary" href="/mis-eventos">
            Ir a Mis eventos
          </Link>
        </section>
      </section>
    );
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    prototypeStore.createRequest({
      userEventId: activeEvent.id,
      providerId: service.providerId,
      providerServiceIds: data.getAll("serviceIds").map(String),
    });
    router.push(`/mis-eventos/${activeEvent.id}`);
  };
  return (
    <section className="product-page client-request-page">
      <header className="flow-page-heading">
        <div>
          <p>Enviar solicitud</p>
          <h1>Define lo que quieres cotizar</h1>
          <span>Selecciona los servicios que quieres incluir para {activeEvent.name}.</span>
        </div>
        <Link className="back-link" href={`/servicios/${service.id}`}>
          Volver al servicio
        </Link>
      </header>
      <div className="request-context-card">
        <span>Evento activo</span>
        <strong>{activeEvent.name}</strong>
        <small>
          {activeEvent.date} · {activeEvent.guestCount} invitados · {activeEvent.location}
        </small>
      </div>
      <form className="request-services-form" onSubmit={submit}>
        <fieldset>
          <legend>Servicios de este proveedor</legend>
          {sameProvider.map((item) => (
            <label key={item.id}>
              <input
                name="serviceIds"
                type="checkbox"
                value={item.id}
                defaultChecked={item.id === serviceId}
              />
              <span>
                <b>{item.name}</b>
                <small>
                  Desde {money(item.startingPrice)} · {item.priceUnit}
                </small>
              </span>
            </label>
          ))}
        </fieldset>
        <footer>
          <Link className="secondary" href={`/servicios/${service.id}`}>
            Cancelar
          </Link>
          <button className="primary">Enviar solicitud</button>
        </footer>
      </form>
    </section>
  );
}
