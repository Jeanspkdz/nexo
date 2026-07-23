"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { LocalAccount } from "@/features/account/infrastructure/browser-account-store";
import {
  readCustomerEvents,
  readSelectedCustomerEventId,
  saveCustomerEvent,
  selectCustomerEvent,
  type CustomerEvent,
} from "@/features/legacy/infrastructure/customer-events";
import {
  readQuotationRequests,
  saveQuotationRequest,
} from "@/features/legacy/infrastructure/quotation-requests";
import {
  acceptDetailedQuotation,
  readDetailedQuotations,
  saveDetailedQuotation,
} from "@/features/legacy/infrastructure/quotations";
import {
  readProviderContracts,
  saveProviderContract,
} from "@/features/legacy/infrastructure/provider-contracts";
import { catName, categories, demoEvent, money, providers, quotes } from "./legacy-demo-data";
import type { Category, Screen } from "./legacy-ui-model";

import { DashboardIcon } from "./dashboard-icon";

export function MyEvent({ notify }: { notify: (s: string) => void }) {
  const [localContracts] = useState(() => readProviderContracts());
  const acceptedQuotes = quotes.filter((q) => q.status === "Aceptada");
  const pendingQuotes = quotes.filter((q) => q.status === "Lista para decidir");
  const nextPayment = acceptedQuotes[0];
  return (
    <div className="client-dashboard-shell">
      <aside className="client-dashboard-nav" aria-label="Secciones del evento">
        <button className="current" aria-current="page">
          <DashboardIcon name="calendar" />
          <span>Eventos</span>
        </button>
        <button onClick={() => window.location.assign("/explorar")}>
          <DashboardIcon name="users" />
          <span>Proveedores</span>
        </button>
        <button onClick={() => window.location.assign("/cotizaciones")}>
          <DashboardIcon name="card" />
          <span>Cotizaciones</span>
        </button>
      </aside>
      <div className="product-page event-dashboard">
        <header className="event-overview">
          <div>
            <div className="event-title-row">
              <span className="event-calendar-icon">
                <DashboardIcon name="calendar" />
              </span>
              <span>Evento</span>
            </div>
            <h1>{demoEvent.name}</h1>
            <p>
              {demoEvent.type} · 19 de septiembre de 2026 · {demoEvent.guests} invitados ·{" "}
              {demoEvent.location}
            </p>
          </div>
          <div>
            <span>Presupuesto de referencia</span>
            <strong>{money(demoEvent.budget)}</strong>
            <small>Contratado: {money(13370)} · 74% del presupuesto</small>
            <div className="budget-track">
              <span />
            </div>
            <em>74% utilizado</em>
          </div>
          <button
            className="primary event-explore-action"
            onClick={() => window.location.assign("/explorar")}
          >
            Explorar servicios
          </button>
        </header>
        <div className="event-workspace">
          <div className="event-primary-column">
            {localContracts.length > 0 && (
              <section className="event-services">
                <h2>Contratos recientes</h2>
                {localContracts.map((contract) => {
                  const provider = providers.find(
                    (candidate) => candidate.id === contract.providerId,
                  );
                  return (
                    <article className="event-service-row" key={contract.id}>
                      <span>
                        <strong>{provider?.company ?? "Proveedor"}</strong>
                        <small>
                          {contract.paymentInstallments.length} cuota(s) · contrato activo
                        </small>
                      </span>
                      <b>{money(contract.agreedTotal)}</b>
                    </article>
                  );
                })}
              </section>
            )}
            <section className="next-decision" aria-labelledby="next-decision-title">
              <div>
                <span className="decision-kicker">Siguiente decisión</span>
                <h2 id="next-decision-title">Revisa tus cotizaciones pendientes</h2>
                <p>
                  Tienes {pendingQuotes.length} propuestas listas para decidir antes de contratar.
                </p>
              </div>
              <button className="primary" onClick={() => window.location.assign("/cotizaciones")}>
                Revisar cotizaciones
              </button>
            </section>
            <section className="event-services" aria-labelledby="event-services-title">
              <div className="section-heading compact">
                <div>
                  <h2 id="event-services-title">Servicios del evento</h2>
                  <p>Decide cada categoría por separado; puedes contratar empresas distintas.</p>
                </div>
              </div>
              <button
                className="event-service-row"
                onClick={() => window.location.assign("/resultados/salones")}
              >
                <span>
                  <strong>Locales o salones</strong>
                  <small>Busca un espacio para 90 invitados</small>
                </span>
                <em>Pendiente</em>
                <b aria-hidden="true">→</b>
              </button>
              <button
                className="event-service-row"
                onClick={() => window.location.assign("/cotizaciones")}
              >
                <span>
                  <strong>Catering</strong>
                  <small>{pendingQuotes.length} cotizaciones por revisar</small>
                </span>
                <em className="attention">Por decidir</em>
                <b aria-hidden="true">→</b>
              </button>
              <button
                className="event-service-row"
                onClick={() => window.location.assign("/resultados/foto")}
              >
                <span>
                  <strong>Fotografía y video</strong>
                  <small>Explora coberturas y entregables</small>
                </span>
                <em>Pendiente</em>
                <b aria-hidden="true">→</b>
              </button>
            </section>
          </div>
          <aside className="event-secondary-column" aria-label="Resumen del evento">
            <section className="event-side-panel" aria-labelledby="quote-review-title">
              <div className="side-panel-heading">
                <h2 id="quote-review-title">Cotizaciones por revisar</h2>
                <span>{pendingQuotes.length}</span>
              </div>
              {pendingQuotes.map((q) => (
                <button
                  key={q.code}
                  className="side-panel-row"
                  onClick={() => window.location.assign(`/cotizaciones/${q.code}`)}
                >
                  <span>
                    <strong>{q.provider.company}</strong>
                    <small>{q.provider.service}</small>
                  </span>
                  <b>{money(q.total)}</b>
                  <i aria-hidden="true">→</i>
                </button>
              ))}
            </section>
            {nextPayment && (
              <section className="event-side-panel next-payment" aria-labelledby="payment-title">
                <div className="side-panel-heading">
                  <h2 id="payment-title">Próximo pago</h2>
                  <span>19 ago</span>
                </div>
                <p>
                  <strong>{nextPayment.provider.company}</strong>
                  <br />
                  {nextPayment.provider.service}
                </p>
                <div>
                  <span>Cuota pendiente</span>
                  <strong>{money(Number(nextPayment.schedule[1]?.[2] ?? 0))}</strong>
                </div>
                <button
                  className="secondary"
                  onClick={() =>
                    notify(
                      `Pago de ${nextPayment.provider.company} registrado solo como simulación`,
                    )
                  }
                >
                  Simular pago
                </button>
              </section>
            )}
          </aside>
        </div>
        <p className="legal-demo">
          Nexo no procesa dinero en este prototipo. Cada obligación y calendario pertenece
          únicamente al contrato de la empresa indicada.
        </p>
      </div>
    </div>
  );
}
