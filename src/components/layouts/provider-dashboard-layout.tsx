"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { clearSession } from "@/lib/auth-storage";
const nav = [
  ["/resumen", "Resumen", "▦"],
  ["/solicitudes", "Solicitudes", "▤"],
  ["/cotizaciones", "Propuestas", "▧"],
  ["/servicios", "Servicios", "▣"],
  ["/contratos", "Cobros", "▭"],
  ["/perfil", "Perfil", "◉"],
] as const;
export function ProviderDashboardLayout({
  companyId,
  companyName,
  children,
}: {
  companyId: string;
  companyName: string;
  children: ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <div className="dashboard-frame company-dashboard">
      <header className="dashboard-header">
        <Link href={`/panel/${companyId}`} className="dashboard-wordmark">
          nexo
        </Link>
        <p>
          Empresa <b>›</b> {companyName}
        </p>
        <div>
          <button aria-label="Notificaciones">♧</button>
          <span className="dashboard-avatar">{companyName.slice(0, 2).toUpperCase()}</span>
          <strong>{companyName}</strong>
          <button className="dashboard-logout" type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <aside className="dashboard-sidebar" aria-label="Navegación de empresa">
        {nav.map(([suffix, label, icon]) => {
          const href = `/panel/${companyId}${suffix}`;
          const current = path === href || (label === "Resumen" && path === `/panel/${companyId}`);
          return (
            <Link
              key={label}
              href={href}
              className={current ? "current" : ""}
              aria-current={current ? "page" : undefined}
              aria-label={label}
            >
              <i aria-hidden="true">{icon}</i>
              <span>{label}</span>
            </Link>
          );
        })}
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
