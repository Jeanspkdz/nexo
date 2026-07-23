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

import { QuoteDocument } from "./quotation-document";

export function Quotes({
  go,
  code,
  navigate,
}: {
  go: (s: Screen) => void;
  code?: string;
  navigate: (code: string) => void;
}) {
  const [acceptedCodes, setAcceptedCodes] = useState<string[]>([]);
  const [localQuotes] = useState(() =>
    readDetailedQuotations().map((quote) => {
      const provider =
        providers.find((candidate) => candidate.id === quote.providerId) ?? providers[0];
      return {
        code: quote.id,
        quoteId: quote.id,
        userEventId: quote.userEventId,
        version: 1,
        provider,
        status: quote.status === "accepted" ? "Aceptada" : "Lista para decidir",
        issued: quote.issuedAt.slice(0, 10),
        expires: quote.validUntil,
        items: quote.items.map(
          (item) =>
            [item.description, item.quantity, item.unit, item.unitPrice] as [
              string,
              number,
              string,
              number,
            ],
        ),
        discount: 0,
        transport: 0,
        total: quote.total,
        advance: Math.round(quote.total * 0.3),
        schedule: [
          ["Adelanto", "Al aceptar", Math.round(quote.total * 0.3)],
          ["Saldo", "Al confirmar", Math.round(quote.total * 0.7)],
        ],
      };
    }),
  );
  const allQuotes: (typeof quotes)[number][] = [
    ...quotes,
    ...(localQuotes as (typeof quotes)[number][]),
  ];
  const index = Math.max(
    0,
    allQuotes.findIndex((quote) => quote.code === code),
  );
  const q = allQuotes[index];
  const quoteForDocument = acceptedCodes.includes(q.code) ? { ...q, status: "Aceptada" } : q;
  return (
    <div className="product-page quote-page">
      <div className="results-heading">
        <div>
          <h1>Cotizaciones de tu evento</h1>
          <p>{demoEvent.name} · Cada empresa envía y conserva su propia propuesta.</p>
        </div>
        <button className="secondary" onClick={() => go("myevent")}>
          Ver contratos aceptados
        </button>
      </div>
      <div className="quote-layout">
        <aside className="quote-list">
          {allQuotes.map((item, i) => (
            <button
              key={item.code}
              className={i === index ? "selected" : ""}
              onClick={() => navigate(item.code)}
            >
              <span>
                {item.provider.company}
                <small>
                  {item.code} · v{item.version}
                </small>
              </span>
              <strong>
                {money(item.total)}
                <small>{item.status}</small>
              </strong>
            </button>
          ))}
        </aside>
        <QuoteDocument
          quote={quoteForDocument}
          onAccept={() => {
            if (!("quoteId" in q)) {
              setAcceptedCodes((codes) => [...codes, q.code]);
              const now = Date.now();
              saveProviderContract({
                id: `contract-${now}`,
                userEventId: "event-demo",
                providerId: q.provider.id,
                acceptedQuotationId: q.code,
                agreedTotal: q.total,
                status: "active",
                paymentInstallments: [
                  {
                    id: `installment-${now}`,
                    label: "Pago total",
                    amount: q.total,
                    dueDate: "Al aceptar",
                    status: "pending",
                  },
                ],
              });
              return;
            }
            const accepted = acceptDetailedQuotation(q.quoteId as string);
            if (!accepted) return;
            const fullPayment = window.confirm(
              "Aceptar con pago total? Selecciona Cancelar para dos cuotas acordadas.",
            );
            const now = Date.now();
            const paymentInstallments = fullPayment
              ? [
                  {
                    id: `installment-${now}`,
                    label: "Pago total",
                    amount: accepted.total,
                    dueDate: "Al aceptar",
                    status: "pending" as const,
                  },
                ]
              : [
                  {
                    id: `installment-${now}`,
                    label: "Adelanto",
                    amount: Math.round(accepted.total * 0.3),
                    dueDate: "Al aceptar",
                    status: "pending" as const,
                  },
                  {
                    id: `installment-${now + 1}`,
                    label: "Saldo",
                    amount: Math.round(accepted.total * 0.7),
                    dueDate: "Al confirmar",
                    status: "pending" as const,
                  },
                ];
            saveProviderContract({
              id: `contract-${now}`,
              userEventId: accepted.userEventId,
              providerId: accepted.providerId,
              acceptedQuotationId: accepted.id,
              agreedTotal: accepted.total,
              status: "active",
              paymentInstallments,
            });
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}
