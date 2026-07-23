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

export function Profile({
  provider,
  openProvider,
  go,
}: {
  provider: (typeof providers)[number];
  openProvider: (id: string, target?: "profile" | "service") => void;
  go: (s: Screen) => void;
}) {
  return (
    <div className="product-page detail-page">
      <div className="breadcrumbs">
        <button onClick={() => go("results")}>{catName(provider.category)}</button>
        <span>/</span>
        <span>{provider.company}</span>
      </div>
      <header className="profile-header">
        <div className="profile-mark">
          {provider.company
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p>Empresa demo · Responde en aproximadamente 4 horas</p>
          <h1>{provider.company}</h1>
          <span>
            ★ {provider.rating} ({provider.reviews} reseñas) · {provider.location}
          </span>
        </div>
        <button className="primary" onClick={() => openProvider(provider.id, "service")}>
          Ver servicio y precio
        </button>
      </header>
      <div className="profile-layout">
        <div>
          <section className="plain-section">
            <h2>Sobre la empresa</h2>
            <p>
              {provider.lead} Atiende {provider.coverage.toLowerCase()} y mantiene información
              detallada para que puedas evaluar el servicio antes de solicitar una propuesta.
            </p>
            <dl className="fact-grid">
              <div>
                <dt>Cobertura</dt>
                <dd>{provider.coverage}</dd>
              </div>
              <div>
                <dt>Categoría activa</dt>
                <dd>{catName(provider.category)}</dd>
              </div>
              <div>
                <dt>Capacidad</dt>
                <dd>{provider.capacity}</dd>
              </div>
            </dl>
          </section>
          <section className="portfolio">
            <div className="section-heading">
              <div>
                <span>Contenido publicado por la empresa</span>
                <h2>Portafolio promocional</h2>
              </div>
            </div>
            <div className="portfolio-grid">
              {[provider.image, "/images/landing/hero-event.png", provider.image].map((src, i) => (
                <figure key={i}>
                  <div>
                    <Image
                      src={src}
                      alt={`Trabajo promocional ${i + 1} de ${provider.company}`}
                      fill
                      sizes="33vw"
                    />
                  </div>
                  <figcaption>
                    {i === 0
                      ? "Celebración reciente"
                      : i === 1
                        ? "Preparación y detalles"
                        : "El equipo en acción"}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          <section className="reviews">
            <h2>Reseñas de clientes</h2>
            {[
              "Todo estuvo explicado desde el inicio y el equipo cumplió los tiempos.",
              "La propuesta fue clara y pudimos ajustar extras sin perder el control del total.",
            ].map((text, i) => (
              <article key={text}>
                <div className="review-avatar">{i ? "MC" : "JP"}</div>
                <div>
                  <strong>{i ? "María C." : "José P."} · ★ 5.0</strong>
                  <small>{i ? "Cumpleaños" : "Evento corporativo"} · Reseña demo</small>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
        <aside className="profile-aside">
          <span>Servicio disponible</span>
          <h2>{provider.service}</h2>
          <p>
            Desde <strong>{money(provider.price)}</strong> · {provider.unit}
          </p>
          <small>{provider.minimum}</small>
          <button className="primary" onClick={() => openProvider(provider.id, "service")}>
            Revisar condiciones
          </button>
        </aside>
      </div>
    </div>
  );
}
