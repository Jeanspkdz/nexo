import type {
  ProviderContract,
  Quotation,
  QuotationRequest,
  UserEvent,
} from "@/features/marketplace/domain/models";
import {
  emptyTransactionState,
  type TransactionState,
} from "@/features/transactions/domain/transaction-state";

export type TransactionPersistence = {
  read(): TransactionState;
  write(state: TransactionState): void;
  reset(): void;
};

export type TransactionStoreDependencies = {
  persistence: TransactionPersistence;
  createId(prefix: string): string;
  now(): Date;
};

export function createTransactionStore({
  persistence,
  createId,
  now,
}: TransactionStoreDependencies) {
  return {
    reset() {
      persistence.reset();
    },
    event(eventId: string) {
      return persistence.read().events.find((event) => event.id === eventId) ?? null;
    },
    events(userId: string) {
      return persistence.read().events.filter((event) => event.userId === userId);
    },
    selectedEvent(userId: string) {
      const state = persistence.read();
      return state.events.find((event) => event.id === state.selectedEventByUser[userId]) ?? null;
    },
    saveEvent(event: Omit<UserEvent, "id">) {
      const state = persistence.read();
      const record = { ...event, id: createId("event") };
      state.events.push(record);
      state.selectedEventByUser[event.userId] = record.id;
      persistence.write(state);
      return record;
    },
    selectEvent(userId: string, eventId: string) {
      const state = persistence.read();
      state.selectedEventByUser[userId] = eventId;
      persistence.write(state);
    },
    createRequest(input: Omit<QuotationRequest, "id" | "status" | "createdAt">) {
      const state = persistence.read();
      const request = {
        ...input,
        id: createId("request"),
        status: "pending" as const,
        createdAt: now().toISOString(),
      };
      state.requests.push(request);
      persistence.write(state);
      return request;
    },
    requests(providerId: string) {
      return persistence.read().requests.filter((request) => request.providerId === providerId);
    },
    requestsForEvent(userEventId: string) {
      return persistence.read().requests.filter((request) => request.userEventId === userEventId);
    },
    quoteRequest(requestId: string, quote: Omit<Quotation, "id" | "requestId" | "status">) {
      const state = persistence.read();
      const request = state.requests.find((candidate) => candidate.id === requestId);
      if (!request) return null;

      const record = {
        ...quote,
        id: createId("quote"),
        requestId,
        status: "sent" as const,
      };
      request.status = "quoted";
      state.quotes.push(record);
      persistence.write(state);
      return record;
    },
    quotesForEvent(userEventId: string) {
      const state = persistence.read();
      const requestIds = new Set(
        state.requests
          .filter((request) => request.userEventId === userEventId)
          .map((request) => request.id),
      );
      return state.quotes.filter((quote) => requestIds.has(quote.requestId));
    },
    acceptQuote(quoteId: string) {
      const state = persistence.read();
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
        id: createId("contract"),
        userEventId: request.userEventId,
        providerId: quote.providerId,
        acceptedQuotationId: quoteId,
        services,
        agreedTotal,
        status: "active",
        createdAt: now().toISOString(),
        paymentInstallments: quote.paymentInstallments.map((installment) => ({
          ...installment,
        })),
      };
      state.contracts.push(contract);
      persistence.write(state);
      return contract;
    },
    contracts(userEventId: string) {
      const seen = new Set<string>();
      return persistence
        .read()
        .contracts.filter(
          (contract) =>
            contract.userEventId === userEventId &&
            !seen.has(contract.acceptedQuotationId) &&
            Boolean(seen.add(contract.acceptedQuotationId)),
        );
    },
    contractsForProvider(providerId: string) {
      const seen = new Set<string>();
      return persistence
        .read()
        .contracts.filter(
          (contract) =>
            contract.providerId === providerId &&
            !seen.has(contract.acceptedQuotationId) &&
            Boolean(seen.add(contract.acceptedQuotationId)),
        );
    },
  };
}

export function createInMemoryTransactionPersistence(
  initialState: TransactionState = emptyTransactionState(),
): TransactionPersistence {
  let state = structuredClone(initialState);

  return {
    read: () => structuredClone(state),
    write: (nextState) => {
      state = structuredClone(nextState);
    },
    reset: () => {
      state = emptyTransactionState();
    },
  };
}
