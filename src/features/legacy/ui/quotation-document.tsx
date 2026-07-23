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

export function QuoteDocument({
  quote: q,
  onAccept,
}: {
  quote: (typeof quotes)[number];
  onAccept: () => void;
}) {
  return (
    <article className="quote-document">
      <header>
        <div>
          <span>Cotización detallada</span>
          <h2>
            {q.code} · versión {q.version}
          </h2>
          <p>
            {q.provider.company} · {q.provider.service}
          </p>
        </div>
        <span className="status-positive">{q.status}</span>
      </header>
      <dl className="quote-meta">
        <div>
          <dt>Cliente</dt>
          <dd>Andrea Salazar</dd>
        </div>
        <div>
          <dt>Evento</dt>
          <dd>{demoEvent.name}</dd>
        </div>
        <div>
          <dt>Emisión</dt>
          <dd>{q.issued}</dd>
        </div>
        <div>
          <dt>Vencimiento</dt>
          <dd>{q.expires}</dd>
        </div>
      </dl>
      <div className="line-items">
        <div className="line-head">
          <span>Concepto</span>
          <span>Cant.</span>
          <span>Unidad</span>
          <span>Precio unit.</span>
          <span>Subtotal</span>
        </div>
        {q.items.map(([name, qty, unit, price]) => (
          <div key={String(name)}>
            <strong>{name}</strong>
            <span>{qty}</span>
            <span>{unit}</span>
            <span>{money(Number(price))}</span>
            <strong>{money(Number(qty) * Number(price))}</strong>
          </div>
        ))}
      </div>
      <div className="quote-totals">
        <span>
          Descuento <strong>{money(q.discount)}</strong>
        </span>
        {q.transport > 0 && (
          <span>
            Transporte <strong>{money(q.transport)}</strong>
          </span>
        )}
        <span className="grand-total">
          Total final <strong>{money(q.total)}</strong>
        </span>
      </div>
      <div className="quote-notes">
        <div>
          <h3>Incluidos</h3>
          <p>{q.provider.included.join(" · ")}</p>
        </div>
        <div>
          <h3>No incluidos y condiciones</h3>
          <p>
            {q.provider.excluded.join(" · ")}. {q.provider.restrictions}
          </p>
        </div>
      </div>
      <section className="payment-plan">
        <div>
          <h3>Adelanto y calendario de pagos</h3>
          <p>
            Adelanto requerido: <strong>{money(q.advance)}</strong>
          </p>
        </div>
        {q.schedule.map(([name, date, amount]) => (
          <div key={String(name)}>
            <span>
              <strong>{name}</strong>
              <small>{date}</small>
            </span>
            <strong>{money(Number(amount))}</strong>
          </div>
        ))}
      </section>
      {q.status !== "Aceptada" && (
        <div className="document-actions">
          <button className="secondary">Rechazar propuesta</button>
          <button className="primary" onClick={onAccept}>
            Aceptar cotización demo
          </button>
        </div>
      )}
    </article>
  );
}
