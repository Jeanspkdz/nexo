import Link from "next/link";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export function AuthHeader({ action }: { action: "login" | "register" }) {
  return (
    <header className="sticky top-0 z-20 flex min-h-[4.75rem] items-center gap-12 border-b border-nexo-line bg-[rgba(250,250,250,0.97)] px-[max(1.5rem,calc((100vw_-_1240px)/2))] max-[720px]:min-h-18 max-[720px]:px-5">
      <Link
        className="shrink-0 font-nexo-serif text-[2rem] leading-none font-normal tracking-[-0.035em] text-nexo-plum no-underline"
        href="/"
        aria-label="Nexo, ir al inicio"
      >
        Nexo
      </Link>
      <nav className="flex items-center gap-8 max-[760px]:hidden" aria-label="Navegación principal">
        <Link
          className="inline-flex min-h-11 items-center font-semibold text-nexo-muted no-underline"
          href="/"
        >
          Conoce Nexo
        </Link>
      </nav>
      <div className="ml-auto flex min-h-12 items-center gap-6">
        <Link
          className={cn(buttonVariants({ variant: "secondary", size: "compact" }), "no-underline")}
          href={action === "register" ? "/registro" : "/login"}
        >
          {action === "register" ? "Crear cuenta" : "Iniciar sesión"}
        </Link>
      </div>
    </header>
  );
}
