export type Role = "user" | "company";
export type QuotationStatus =
  | "pending"
  | "quoted"
  | "accepted"
  | "rejected"
  | "declined"
  | "withdrawn"
  | "expired"
  | "reservation_intent";
export type RequestedService =
  | "Solo salón"
  | "Mesas y sillas"
  | "Decoración"
  | "Sonido"
  | "Catering";

export type QuotationRequest = {
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: number;
  requestedServices: RequestedService[];
  note: string;
  status: QuotationStatus;
  createdAt: string;
  declineReason?: string;
  declinedAt?: string;
  withdrawReason?: string;
  withdrawnAt?: string;
  quotedAt?: string;
  decidedAt?: string;
  quote?: {
    total: number;
    requiredAdvance: number;
    validUntil: string;
    note: string;
  };
};

export function currentQuotationStatus(request: QuotationRequest): QuotationStatus {
  if (
    request.status === "quoted" &&
    request.quote &&
    request.quote.validUntil < new Date().toISOString().slice(0, 10)
  ) {
    return "expired";
  }
  return request.status;
}

export const requestedServiceOptions: RequestedService[] = [
  "Solo salón",
  "Mesas y sillas",
  "Decoración",
  "Sonido",
  "Catering",
];

export const demoCompany = {
  name: "Salón de Jardines",
  location: "Santiago de Surco, Lima",
  capacity: "Hasta 180 invitados",
  description:
    "Un espacio cálido y versátil para celebraciones familiares, matrimonios y eventos especiales.",
};
