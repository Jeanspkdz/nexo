import Link from "next/link";
import { AuthShell } from "./auth-shell";

export function AccountChoicePage() {
  return (
    <AuthShell action="login">
      <section className="mx-auto w-full max-w-[920px]">
        <div className="mb-10 max-w-[680px]">
          <span className="text-[0.85rem] font-bold text-nexo-plum">Crear una cuenta</span>
          <h1 className="my-3 mb-4 font-nexo-serif text-[3.2rem] leading-[1.03] font-normal tracking-[-0.035em] text-nexo-plum text-balance max-[760px]:text-[2.5rem]">
            ¿Cómo usarás Nexo?
          </h1>
          <p className="max-w-[60ch] text-nexo-muted">
            Elige el recorrido que corresponde a lo que quieres hacer. No podrás cambiar el rol
            desde el panel.
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 max-[760px]:grid-cols-1">
          <Link
            className="flex min-h-72 flex-col gap-6 rounded-nexo-surface border border-nexo-line p-8 text-nexo-plum-deep no-underline hover:border-nexo-plum hover:bg-nexo-surface focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-nexo-coral max-[760px]:p-5"
            href="/registro/cliente"
          >
            <span className="grid size-12 place-items-center rounded-full bg-nexo-surface font-[750] text-nexo-plum">
              C
            </span>
            <div>
              <h2 className="mb-2">Organizar mis eventos</h2>
              <p className="text-nexo-muted">
                Explora empresas, solicita cotizaciones y administra contratos separados.
              </p>
            </div>
            <strong className="mt-auto text-nexo-plum">Crear cuenta de cliente →</strong>
          </Link>
          <Link
            className="flex min-h-72 flex-col gap-6 rounded-nexo-surface border border-nexo-line p-8 text-nexo-plum-deep no-underline hover:border-nexo-plum hover:bg-nexo-surface focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-nexo-coral max-[760px]:p-5"
            href="/registro/empresa"
          >
            <span className="grid size-12 place-items-center rounded-full bg-nexo-plum font-[750] text-white">
              E
            </span>
            <div>
              <h2 className="mb-2">Ofrecer servicios</h2>
              <p className="text-nexo-muted">
                Publica servicios, responde solicitudes y prepara cotizaciones detalladas.
              </p>
            </div>
            <strong className="mt-auto text-nexo-plum">Crear cuenta de empresa →</strong>
          </Link>
        </div>
      </section>
    </AuthShell>
  );
}
