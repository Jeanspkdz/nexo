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

export function Service({
  provider,
  go,
}: {
  provider: (typeof providers)[number];
  go: (s: Screen) => void;
}) {
  return (
    <div className="product-page detail-page">
      <div className="breadcrumbs">
        <button onClick={() => go("profile")}>{provider.company}</button>
        <span>/</span>
        <span>{provider.service}</span>
      </div>
      <header className="service-title">
        <div>
          <span>{catName(provider.category)}</span>
          <h1>{provider.service}</h1>
          <p>
            {provider.company} · ★ {provider.rating} ({provider.reviews} reseñas)
          </p>
        </div>
        <div className="service-price">
          <span>Precio desde</span>
          <strong>{money(provider.price)}</strong>
          <small>
            {provider.unit}
            <br />
            {provider.minimum}
          </small>
        </div>
      </header>
      <div className="service-layout">
        <div>
          <section className="package">
            <div>
              <span>Paquete recomendado</span>
              <h2>{provider.package}</h2>
              <p>{provider.capacity}</p>
            </div>
            <strong>{money(provider.price)}</strong>
          </section>
          <section className="terms-grid">
            <div>
              <h2>Incluye</h2>
              <ul className="check-list">
                {provider.included.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>No incluye</h2>
              <ul>
                {provider.excluded.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="plain-section">
            <h2>Extras disponibles</h2>
            <ul className="divided-list">
              {provider.extras.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section className="conditions">
            <h2>Condiciones y restricciones</h2>
            <p>{provider.restrictions}</p>
            <p>
              La disponibilidad y el precio final se confirman únicamente en la cotización enviada
              por la empresa.
            </p>
          </section>
        </div>
        <aside className="request-aside">
          <h2>Solicita una propuesta</h2>
          <p>
            Usaremos los datos de tu evento y te pediremos solo la información propia de{" "}
            {catName(provider.category).toLowerCase()}.
          </p>
          <button className="primary" onClick={() => go("event")}>
            Solicitar cotización
          </button>
          <button className="secondary" onClick={() => go("results")}>
            Volver a resultados
          </button>
        </aside>
      </div>
    </div>
  );
}
