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

export function CompanyPanel({
  company,
  notify,
  navigate,
}: {
  company: (typeof providers)[number];
  notify: (s: string) => void;
  navigate: (path: string) => void;
}) {
  const [localRequests, setLocalRequests] = useState(() => readQuotationRequests(company.id));
  const [localContracts] = useState(() => readProviderContracts(company.id));
  useEffect(() => {
    setLocalRequests(readQuotationRequests(company.id));
  }, [company.id]);
  const ownQuote = quotes.find((q) => q.provider.id === company.id);
  const gross = ownQuote?.total ?? company.price,
    commission = Math.round(gross * 0.075),
    processing = Math.round(gross * 0.029),
    net = gross - commission - processing;
  return (
    <div className="company-shell">
      <aside className="company-nav">
        <div>
          <span>Área de empresa</span>
          <strong>{company.company}</strong>
        </div>
        {[
          ["Resumen", ""],
          ["Servicios y paquetes", "servicios"],
          ["Solicitudes", "solicitudes"],
          ["Editor de cotizaciones", "editor"],
          ["Cotizaciones enviadas", "cotizaciones"],
          ["Contratos y pagos", "contratos"],
          ["Portafolio y reseñas", "portafolio"],
        ].map(([label, path], i) => (
          <button
            key={label}
            className={i === 0 ? "current" : ""}
            onClick={() => navigate(`/panel/${company.id}${path ? `/${path}` : ""}`)}
          >
            {label}
          </button>
        ))}
        <p>
          Solo ves información de <strong>{company.company}</strong>.
        </p>
      </aside>
      <div className="company-content">
        <header id="company-0">
          <div>
            <span>Panel de empresa demo</span>
            <h1>Buenos días, {company.company}</h1>
            <p>
              Gestiona tus servicios y propuestas simuladas sin acceder a datos de otras empresas.
            </p>
          </div>
          <button className="secondary" onClick={() => notify("Datos demo actualizados")}>
            Actualizar datos
          </button>
        </header>
        <section className="company-metrics">
          <article>
            <span>Solicitudes por atender</span>
            <strong>{localRequests.length || 2}</strong>
            <small>{localRequests.length ? "Nuevas solicitudes locales" : "Una vence hoy"}</small>
          </article>
          <article>
            <span>Bruto contratado</span>
            <strong>
              {money(
                localContracts.reduce((sum, contract) => sum + contract.agreedTotal, 0) || gross,
              )}
            </strong>
            <small>
              {localContracts.length
                ? `${localContracts.length} contrato(s) local(es)`
                : "Contrato propio"}
            </small>
          </article>
          <article>
            <span>Comisión simulada</span>
            <strong>{money(commission)}</strong>
            <small>7.5% demo</small>
          </article>
          <article>
            <span>Neto estimado</span>
            <strong>{money(net)}</strong>
            <small>Después de comisión y procesamiento</small>
          </article>
        </section>
        <section className="company-section" id="company-1">
          <div className="section-heading">
            <div>
              <h2>Servicios y paquetes</h2>
              <p>Oferta visible para clientes de Nexo.</p>
            </div>
            <button className="secondary">Editar servicio</button>
          </div>
          <article className="service-admin">
            <div className="provider-thumb">
              <Image src={company.image} alt="" fill sizes="140px" />
            </div>
            <div>
              <span>{catName(company.category)}</span>
              <h3>{company.service}</h3>
              <p>
                {company.package} · Desde {money(company.price)} · {company.unit}
              </p>
            </div>
            <span className="status-positive">Publicado</span>
          </article>
        </section>
        <section className="company-section" id="company-2">
          <div className="section-heading">
            <div>
              <h2>Solicitudes recibidas</h2>
              <p>Datos generales y específicos para tu categoría.</p>
            </div>
          </div>
          <div className="company-table">
            <div>
              <span>Cliente y evento</span>
              <span>Fecha</span>
              <span>Servicio</span>
              <span>Estado</span>
              <span></span>
            </div>
            <div>
              <strong>
                Andrea Salazar<small>{demoEvent.name}</small>
              </strong>
              <span>19 sep 2026</span>
              <span>{company.service}</span>
              <span>Por cotizar</span>
              <button className="text-link" onClick={() => navigate(`/panel/${company.id}/editor`)}>
                Preparar
              </button>
            </div>
            <div>
              <strong>
                Carlos Méndez<small>Encuentro de equipo</small>
              </strong>
              <span>08 oct 2026</span>
              <span>{company.service}</span>
              <span>En revisión</span>
              <button className="text-link">Revisar</button>
            </div>
            {localRequests.map((request) => (
              <div key={request.id}>
                <strong>
                  Solicitud nueva<small>Evento {request.userEventId}</small>
                </strong>
                <span>{new Date(request.createdAt).toLocaleDateString("es-PE")}</span>
                <span>{company.service}</span>
                <span>Por cotizar</span>
                <button
                  className="text-link"
                  onClick={() => navigate(`/panel/${company.id}/editor`)}
                >
                  Preparar
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="company-section quote-editor" id="company-3">
          <div className="section-heading">
            <div>
              <h2>Editor de cotización</h2>
              <p>
                Borrador NX-{company.category.toUpperCase()}-4021 · basado en una solicitud
                recibida.
              </p>
            </div>
            <span className="status-neutral">Borrador</span>
          </div>
          <div className="editor-grid">
            <div className="line-editor">
              <div>
                <label>
                  Concepto
                  <input defaultValue={company.package} />
                </label>
                <label>
                  Cantidad
                  <input type="number" defaultValue={company.category === "catering" ? 90 : 1} />
                </label>
                <label>
                  Unidad
                  <input defaultValue={company.category === "catering" ? "persona" : "paquete"} />
                </label>
                <label>
                  Precio unitario
                  <input type="number" defaultValue={company.price} />
                </label>
              </div>
              <button className="text-link">+ Añadir línea</button>
            </div>
            <aside>
              <span>Total estimado</span>
              <strong>
                {money(company.category === "catering" ? company.price * 90 : company.price)}
              </strong>
              <label>
                Adelanto
                <input
                  type="number"
                  defaultValue={Math.round(
                    (company.category === "catering" ? company.price * 90 : company.price) * 0.3,
                  )}
                />
              </label>
              <label>
                Vencimiento
                <input type="date" defaultValue="2026-07-30" />
              </label>
              <button
                className="primary"
                onClick={() => {
                  const request = localRequests[0];
                  if (!request) {
                    notify("No hay una solicitud local para cotizar.");
                    return;
                  }
                  const quantity = company.category === "catering" ? 90 : 1;
                  const total =
                    company.category === "catering" ? company.price * quantity : company.price;
                  saveDetailedQuotation({
                    id: `quote-${Date.now()}`,
                    requestId: request.id,
                    userEventId: request.userEventId,
                    providerId: company.id,
                    status: "sent",
                    issuedAt: new Date().toISOString(),
                    validUntil: "2026-07-30",
                    items: [
                      {
                        description: company.package,
                        quantity,
                        unit: company.category === "catering" ? "persona" : "paquete",
                        unitPrice: company.price,
                      },
                    ],
                    total,
                  });
                  notify("Cotización demo enviada a Andrea Salazar");
                }}
              >
                Enviar cotización
              </button>
            </aside>
          </div>
        </section>
        <section className="company-section" id="company-4">
          <div className="section-heading">
            <div>
              <h2>Cotizaciones enviadas</h2>
              <p>Versiones y estados de tus propuestas.</p>
            </div>
          </div>
          <div className="company-table">
            <div>
              <span>Código</span>
              <span>Cliente</span>
              <span>Versión</span>
              <span>Total</span>
              <span>Estado</span>
            </div>
            <div>
              <strong>{ownQuote?.code ?? `NX-${company.category.toUpperCase()}-3901`}</strong>
              <span>Andrea Salazar</span>
              <span>v{ownQuote?.version ?? 1}</span>
              <span>{money(gross)}</span>
              <span>{ownQuote?.status ?? "Enviada"}</span>
            </div>
          </div>
        </section>
        <section className="company-section" id="company-5">
          <div className="section-heading">
            <div>
              <h2>Contrato y pagos simulados</h2>
              <p>Cada cifra corresponde únicamente a {company.company}.</p>
            </div>
          </div>
          <div className="finance-summary">
            <div>
              <span>Importe bruto</span>
              <strong>{money(gross)}</strong>
            </div>
            <div>
              <span>Comisión Nexo</span>
              <strong>- {money(commission)}</strong>
            </div>
            <div>
              <span>Procesamiento</span>
              <strong>- {money(processing)}</strong>
            </div>
            <div>
              <span>Neto de empresa</span>
              <strong>{money(net)}</strong>
            </div>
          </div>
        </section>
        <section className="company-section" id="company-6">
          <div className="section-heading">
            <div>
              <h2>Portafolio y reseñas</h2>
              <p>Tu contenido promocional se mantiene separado de la opinión de clientes.</p>
            </div>
          </div>
          <div className="admin-media">
            <div>
              <span>Portafolio promocional</span>
              <div className="portfolio-grid">
                {[company.image, "/images/landing/hero-event.png"].map((src, i) => (
                  <figure key={i}>
                    <div>
                      <Image src={src} alt="" fill sizes="250px" />
                    </div>
                    <figcaption>Contenido publicado por la empresa</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="reviews">
              <span>Reseñas de clientes</span>
              <article>
                <div className="review-avatar">AS</div>
                <div>
                  <strong>Andrea S. · ★ 5.0</strong>
                  <small>Reseña demo</small>
                  <p>Información clara y buena atención.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
