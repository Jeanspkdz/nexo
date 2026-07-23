import type {
  ProviderContract,
  Quotation,
  QuotationRequest,
  UserEvent,
} from "@/features/marketplace/domain/models";

export type TransactionState = {
  events: UserEvent[];
  requests: QuotationRequest[];
  quotes: Quotation[];
  contracts: ProviderContract[];
  selectedEventByUser: Record<string, string>;
};

export const emptyTransactionState = (): TransactionState => ({
  events: [],
  requests: [],
  quotes: [],
  contracts: [],
  selectedEventByUser: {},
});
