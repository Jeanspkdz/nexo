export type QuotationItem = { description: string; quantity: number; unit: string; unitPrice: number };
export type DetailedQuotation = {
  id: string; requestId: string; userEventId: string; providerId: string; status: "sent" | "accepted";
  issuedAt: string; validUntil: string; items: QuotationItem[]; total: number;
};
const KEY = "nexo-detailed-quotations";
export function saveDetailedQuotation(quotation: DetailedQuotation) {
  const all = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as DetailedQuotation[]; } catch { return []; } })();
  localStorage.setItem(KEY, JSON.stringify([...all, quotation]));
}
export function readDetailedQuotations(providerId?: string): DetailedQuotation[] {
  try { const all = JSON.parse(localStorage.getItem(KEY) ?? "[]") as DetailedQuotation[]; return providerId ? all.filter((quote) => quote.providerId === providerId) : all; } catch { return []; }
}

export function acceptDetailedQuotation(id: string) {
  const all = readDetailedQuotations();
  const quote = all.find((candidate) => candidate.id === id);
  if (!quote || quote.status === "accepted") return quote ?? null;
  const next = all.map((candidate) => candidate.id === id ? { ...candidate, status: "accepted" as const } : candidate);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next.find((candidate) => candidate.id === id) ?? null;
}
