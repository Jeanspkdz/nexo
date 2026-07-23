"use client";

import {
  createTransactionStore,
  type TransactionPersistence,
} from "@/features/transactions/application/create-transaction-store";
import {
  emptyTransactionState,
  type TransactionState,
} from "@/features/transactions/domain/transaction-state";

const STORAGE_KEY = "nexo-prototype-state-v3";

const browserPersistence: TransactionPersistence = {
  read() {
    try {
      const persisted = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "{}",
      ) as Partial<TransactionState>;
      return { ...emptyTransactionState(), ...persisted };
    } catch {
      return emptyTransactionState();
    }
  },
  write(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

const createBrowserId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const transactionStore = createTransactionStore({
  persistence: browserPersistence,
  createId: createBrowserId,
  now: () => new Date(),
});
