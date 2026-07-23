export type QuotationRequest = {
  id: string;
  userEventId: string;
  providerId: string;
  providerServiceIds: string[];
  status: "pending";
  createdAt: string;
};

const KEY = "nexo-quotation-requests";

export function saveQuotationRequest(request: QuotationRequest) {
  const existing = (() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as QuotationRequest[]; }
    catch { return []; }
  })();
  localStorage.setItem(KEY, JSON.stringify([...existing, request]));
}

export function readQuotationRequests(providerId: string): QuotationRequest[] {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? "[]") as QuotationRequest[]).filter(
      (request) => request.providerId === providerId,
    );
  } catch { return []; }
}
