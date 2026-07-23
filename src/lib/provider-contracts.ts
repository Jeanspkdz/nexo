export type PaymentInstallment = { id: string; label: string; amount: number; dueDate: string; status: "pending" | "paid" };
export type ProviderContract = { id: string; userEventId: string; providerId: string; acceptedQuotationId: string; agreedTotal: number; paymentInstallments: PaymentInstallment[]; status: "active" };
const KEY = "nexo-provider-contracts";
export function saveProviderContract(contract: ProviderContract) {
  const all = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as ProviderContract[]; } catch { return []; } })();
  localStorage.setItem(KEY, JSON.stringify([...all, contract]));
}

export function readProviderContracts(providerId?: string): ProviderContract[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? "[]") as ProviderContract[];
    return providerId ? all.filter((contract) => contract.providerId === providerId) : all;
  } catch { return []; }
}
