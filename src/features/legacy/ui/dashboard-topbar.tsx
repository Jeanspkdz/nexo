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

export function DashboardTopbar({
  session,
  onLogout,
}: {
  session: LocalAccount | null;
  onLogout: () => void;
}) {
  return (
    <header className="dashboard-topbar">
      <button className="dashboard-logo" onClick={() => window.location.assign("/mi-evento")}>
        nexo
      </button>
      <div className="dashboard-breadcrumb">
        <span>Mis eventos</span>
        <b>›</b>
        <strong>{demoEvent.name}</strong>
      </div>
      <div className="dashboard-top-actions">
        <button aria-label="Notificaciones">
          <DashboardIcon name="bell" />
        </button>
        <button aria-label="Mensajes">
          <DashboardIcon name="chat" />
        </button>
        <span className="dashboard-avatar">{`${session?.firstName?.[0] ?? "A"}${session?.lastName?.[0] ?? "S"}`}</span>
        <strong>{session ? `${session.firstName} ${session.lastName}` : "Cuenta cliente"}</strong>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
}
