import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/shared/ui";

export function AuthShell({
  children,
  action,
}: {
  children: ReactNode;
  action: "login" | "register";
}) {
  return (
    <div className="auth-shell">
      <SiteHeader
        className="auth-header"
        navigation={<Link href="/">Conoce Nexo</Link>}
        actions={
          action === "register" ? (
            <Link className="secondary auth-header-action" href="/registro">
              Crear cuenta
            </Link>
          ) : (
            <Link className="secondary auth-header-action" href="/login">
              Iniciar sesión
            </Link>
          )
        }
      />
      <main className="auth-main">{children}</main>
      <footer className="auth-footer">
        <span>Prototipo local de Nexo</span>
        <span>Las cuentas y sesiones se guardan únicamente en este navegador.</span>
      </footer>
    </div>
  );
}
