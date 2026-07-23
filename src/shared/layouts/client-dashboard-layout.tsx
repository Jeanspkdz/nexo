"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { clearSession } from "@/features/account/infrastructure/browser-account-store";
import { cn } from "@/shared/lib/cn";

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
    <div className="grid min-h-svh grid-cols-[7rem_minmax(0,1fr)] grid-rows-[4.25rem_1fr] bg-nexo-white max-[760px]:grid-cols-1 max-[760px]:grid-rows-[4rem_auto_1fr]">
      <header className="col-span-full grid grid-cols-[7rem_1fr_auto] items-center border-b border-nexo-line bg-nexo-white max-[760px]:col-span-1 max-[760px]:grid-cols-[5rem_1fr_auto]">
        <Link
          href="/mis-eventos"
          className="grid h-full place-items-center font-nexo-sans text-[1.55rem] leading-none font-bold tracking-[-0.06em] text-nexo-plum no-underline"
        >
          nexo
        </Link>
        <p className="m-0 text-[0.9rem] text-nexo-muted max-[760px]:hidden">
          Mis eventos <b className="px-[0.6rem] text-nexo-plum">›</b> Organiza con claridad
        </p>
        <div className="flex items-center gap-3 pr-4">
          <button
            className="size-11 border-0 bg-transparent text-[1.2rem] text-nexo-plum"
            aria-label="Notificaciones"
          >
            ♧
          </button>
          <button
            className="size-11 border-0 bg-transparent text-[1.2rem] text-nexo-plum"
            aria-label="Mensajes"
          >
            ◌
          </button>
          <span className="grid size-9 place-items-center rounded-full bg-nexo-plum text-xs font-bold text-white">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <strong className="max-w-40 overflow-hidden text-[0.85rem] text-ellipsis whitespace-nowrap max-[760px]:hidden">
            {name}
          </strong>
          <button
            className="min-h-11 w-auto min-w-max rounded-nexo-control border border-nexo-line bg-transparent px-3 text-[0.82rem] font-[650] text-nexo-plum hover:border-nexo-plum hover:bg-nexo-surface focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-nexo-coral"
            type="button"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      <aside
        className="row-start-2 grid content-start gap-2 border-r border-nexo-line bg-nexo-white px-2 py-4 max-[760px]:col-start-1 max-[760px]:row-start-2 max-[760px]:grid-flow-col max-[760px]:grid-cols-[repeat(6,minmax(4rem,1fr))] max-[760px]:overflow-x-auto max-[760px]:border-r-0 max-[760px]:border-b max-[760px]:p-2"
        aria-label="Navegación del cliente"
      >
        {nav.map(([href, label, icon]) => {
          const current = isCurrent(path, href, label);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "relative grid min-h-[4.7rem] content-center justify-items-center gap-[0.28rem] rounded-nexo-control text-center text-[0.72rem] font-[650] text-nexo-muted no-underline hover:bg-nexo-surface hover:text-nexo-plum max-[760px]:min-h-14",
                current && "bg-nexo-surface text-nexo-plum",
              )}
              aria-label={label}
              aria-current={current ? "page" : undefined}
            >
              <i className="text-[1.35rem] leading-none not-italic" aria-hidden="true">
                {icon}
              </i>
              <span className="max-[760px]:hidden">{label}</span>
            </Link>
          );
        })}
      </aside>
      <main className="min-w-0 bg-nexo-white max-[760px]:row-start-3">{children}</main>
    </div>
  );
}
