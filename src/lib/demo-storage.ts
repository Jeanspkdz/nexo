import type { QuotationRequest } from "@/domain/quotation-flow";

const STORAGE_KEY = "nexo-eventos-v3-request";
const LEGACY_STORAGE_KEYS = ["nexo-eventos-v1-request", "nexo-eventos-v2-request"];

export function readRequest(): QuotationRequest | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as QuotationRequest;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveRequest(request: QuotationRequest) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
}

export function resetDemo() {
  window.localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
}
