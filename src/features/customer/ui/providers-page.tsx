"use client";

import Link from "next/link";
import { providerCategories } from "@/features/marketplace";
import { ClientGate } from "./client-gate";

function Providers() {
  return (
    <section className="product-page client-providers-page">
      <header className="flow-page-heading">
        <div>
          <p>Explorar servicios</p>
          <h1>¿Qué necesitas resolver?</h1>
          <span>Elige una categoría para comparar propuestas adecuadas para tu evento.</span>
        </div>
      </header>
      <ul className="category-directory">
        {providerCategories
          .filter((category) => category.active)
          .map((category) => (
            <li key={category.id}>
              <Link href={`/proveedores/${category.id}`}>
                <span>Servicios para eventos</span>
                <strong>{category.name}</strong>
                <b>Explorar →</b>
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
