export type AccountRole = "client" | "company";

export type LocalAccount = {
  id: string;
  role: AccountRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  company?: {
    id: string;
    name: string;
    category: "salones" | "catering" | "foto";
    location: string;
    coverage: string;
    description: string;
    commercialPhone: string;
  };
};

const ACCOUNTS_KEY = "nexo-local-accounts";
const SESSION_KEY = "nexo-local-session";

export const demoAccounts: LocalAccount[] = [
  {
    id: "client-andrea",
    role: "client",
    firstName: "Andrea",
    lastName: "Salazar",
    email: "andrea@nexo.demo",
    password: "nexo1234",
  },
  {
    id: "company-jardines",
    role: "company",
    firstName: "Lucía",
    lastName: "Torres",
    email: "jardines@nexo.demo",
    password: "nexo1234",
    phone: "987 654 321",
    company: {
      id: "jardines",
      name: "Jardines de Surco",
      category: "salones",
      location: "Santiago de Surco, Lima",
      coverage: "Lima Metropolitana",
      description: "Espacio flexible para celebraciones sociales y corporativas.",
      commercialPhone: "987 654 321",
    },
  },
  {
    id: "company-mesa-viva",
    role: "company",
    firstName: "Diego",
    lastName: "Ramos",
    email: "mesa@nexo.demo",
    password: "nexo1234",
    phone: "986 222 410",
    company: {
      id: "mesa-viva",
      name: "Mesa Viva",
      category: "catering",
      location: "Miraflores, Lima",
      coverage: "Lima Metropolitana",
      description: "Catering peruano contemporáneo para celebraciones.",
      commercialPhone: "986 222 410",
    },
  },
];

export function readAccounts(): LocalAccount[] {
  try {
    const custom = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]") as LocalAccount[];
    return [...demoAccounts, ...custom];
  } catch {
    return demoAccounts;
  }
}

export function authenticate(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  return readAccounts().find(
    (account) => account.email.toLowerCase() === normalized && account.password === password,
  );
}

export function emailExists(email: string) {
  const normalized = email.trim().toLowerCase();
  return readAccounts().some((account) => account.email.toLowerCase() === normalized);
}

export function createAccount(account: LocalAccount) {
  const custom = readAccounts().filter(
    (candidate) => !demoAccounts.some((demo) => demo.id === candidate.id),
  );
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...custom, account]));
}

export function saveSession(account: LocalAccount) {
  const value = JSON.stringify({ accountId: account.id });
  // Remove sessions created by earlier prototype versions. Active sessions are
  // tab-scoped so a client and a company can use the demo simultaneously.
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.setItem(SESSION_KEY, value);
}

export function readSession(): LocalAccount | null {
  try {
    const value = sessionStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const { accountId } = JSON.parse(value) as { accountId: string };
    return readAccounts().find((account) => account.id === accountId) ?? null;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function destinationFor(account: LocalAccount) {
  return account.role === "client" ? "/mis-eventos" : `/panel/${account.company?.id ?? ""}`;
}
