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

export function ClientDashboardFrame({
  active,
  children,
}: {
  active: "events" | "providers" | "quotes" | "none";
  children: ReactNode;
}) {
  const nav = [
    ["calendar", "Eventos", "/mi-evento", "events"],
    ["users", "Proveedores", "/explorar", "providers"],
    ["card", "Cotizaciones", "/cotizaciones", "quotes"],
  ] as const;
  return (
    <div className="client-dashboard-shell">
      <aside className="client-dashboard-nav" aria-label="Secciones del evento">
        {nav.map(([icon, label, href, key]) => (
          <button
            key={label}
            className={active === key ? "current" : ""}
            aria-current={active === key ? "page" : undefined}
            onClick={() => window.location.assign(href)}
          >
            <DashboardIcon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </aside>
      <div className="client-dashboard-content">{children}</div>
    </div>
  );
}
