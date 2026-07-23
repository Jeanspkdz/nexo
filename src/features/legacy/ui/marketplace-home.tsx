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

export function Home({
  openCategory,
  openProvider,
}: {
  openCategory: (id: Category) => void;
  openProvider: (id: string) => void;
}) {
  return (
    <>
      <section className="explore-context" aria-labelledby="explore-title">
        <div>
          <span>Evento activo</span>
          <h1 id="explore-title">{demoEvent.name}</h1>
          <p>
            {demoEvent.type} · 19 de septiembre de 2026 · {demoEvent.guests} invitados ·{" "}
            {demoEvent.location}
          </p>
        </div>
        <button className="secondary">Editar evento</button>
      </section>
      <section className="page-section explore-categories" aria-labelledby="category-title">
        <div className="section-heading">
          <div>
            <h2 id="category-title">¿Qué quieres resolver ahora?</h2>
            <p>Explora proveedores para las decisiones pendientes de este evento.</p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <article key={c.id} className={`category-card ${!c.active ? "coming" : ""}`}>
              {c.image ? (
                <Image src={c.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
              ) : (
                <div className="visual-placeholder" aria-hidden="true">
                  <span>{c.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3>{c.name}</h3>
                <p>{c.note}</p>
                {c.active ? (
                  <button onClick={() => openCategory(c.id as Category)}>
                    Explorar opciones <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <span className="coming-label">Próximamente</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section sponsored" aria-labelledby="sponsored-title">
        <div className="section-heading">
          <div>
            <span className="sponsor-label">Patrocinado</span>
            <h2 id="sponsored-title">Propuesta destacada para {demoEvent.type.toLowerCase()}</h2>
          </div>
          <p>Ubicación promocional pagada. No modifica las reseñas ni el orden orgánico.</p>
        </div>
        <ProviderRow provider={providers[0]} openProvider={openProvider} />
      </section>
      <section className="page-section" aria-labelledby="organic-title">
        <div className="section-heading">
          <div>
            <h2 id="organic-title">Mejor valoradas para {demoEvent.type.toLowerCase()} en Lima</h2>
            <p>Orden orgánico según las reseñas demo para este tipo de evento.</p>
          </div>
        </div>
        <div className="organic-list">
          {providers
            .filter((p) => !p.sponsored)
            .slice(0, 3)
            .map((p, i) => (
              <div key={p.serviceId}>
                <span className="rank">{i + 1}</span>
                <ProviderRow provider={p} openProvider={openProvider} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
