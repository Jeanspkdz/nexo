export type EntityId = string;
export type Money = number;
export type ProviderCategoryId =
  | "salones"
  | "catering"
  | "foto"
  | "decoracion"
  | "musica"
  | "mobiliario"
  | "entretenimiento"
  | "transporte";

export type EventTypeId = "wedding" | "birthday" | "corporate";

export type ProviderCategory = {
  id: ProviderCategoryId;
  name: string;
  image: string | null;
  note: string;
  active: boolean;
};

export type EventType = { id: EventTypeId; name: string };

export type Provider = {
  id: EntityId;
  name: string;
  location: string;
  coverage: string;
  rating: number;
  reviewCount: number;
  image: string;
  sponsored: boolean;
  description: string;
};

export type ProviderService = {
  id: EntityId;
  providerId: EntityId;
  categoryId: ProviderCategoryId;
  name: string;
  currentUnitPrice: Money;
  unit: "person" | "hour" | "fixed";
  minimumQuantity: number;
  // Presentation metadata retained by the marketplace prototype.
  startingPrice: Money;
  priceUnit: string;
  minimum: string;
  capacity: string;
  packageName: string;
  included: string[];
  excluded: string[];
  extras: string[];
  restrictions: string;
  supportedEventTypes: EventTypeId[];
};

export type UserEvent = {
  id: EntityId;
  userId: EntityId;
  name: string;
  type: string;
  date: string;
  guestCount: number;
  location: string;
};

export type QuotationRequest = {
  id: EntityId;
  userEventId: EntityId;
  providerId: EntityId;
  providerServiceIds: EntityId[];
  status: "pending" | "quoted";
  createdAt: string;
};

export type QuotationItem = {
  providerServiceId: EntityId;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: Money;
};
export type PaymentInstallment = {
  id: EntityId;
  label: string;
  amount: Money;
  dueDate: string;
  status: "pending" | "paid";
};

export type Quotation = {
  id: EntityId;
  requestId: EntityId;
  providerId: EntityId;
  items: QuotationItem[];
  total: Money;
  validUntil: string;
  paymentInstallments: PaymentInstallment[];
  status: "sent" | "accepted" | "rejected";
};

export type ProviderContract = {
  id: EntityId;
  userEventId: EntityId;
  providerId: EntityId;
  acceptedQuotationId: EntityId;
  services: Array<{
    providerServiceId: EntityId;
    nameSnapshot: string;
    quantity: number;
    unit: string;
    unitPrice: Money;
    subtotal: Money;
  }>;
  agreedTotal: Money;
  status: "active";
  createdAt: string;
  paymentInstallments: PaymentInstallment[];
};
