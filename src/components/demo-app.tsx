"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  currentQuotationStatus,
  demoCompany,
  requestedServiceOptions,
  type QuotationRequest,
  type RequestedService,
  type Role,
} from "@/domain/quotation-flow";
import { readRequest, resetDemo, saveRequest } from "@/lib/demo-storage";

const statusLabels = {
  pending: "Pendiente",
  quoted: "Cotizada",
  accepted: "Aceptada",
  rejected: "Rechazada",
  declined: "No cotizada",
  withdrawn: "Retirada",
  expired: "Vencida",
  reservation_intent: "Interesado en reservar",
};

export function DemoApp() {
  const [role, setRole] = useState<Role | null>(null);
  const [request, setRequest] = useState<QuotationRequest | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRequest(readRequest());
    setReady(true);
  }, []);

  function updateRequest(next: QuotationRequest) {
    setRequest(next);
    saveRequest(next);
  }

  function restart() {
    resetDemo();
    setRequest(null);
    setRole(null);
  }

  if (!ready) return <main className="loading">Preparando la demo…</main>;

  if (!role) {
    return (
      <main className="role-shell">
        <section className="role-card">
          <div className="logo">N</div>
          <span className="kicker">NEXO EVENTOS · DEMO LOCAL</span>
          <h1>¿Cómo quieres entrar?</h1>
          <p>Elige una cuenta demo para recorrer cada lado de la cotización.</p>
          <div className="role-grid">
            <button onClick={() => setRole("user")}>
              <span className="role-icon">U</span>
              <strong>Entrar como Usuario</strong>
              <small>Solicita una cotización para tu evento</small>
            </button>
            <button onClick={() => setRole("company")}>
              <span className="role-icon company">E</span>
              <strong>Entrar como Empresa</strong>
              <small>Revisa la solicitud y prepara una propuesta</small>
            </button>
          </div>
          <p className="local-note">Los datos solo se guardan en este navegador.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span>N</span>Nexo Eventos <small>V1 demo</small></div>
        <div className="top-actions">
          <span className="role-pill">{role === "user" ? "Cuenta de Usuario" : "Cuenta de Empresa"}</span>
          <button className="text-button" onClick={() => setRole(null)}>Cambiar cuenta</button>
          <button className="text-button danger" onClick={restart}>Reiniciar demo</button>
        </div>
      </header>
      {role === "user" ? (
        <UserView request={request} onChange={updateRequest} />
      ) : (
        <CompanyView request={request} onChange={updateRequest} />
      )}
    </main>
  );
}

function UserView({ request, onChange }: { request: QuotationRequest | null; onChange: (value: QuotationRequest) => void }) {
  const [showForm, setShowForm] = useState(false);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onChange({
      requesterName: String(data.get("requesterName")),
      requesterPhone: String(data.get("requesterPhone")),
      requesterEmail: String(data.get("requesterEmail")),
      eventDate: String(data.get("eventDate")),
      startTime: String(data.get("startTime")),
      endTime: String(data.get("endTime")),
      eventType: String(data.get("eventType")),
      guestCount: Number(data.get("guestCount")),
      requestedServices: data.getAll("requestedServices") as RequestedService[],
      note: String(data.get("note")),
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    setShowForm(false);
  }

  return (
    <section className="page">
      <div className="page-heading">
        <span className="kicker">CUENTA DEMO · USUARIO</span>
        <h1>Encuentra el espacio para tu evento</h1>
        <p>Explora la empresa disponible y solicita una propuesta sencilla.</p>
      </div>
      {!request ? (
        <>
          <article className="venue-card">
            <div className="venue-photo"><span>J</span><small>Salón de eventos</small></div>
            <div className="venue-copy">
              <span className="available">Disponible para cotizar</span>
              <h2>{demoCompany.name}</h2>
              <p>{demoCompany.description}</p>
              <div className="venue-facts"><span>⌖ {demoCompany.location}</span><span>♙ {demoCompany.capacity}</span></div>
              <button className="primary" onClick={() => setShowForm(true)}>Solicitar cotización</button>
            </div>
          </article>
          {showForm && (
            <div className="modal-backdrop">
              <section className="modal">
                <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
                <span className="kicker">SOLICITUD PARA {demoCompany.name.toUpperCase()}</span>
                <h2>Cuéntanos sobre tu evento</h2>
                <form onSubmit={submitRequest} className="form">
                  <button className="demo-fill" type="button" onClick={(event) => event.currentTarget.form && fillRequestForm(event.currentTarget.form)}>
                    ✦ Llenar con datos de prueba
                  </button>
                  <div className="form-section">
                    <h3>Tus datos</h3>
                    <div className="form-grid">
                      <label className="full">Nombre completo<input name="requesterName" required placeholder="Andrea Salazar" /></label>
                      <label>Teléfono<input name="requesterPhone" type="tel" required placeholder="987 654 321" /></label>
                      <label>Correo opcional<input name="requesterEmail" type="email" placeholder="andrea@ejemplo.com" /></label>
                    </div>
                  </div>
                  <div className="form-section">
                    <h3>Detalles del evento</h3>
                    <div className="form-grid">
                  <label>Fecha del evento<input name="eventDate" type="date" required /></label>
                  <label>Tipo de evento<select name="eventType" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Matrimonio</option><option>Cumpleaños</option><option>Evento corporativo</option><option>Otro</option></select></label>
                      <label>Hora de inicio<input name="startTime" type="time" required /></label>
                      <label>Hora de finalización<input name="endTime" type="time" required /></label>
                  <label>Cantidad aproximada de invitados<input name="guestCount" type="number" min="1" max="180" required /></label>
                    </div>
                  </div>
                  <fieldset className="service-options">
                    <legend>Servicios solicitados</legend>
                    <p>Selecciona al menos uno.</p>
                    <div>
                      {requestedServiceOptions.map((service, index) => (
                        <label key={service}>
                          <input
                            name="requestedServices"
                            type="checkbox"
                            value={service}
                            defaultChecked={index === 0}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label>Comentario opcional<textarea name="note" placeholder="Cuéntanos algún detalle importante" /></label>
                  <button className="primary" type="submit">Enviar solicitud</button>
                </form>
              </section>
            </div>
          )}
        </>
      ) : <RequestCard request={request} role="user" onChange={onChange} />}
    </section>
  );
}

function CompanyView({ request, onChange }: { request: QuotationRequest | null; onChange: (value: QuotationRequest) => void }) {
  const [showDetail, setShowDetail] = useState(false);
  const displayedStatus = request ? currentQuotationStatus(request) : null;

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request) return;
    const data = new FormData(event.currentTarget);
    onChange({
      ...request,
      status: "quoted",
      quotedAt: new Date().toISOString(),
      quote: {
        total: Number(data.get("total")),
        requiredAdvance: Number(data.get("requiredAdvance")),
        validUntil: String(data.get("validUntil")),
        note: String(data.get("quoteNote")),
      },
    });
  }

  function declineRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request) return;
    const data = new FormData(event.currentTarget);
    onChange({
      ...request,
      status: "declined",
      declineReason: String(data.get("declineReason")),
      declinedAt: new Date().toISOString(),
    });
  }

  return (
    <section className="page">
      <div className="page-heading">
        <span className="kicker">CUENTA DEMO · EMPRESA</span>
        <h1>{showDetail ? "Detalle comercial" : "Solicitudes y cotizaciones"}</h1>
        <p>{showDetail ? "Revisa la solicitud y prepara o consulta tu propuesta." : "Consulta las solicitudes que requieren tu atención."}</p>
      </div>
      {!request ? (
        <section className="empty-state"><span>◇</span><h2>Aún no hay solicitudes</h2><p>Entra como Usuario y solicita una cotización para iniciar el recorrido.</p></section>
      ) : !showDetail ? (
        <>
        <section className="status-metrics">
          <article><span>Pendientes</span><strong>{displayedStatus === "pending" ? 1 : 0}</strong></article>
          <article><span>Cotizadas</span><strong>{displayedStatus === "quoted" ? 1 : 0}</strong></article>
          <article><span>Aceptadas</span><strong>{displayedStatus === "accepted" ? 1 : 0}</strong></article>
          <article><span>En reserva</span><strong>{displayedStatus === "reservation_intent" ? 1 : 0}</strong></article>
        </section>
        <section className="quotation-inbox">
          <div className="inbox-heading">
            <div><span className="kicker">BANDEJA DE EMPRESA</span><h2>1 cotización</h2></div>
            <span className={`status ${displayedStatus}`}>{displayedStatus && statusLabels[displayedStatus]}</span>
          </div>
          <article className="quotation-row">
            <div className="quotation-person">
              <span>{initials(request.requesterName)}</span>
              <div><strong>{request.requesterName}</strong><small>{request.eventType}</small></div>
            </div>
            <div><small>Fecha del evento</small><strong>{formatDate(request.eventDate)}</strong></div>
            <div><small>Invitados</small><strong>{request.guestCount} personas</strong></div>
            <button className="secondary" onClick={() => setShowDetail(true)}>
              {displayedStatus === "pending" ? "Revisar y cotizar" : "Ver cotización"}
            </button>
          </article>
        </section>
        </>
      ) : request.status === "pending" ? (
        <>
        <button className="back-button" onClick={() => setShowDetail(false)}>← Volver a cotizaciones</button>
        <div className="company-grid">
          <RequestSummary request={request} />
          <section className="surface">
            <span className="kicker">PREPARAR COTIZACIÓN</span>
            <h2>Tu propuesta</h2>
            <form onSubmit={submitQuote} className="form">
              <button className="demo-fill" type="button" onClick={(event) => event.currentTarget.form && fillQuoteForm(event.currentTarget.form)}>
                ✦ Llenar con datos de prueba
              </button>
              <label>Precio total (S/)<input name="total" type="number" min="1" required placeholder="6500" /></label>
              <label>Adelanto requerido (S/)<input name="requiredAdvance" type="number" min="1" required placeholder="1500" /></label>
              <div className="included-services">
                <span>Servicios incluidos</span>
                <strong>{request.requestedServices.join(", ")}</strong>
                <small>Definidos por el Usuario en su solicitud.</small>
              </div>
              <label>Válida hasta<input name="validUntil" type="date" required /></label>
              <label>Comentario opcional<textarea name="quoteNote" placeholder="Condiciones o información adicional" /></label>
              <p className="reservation-note">La cotización no reserva la fecha del evento.</p>
              <button className="primary" type="submit">Enviar cotización</button>
            </form>
            <form onSubmit={declineRequest} className="decline-form">
              <span>No puedes atender esta solicitud</span>
              <select name="declineReason" required defaultValue="">
                <option value="" disabled>Selecciona un motivo</option>
                <option>Fecha no disponible</option>
                <option>Capacidad insuficiente</option>
                <option>Servicios no disponibles</option>
                <option>Otro</option>
              </select>
              <button className="secondary danger" type="submit">Cerrar sin cotizar</button>
            </form>
          </section>
        </div>
        </>
      ) : (
        <>
          <button className="back-button" onClick={() => setShowDetail(false)}>← Volver a cotizaciones</button>
          <RequestCard request={request} role="company" onChange={onChange} />
        </>
      )}
    </section>
  );
}

function RequestSummary({ request }: { request: QuotationRequest }) {
  const displayedStatus = currentQuotationStatus(request);
  return (
    <section className="surface">
      <div className="status-row"><span className={`status ${displayedStatus}`}>{statusLabels[displayedStatus]}</span></div>
      <span className="kicker">SOLICITUD RECIBIDA</span>
      <h2>{request.eventType}</h2>
      <dl>
        <div><dt>Solicitante</dt><dd>{request.requesterName}</dd></div>
        <div><dt>Contacto</dt><dd>{request.requesterPhone}{request.requesterEmail && <small>{request.requesterEmail}</small>}</dd></div>
        <div><dt>Fecha</dt><dd>{formatDate(request.eventDate)}</dd></div>
        <div><dt>Horario solicitado</dt><dd>{formatTime(request.startTime)} – {formatTime(request.endTime)}</dd></div>
        <div><dt>Invitados</dt><dd>{request.guestCount} personas</dd></div>
        <div><dt>Servicios</dt><dd>{request.requestedServices.join(", ")}</dd></div>
        {request.note && <div><dt>Comentario</dt><dd>{request.note}</dd></div>}
        {request.quote && <div><dt>Adelanto requerido</dt><dd>S/ {request.quote.requiredAdvance.toLocaleString("es-PE")}</dd></div>}
      </dl>
    </section>
  );
}

function RequestCard({ request, role, onChange }: { request: QuotationRequest; role: Role; onChange: (value: QuotationRequest) => void }) {
  const [showReservation, setShowReservation] = useState(false);
  const displayedStatus = currentQuotationStatus(request);
  return (
    <div className="company-grid">
      <RequestSummary request={request} />
      <section className="surface quote-result">
        {displayedStatus === "pending" ? (
          <><span className="waiting-icon">◷</span><h2>Solicitud enviada</h2><p>Salón de Jardines todavía está preparando su cotización. Cambia a la Cuenta de Empresa para continuar.</p>{role === "user" && <button className="secondary danger" onClick={() => onChange({ ...request, status: "withdrawn", withdrawnAt: new Date().toISOString() })}>Retirar solicitud</button>}<QuotationTimeline request={request} status={displayedStatus} /></>
        ) : displayedStatus === "withdrawn" ? (
          <><span className="waiting-icon">×</span><h2>Solicitud retirada</h2><p>El Usuario retiró esta solicitud antes de recibir una cotización.</p><QuotationTimeline request={request} status={displayedStatus} /></>
        ) : displayedStatus === "declined" ? (
          <><span className="waiting-icon">×</span><h2>Solicitud no cotizada</h2><p>La Empresa cerró la solicitud: {request.declineReason}.</p><QuotationTimeline request={request} status={displayedStatus} /></>
        ) : displayedStatus === "reservation_intent" ? (
          <><span className="waiting-icon">✓</span><h2>Intención de reserva confirmada</h2><p>El Usuario aceptó la cotización y quiere continuar. El pago y la firma del contrato se coordinan fuera de esta demostración.</p><QuotationTimeline request={request} status={displayedStatus} /></>
        ) : (
          <>
            <span className="kicker">COTIZACIÓN DE SALÓN DE JARDINES</span>
            <div className="price">S/ {request.quote?.total.toLocaleString("es-PE")}</div>
            <div className="included-services">
              <span>Servicios incluidos</span>
              <strong>{request.requestedServices.join(", ")}</strong>
            </div>
            {request.quote?.note && <p>{request.quote.note}</p>}
            <p className="validity">Válida hasta el {request.quote && formatDate(request.quote.validUntil)}</p>
            <p className="reservation-note">Esta cotización no reserva la fecha del evento.</p>
            {role === "user" && displayedStatus === "quoted" && (
              <div className="decision-actions">
                <button className="primary" onClick={() => onChange({ ...request, status: "accepted", decidedAt: new Date().toISOString() })}>Aceptar cotización</button>
                <button className="secondary danger" onClick={() => onChange({ ...request, status: "rejected", decidedAt: new Date().toISOString() })}>Rechazar</button>
              </div>
            )}
            {displayedStatus === "accepted" && (
              <>
                <p className="final-message accepted">Cotización aceptada</p>
                {role === "user" && (
                  <p>Para continuar, debes coordinar un adelanto de S/ {request.quote?.requiredAdvance.toLocaleString("es-PE")} con {demoCompany.name}.</p>
                )}
                {role === "user" && !showReservation && (
                  <button className="primary" onClick={() => setShowReservation(true)}>Quiero continuar con la reserva</button>
                )}
                {role === "user" && showReservation && (
                  <div className="reservation-summary">
                    <span className="kicker">INTENCIÓN DE RESERVA</span>
                    <dl>
                      <div><dt>Empresa</dt><dd>{demoCompany.name}</dd></div>
                      <div><dt>Fecha y horario</dt><dd>{formatDate(request.eventDate)} · {formatTime(request.startTime)} – {formatTime(request.endTime)}</dd></div>
                      <div><dt>Servicios</dt><dd>{request.requestedServices.join(", ")}</dd></div>
                      <div><dt>Precio total</dt><dd>S/ {request.quote?.total.toLocaleString("es-PE")}</dd></div>
                      <div><dt>Adelanto requerido</dt><dd>S/ {request.quote?.requiredAdvance.toLocaleString("es-PE")}</dd></div>
                    </dl>
                    <p className="reservation-note">Este borrador no procesa pagos ni reserva automáticamente la fecha.</p>
                    <button className="primary" onClick={() => onChange({ ...request, status: "reservation_intent", decidedAt: new Date().toISOString() })}>Confirmar intención de reserva</button>
                  </div>
                )}
                {role === "company" && <p className="final-message">El Usuario aceptó la cotización y está decidiendo si continuar con la reserva.</p>}
              </>
            )}
            {displayedStatus === "rejected" && <p className="final-message rejected">La cotización fue rechazada.</p>}
            {displayedStatus === "expired" && <p className="final-message expired">La vigencia terminó. Esta cotización ya no puede aceptarse.</p>}
            {role === "company" && displayedStatus === "quoted" && <p className="final-message">Esperando la decisión del Usuario.</p>}
            <QuotationTimeline request={request} status={displayedStatus} />
          </>
        )}
      </section>
    </div>
  );
}

function QuotationTimeline({ request, status }: { request: QuotationRequest; status: ReturnType<typeof currentQuotationStatus> }) {
  const events = [
    { label: "Solicitud enviada", date: request.createdAt },
    request.quotedAt ? { label: "Cotización enviada", date: request.quotedAt } : null,
    request.declinedAt ? { label: `Solicitud no cotizada: ${request.declineReason}`, date: request.declinedAt } : null,
    request.withdrawnAt ? { label: "Solicitud retirada por el Usuario", date: request.withdrawnAt } : null,
    request.decidedAt && status === "accepted" ? { label: "Cotización aceptada", date: request.decidedAt } : null,
    request.decidedAt && status === "rejected" ? { label: "Cotización rechazada", date: request.decidedAt } : null,
    request.decidedAt && status === "reservation_intent" ? { label: "Intención de reserva confirmada", date: request.decidedAt } : null,
    status === "expired" && request.quote ? { label: "Cotización vencida", date: `${request.quote.validUntil}T23:59:59` } : null,
  ].filter((event): event is { label: string; date: string } => Boolean(event));

  return (
    <section className="timeline">
      <span>Línea de tiempo</span>
      {events.map((event) => (
        <div key={`${event.label}-${event.date}`}><i /><p><strong>{event.label}</strong><small>{formatDateTime(event.date)}</small></p></div>
      ))}
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2026, 0, 1, hour, minute));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function fillRequestForm(form: HTMLFormElement) {
  setFormValue(form, "requesterName", "Andrea Salazar");
  setFormValue(form, "requesterPhone", "987 654 321");
  setFormValue(form, "requesterEmail", "andrea.salazar@ejemplo.com");
  setFormValue(form, "eventDate", futureDate(90));
  setFormValue(form, "eventType", "Matrimonio");
  setFormValue(form, "startTime", "18:00");
  setFormValue(form, "endTime", "23:30");
  setFormValue(form, "guestCount", "120");
  setFormValue(
    form,
    "note",
    "Buscamos espacio para pista de baile y una zona tranquila para las fotografías.",
  );
  form.querySelectorAll<HTMLInputElement>('input[name="requestedServices"]').forEach((input) => {
    input.checked = ["Solo salón", "Mesas y sillas", "Decoración", "Sonido"].includes(input.value);
  });
}

function fillQuoteForm(form: HTMLFormElement) {
  setFormValue(form, "total", "6500");
  setFormValue(form, "requiredAdvance", "1500");
  setFormValue(form, "validUntil", futureDate(14));
  setFormValue(
    form,
    "quoteNote",
    "La propuesta cubre seis horas de evento e incluye montaje y limpieza básica.",
  );
}

function setFormValue(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
    field.value = value;
  }
}

function futureDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
