"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { readSession } from "@/features/account/infrastructure/browser-account-store";

export function ProviderPanelRedirect() {
  const router = useRouter();

  useEffect(() => {
    const account = readSession();
    router.replace(
      account?.role === "company" && account.company ? `/panel/${account.company.id}` : "/login",
    );
  }, [router]);

  return null;
}
