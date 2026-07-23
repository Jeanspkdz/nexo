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

export function ProviderRow({
  provider,
  openProvider,
}: {
  provider: (typeof providers)[number];
  openProvider: (id: string) => void;
}) {
  return (
    <article className="provider-row">
      <div className="provider-thumb">
        <Image src={provider.image} alt="" fill sizes="180px" />
      </div>
      <div className="provider-main">
        <span>{catName(provider.category)}</span>
        <h3>{provider.company}</h3>
        <p>{provider.lead}</p>
      </div>
      <div className="provider-facts">
        <span>{provider.location}</span>
        <strong>
          ★ {provider.rating} <small>({provider.reviews} reseñas)</small>
        </strong>
        <span>
          Desde <strong>{money(provider.price)}</strong> · {provider.unit}
        </span>
      </div>
      <button className="secondary" onClick={() => openProvider(provider.id)}>
        Ver empresa
      </button>
    </article>
  );
}
