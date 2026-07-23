"use client";

import Link from "next/link";
import { providerCategories } from "@/features/marketplace";
import { ClientGate } from "./client-gate";
import { customerPage, flowHeading } from "./customer-styles";

function Providers() {
  return (
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <p>Explorar servicios</p>
          <h1>¿Qué necesitas resolver?</h1>
          <span>Elige una categoría para comparar propuestas adecuadas para tu evento.</span>
        </div>
      </header>
      <ul className="m-0 grid list-none grid-cols-2 gap-3 border-0 p-0 max-[680px]:grid-cols-1">
        {providerCategories
          .filter((category) => category.active)
          .map((category) => (
            <li className="rounded-nexo-surface border border-nexo-line p-0" key={category.id}>
              <Link
                className="flex min-h-[10.5rem] flex-col p-6 text-nexo-plum-deep no-underline hover:bg-nexo-surface"
                href={`/proveedores/${category.id}`}
              >
                <span className="text-[0.82rem] text-nexo-muted">Servicios para eventos</span>
                <strong className="mt-3 text-xl">{category.name}</strong>
                <b className="mt-auto text-[0.9rem] text-nexo-plum">Explorar →</b>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}

export function ProvidersPage() {
  return (
    <ClientGate>
      <Providers />
    </ClientGate>
  );
}
