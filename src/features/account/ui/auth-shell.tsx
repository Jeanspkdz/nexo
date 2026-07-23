import type { ReactNode } from "react";
import { AuthHeader } from "./auth-header";

export function AuthShell({
  children,
  action,
}: {
  children: ReactNode;
  action: "login" | "register";
}) {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto] bg-nexo-white">
      <AuthHeader action={action} />
      <main className="mx-auto w-[min(1120px,calc(100%_-_3rem))] py-[clamp(3rem,7vw,6rem)] max-[760px]:w-[min(calc(100%_-_2rem),1120px)] max-[760px]:py-10">
        {children}
      </main>
      <footer className="flex justify-between gap-4 border-t border-nexo-line px-[max(1.5rem,calc((100vw_-_1120px)/2))] py-6 text-[0.8rem] text-nexo-muted max-[760px]:flex-col">
        <span>Prototipo local de Nexo</span>
        <span>Las cuentas y sesiones se guardan únicamente en este navegador.</span>
      </footer>
    </div>
  );
}
