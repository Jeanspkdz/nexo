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

export function NewCompanyPanel({ account }: { account: LocalAccount }) {
  const company = account.company;
  if (!company) return null;
  return (
    <div className="company-shell">
      <aside className="company-nav">
        <div>
          <span>Área de empresa</span>
          <strong>{company.name}</strong>
        </div>
        <button className="current">Resumen</button>
        <button>Servicios y paquetes</button>
        <button>Solicitudes</button>
        <button>Cotizaciones</button>
        <button>Contratos y pagos</button>
        <button>Portafolio y reseñas</button>
        <p>Cuenta local creada en este navegador.</p>
      </aside>
      <div className="company-content new-company-content">
        <header>
          <div>
            <span>Panel de empresa</span>
            <h1>Bienvenida, {company.name}</h1>
            <p>
              Tu cuenta está lista. Completa el primer servicio para aparecer en el marketplace.
            </p>
          </div>
        </header>
        <section className="company-metrics">
          <article>
            <span>Servicios publicados</span>
            <strong>0</strong>
            <small>Añade tu primer servicio</small>
          </article>
          <article>
            <span>Solicitudes</span>
            <strong>0</strong>
            <small>Llegarán cuando publiques</small>
          </article>
          <article>
            <span>Contratos</span>
            <strong>0</strong>
            <small>Sin contratos todavía</small>
          </article>
          <article>
            <span>Neto estimado</span>
            <strong>S/ 0</strong>
            <small>Pagos simulados</small>
          </article>
        </section>
        <section className="new-company-start">
          <span className="choice-mark company">E</span>
          <div>
            <h2>Publica tu primer servicio</h2>
            <p>
              Define el paquete, precio desde, mínimos, incluidos y condiciones para que los
              clientes puedan solicitar una cotización.
            </p>
          </div>
          <button className="primary">Crear primer servicio</button>
        </section>
        <dl className="fact-grid company-profile-facts">
          <div>
            <dt>Categoría</dt>
            <dd>{catName(company.category)}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>{company.location}</dd>
          </div>
          <div>
            <dt>Cobertura</dt>
            <dd>{company.coverage}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
