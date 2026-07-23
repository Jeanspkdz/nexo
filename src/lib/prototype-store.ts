"use client";

import type {
  PaymentInstallment,
  ProviderContract,
  Quotation,
  QuotationRequest,
  UserEvent,
} from "@/domain/marketplace";

type State = {
  events: UserEvent[];
  requests: QuotationRequest[];
  quotes: Quotation[];
  contracts: ProviderContract[];
  selectedEventByUser: Record<string, string>;
};
// Technical version only: previous local data used fields that are no longer part
// of the agreed domain model, so a clean prototype state is required.
const KEY = "nexo-prototype-state-v3";
const empty = (): State => ({
  events: [],
  requests: [],
  quotes: [],
  contracts: [],
  selectedEventByUser: {},
});
function read(): State {
  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return empty();
  }
}
function write(state: State) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const prototypeStore = {
  reset() {
    localStorage.removeItem(KEY);
  },
  event(eventId: string) {
    return read().events.find((event) => event.id === eventId) ?? null;
  },
  events(userId: string) {
    return read().events.filter((event) => event.userId === userId);
  },
  selectedEvent(userId: string) {
    const state = read();
    return state.events.find((event) => event.id === state.selectedEventByUser[userId]) ?? null;
  },
  saveEvent(event: Omit<UserEvent, "id">) {
    const state = read();
    const record = { ...event, id: id("event") };
    state.events.push(record);
    state.selectedEventByUser[event.userId] = record.id;
    write(state);
    return record;
  },
  selectEvent(userId: string, eventId: string) {
    const state = read();
    state.selectedEventByUser[userId] = eventId;
    write(state);
  },
  createRequest(input: Omit<QuotationRequest, "id" | "status" | "createdAt">) {
    const state = read();
    const request = {
      ...input,
      id: id("request"),
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    state.requests.push(request);
    write(state);
    return request;
  },
  requests(providerId: string) {
    return read().requests.filter((request) => request.providerId === providerId);
  },
  requestsForEvent(userEventId: string) {
    return read().requests.filter((request) => request.userEventId === userEventId);
  },
  quoteRequest(requestId: string, quote: Omit<Quotation, "id" | "requestId" | "status">) {
    const state = read();
    const request = state.requests.find((candidate) => candidate.id === requestId);
    if (!request) return null;
    const record = { ...quote, id: id("quote"), requestId, status: "sent" as const };
    request.status = "quoted";
    state.quotes.push(record);
    write(state);
    return record;
  },
  quotesForEvent(userEventId: string) {
    const state = read();
    const requestIds = new Set(
      state.requests
        .filter((request) => request.userEventId === userEventId)
        .map((request) => request.id),
    );
    return state.quotes.filter((quote) => requestIds.has(quote.requestId));
  },
  acceptQuote(quoteId: string) {
    const state = read();
    const existing = state.contracts.find((contract) => contract.acceptedQuotationId === quoteId);
    if (existing) return existing;
    const quote = state.quotes.find((candidate) => candidate.id === quoteId);
    if (!quote || quote.status !== "sent") return null;
    const request = state.requests.find((candidate) => candidate.id === quote.requestId);
    if (!request) return null;
    const services = quote.items.map((item) => ({
      providerServiceId: item.providerServiceId,
      nameSnapshot: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      subtotal: item.quantity * item.unitPrice,
    }));
    const agreedTotal = services.reduce((sum, service) => sum + service.subtotal, 0);
    if (agreedTotal !== quote.total) return null;
    quote.status = "accepted";
    const contract: ProviderContract = {
      id: id("contract"),
      userEventId: request.userEventId,
      providerId: quote.providerId,
      acceptedQuotationId: quoteId,
      services,
      agreedTotal,
      status: "active",
      createdAt: new Date().toISOString(),
      paymentInstallments: quote.paymentInstallments.map((installment) => ({ ...installment })),
    };
    state.contracts.push(contract);
    write(state);
    return contract;
  },
  contracts(userEventId: string) {
    const seen = new Set<string>();
    return read().contracts.filter(
      (contract) =>
        contract.userEventId === userEventId &&
        !seen.has(contract.acceptedQuotationId) &&
        Boolean(seen.add(contract.acceptedQuotationId)),
    );
  },
  contractsForProvider(providerId: string) {
    const seen = new Set<string>();
    return read().contracts.filter(
      (contract) =>
        contract.providerId === providerId &&
        !seen.has(contract.acceptedQuotationId) &&
        Boolean(seen.add(contract.acceptedQuotationId)),
    );
  },
};
