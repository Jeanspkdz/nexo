"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { clearSession } from "@/features/account/infrastructure/browser-account-store";

const nav = [
  ["/mis-eventos", "Eventos", "▣"],
  ["/plan", "Plan", "⌂"],
  ["/proveedores", "Explorar", "⌕"],
  ["/cotizaciones", "Propuestas", "▤"],
  ["/pagos", "Pagos", "▭"],
  ["/mis-eventos", "Cuenta", "◉"],
] as const;

function isCurrent(path: string, href: string, label: string) {
  if (label === "Eventos") return path === "/mis-eventos" || path === "/mis-eventos/nuevo";
  if (label === "Plan") return path === "/plan" || /^\/mis-eventos\/[^/]+$/.test(path);
  if (label === "Explorar") {
    return path.startsWith("/proveedores") || path.startsWith("/servicios");
  }
  if (label === "Propuestas") {
    return path === "/cotizaciones" || /^\/mis-eventos\/[^/]+\/cotizaciones$/.test(path);
  }
  if (label === "Pagos") {
    return path === "/pagos" || /^\/mis-eventos\/[^/]+\/contratos$/.test(path);
  }
  return label !== "Cuenta" && path === href;
}

export function ClientDashboardLayout({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
  accountId: string;
}) {
  const path = usePathname();
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <div className="dashboard-frame">
      <header className="dashboard-header">
        <Link href="/mis-eventos" className="dashboard-wordmark">
          nexo
        </Link>
        <p>
          Mis eventos <b>›</b> Organiza con claridad
        </p>
        <div>
          <button aria-label="Notificaciones">♧</button>
          <button aria-label="Mensajes">◌</button>
          <span className="dashboard-avatar">{name.slice(0, 2).toUpperCase()}</span>
          <strong>{name}</strong>
          <button className="dashboard-logout" type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <aside className="dashboard-sidebar" aria-label="Navegación del cliente">
        {nav.map(([href, label, icon]) => (
          <Link
            key={label}
            href={href}
            className={isCurrent(path, href, label) ? "current" : ""}
            aria-label={label}
            aria-current={isCurrent(path, href, label) ? "page" : undefined}
          >
            <i aria-hidden="true">{icon}</i>
            <span>{label}</span>
          </Link>
        ))}
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
