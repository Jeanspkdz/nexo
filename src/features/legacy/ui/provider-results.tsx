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

import { ProviderRow } from "./provider-row";

export function Results({
  category,
  compare,
  toggleCompare,
  openProvider,
  go,
}: {
  category: Category;
  compare: string[];
  toggleCompare: (id: string) => void;
  openProvider: (id: string, target?: "profile" | "service") => void;
  go: (s: Screen) => void;
}) {
  const list = providers
    .filter((p) => p.category === category)
    .sort((left, right) => Number(right.sponsored) - Number(left.sponsored));
  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <button onClick={() => go("home")}>Inicio</button>
        <span>/</span>
        <span>{catName(category)}</span>
      </div>
      <div className="results-heading">
        <div>
          <h1>{catName(category)} para tu evento</h1>
          <p>Cumpleaños · 19 sep 2026 · 90 invitados · Lima</p>
        </div>
        <button className="secondary">
          Filtros <span className="filter-count">3</span>
        </button>
      </div>
      <div className="results-layout">
        <aside className="filters">
          <h2>Ajustar resultados</h2>
          <label>
            Distrito
            <select>
              <option>Todo Lima</option>
              <option>Miraflores</option>
              <option>Surco</option>
              <option>Barranco</option>
            </select>
          </label>
          <label>
            Presupuesto máximo
            <input type="number" defaultValue={category === "catering" ? 130 : 6000} />
          </label>
          <label className="check">
            <input type="checkbox" defaultChecked /> Mostrar disponibles
          </label>
          <p>El precio desde no reemplaza una cotización detallada.</p>
        </aside>
        <section className="result-list" aria-label="Resultados">
          {list.map((p, index) => (
            <article className="result-card" key={p.serviceId}>
              <div className="result-image">
                <Image
                  src={p.image}
                  alt={`Portafolio promocional de ${p.company}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 720px) 100vw, 280px"
                />
                {p.sponsored && <span className="sponsor-label">Patrocinado</span>}
              </div>
              <div className="result-copy">
                <div>
                  <span className="category-name">{p.company}</span>
                  <h2>{p.service}</h2>
                </div>
                <p>
                  {p.location} · Cobertura: {p.coverage}
                </p>
                <strong className="rating">
                  ★ {p.rating} <small>{p.reviews} reseñas</small>
                </strong>
                <div className="price-block">
                  <span>Desde</span>
                  <strong>{money(p.price)}</strong>
                  <small>
                    {p.unit} · {p.minimum}
                  </small>
                </div>
                <div className="result-actions">
                  <label className="compare-check">
                    <input
                      type="checkbox"
                      checked={compare.includes(p.id)}
                      onChange={() => toggleCompare(p.id)}
                    />
                    Comparar
                  </label>
                  <button className="text-link" onClick={() => openProvider(p.id)}>
                    Ver perfil
                  </button>
                  <button className="primary" onClick={() => openProvider(p.id, "service")}>
                    Ver servicio
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      {compare.length > 0 && (
        <div className="compare-bar">
          <span>
            <strong>{compare.length}</strong> servicio{compare.length > 1 ? "s" : ""} de{" "}
            {catName(category)} seleccionado{compare.length > 1 ? "s" : ""}
          </span>
          <button className="primary" disabled={compare.length < 2} onClick={() => go("compare")}>
            Comparar {compare.length}
          </button>
        </div>
      )}
    </div>
  );
}
