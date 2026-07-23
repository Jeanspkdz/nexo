"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { readSession } from "@/features/account/infrastructure/browser-account-store";
import { providers } from "@/features/marketplace";
import { ProviderDashboardLayout } from "@/shared/layouts";

type ProviderSection = "summary" | "requests" | "quotes" | "services" | "contracts";

export function ProviderGate({
  providerId,
  children,
}: {
  providerId: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [account, setAccount] = useState<ReturnType<typeof readSession>>(null);

  useEffect(() => {
    const current = readSession();
    if (!current || current.role !== "company" || current.company?.id !== providerId)
      router.replace("/login");
    else setAccount(current);
  }, [providerId, router]);

  return account?.company ? (
    <ProviderDashboardLayout companyId={providerId} companyName={account.company.name}>
      {children}
    </ProviderDashboardLayout>
  ) : null;
}

export function ProviderFrame({
  providerId,
  children,
}: {
  providerId: string;
  active: ProviderSection;
  children: ReactNode;
}) {
  const company = providers.find((item) => item.id === providerId);

  return (
    <section className="product-page provider-flow">
      <header className="provider-flow-head">
        <div>
          <p className="provider-flow-kicker">Panel operativo</p>
          <strong>{company?.name ?? "Tu empresa"}</strong>
        </div>
      </header>
      {children}
    </section>
  );
}
