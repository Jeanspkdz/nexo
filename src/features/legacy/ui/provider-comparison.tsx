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

export function Compare({
  ids,
  go,
  openProvider,
}: {
  ids: string[];
  go: (s: Screen) => void;
  openProvider: (id: string, target?: "profile" | "service") => void;
}) {
  const list = providers.filter((p) => ids.includes(p.id));
  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <button onClick={() => go("results")}>Resultados</button>
        <span>/</span>
        <span>Comparación</span>
      </div>
      <div className="results-heading">
        <div>
          <h1>Compara {catName(list[0].category)}</h1>
          <p>
            Solo mostramos atributos equivalentes de esta categoría. El precio final depende de cada
            cotización.
          </p>
        </div>
      </div>
      <div className="comparison-table" role="table" aria-label="Comparación de servicios">
        <div className="comparison-labels" role="rowheader">
          <span>Empresa</span>
          <span>Precio desde</span>
          <span>Modalidad</span>
          <span>Capacidad / cobertura</span>
          <span>Valoración</span>
          <span>Incluidos principales</span>
          <span></span>
        </div>
        {list.map((p) => (
          <div className="comparison-column" key={p.serviceId}>
            <strong>{p.company}</strong>
            <strong>{money(p.price)}</strong>
            <span>
              {p.unit}
              <small>{p.minimum}</small>
            </span>
            <span>
              {p.capacity}
              <small>{p.coverage}</small>
            </span>
            <span>
              ★ {p.rating} <small>{p.reviews} reseñas</small>
            </span>
            <ul>
              {p.included.slice(0, 3).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <button className="primary" onClick={() => openProvider(p.id, "service")}>
              Ver y cotizar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
