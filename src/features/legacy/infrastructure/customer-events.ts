import type { EventTypeId } from "@/features/marketplace/domain/models";

export type CustomerEvent = {
  id: string;
  userId: string;
  name: string;
  eventType: EventTypeId;
  date: string;
  time: string;
  guestCount: number;
  location: string;
  budget?: number;
  accessibility?: string;
  notes?: string;
};

const KEY = "nexo-customer-events";
const SELECTED_KEY = "nexo-selected-customer-event";

export function readCustomerEvents(userId: string): CustomerEvent[] {
  try {
    const records = JSON.parse(localStorage.getItem(KEY) ?? "[]") as CustomerEvent[];
    return records.filter((event) => event.userId === userId);
  } catch {
    return [];
  }
}

export function saveCustomerEvent(event: CustomerEvent) {
  const all = (() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CustomerEvent[];
    } catch {
      return [];
    }
  })();
  const next = [...all.filter((candidate) => candidate.id !== event.id), event];
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function readSelectedCustomerEventId(userId: string): string | null {
  try {
    const selected = JSON.parse(localStorage.getItem(SELECTED_KEY) ?? "null") as {
      userId: string;
      eventId: string;
    } | null;
    return selected?.userId === userId ? selected.eventId : null;
  } catch {
    return null;
  }
}

export function selectCustomerEvent(userId: string, eventId: string) {
  localStorage.setItem(SELECTED_KEY, JSON.stringify({ userId, eventId }));
}
