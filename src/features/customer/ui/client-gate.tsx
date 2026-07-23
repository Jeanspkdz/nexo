"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  readSession,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { ClientDashboardLayout } from "@/shared/layouts";

const ClientAccountContext = createContext<LocalAccount | null>(null);

export function useClientAccount() {
  const account = useContext(ClientAccountContext);
  if (!account) throw new Error("Missing client session");
  return account;
}

export function ClientGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [account, setAccount] = useState<LocalAccount | null>(null);

  useEffect(() => {
    const current = readSession();
    if (!current || current.role !== "client") router.replace("/login");
    else setAccount(current);
  }, [router]);

  return account ? (
    <ClientAccountContext.Provider value={account}>
      <ClientDashboardLayout name={account.firstName} accountId={account.id}>
        {children}
      </ClientDashboardLayout>
    </ClientAccountContext.Provider>
  ) : null;
}
