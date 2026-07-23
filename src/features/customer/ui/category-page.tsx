"use client";

import Link from "next/link";
import { providerCategories, providers, providerServices } from "@/features/marketplace";
import { formatPEN } from "@/shared/lib/money";
import { ClientGate } from "./client-gate";

function Category({ categoryId }: { categoryId: string }) {
  const category = providerCategories.find((item) => item.id === categoryId);
  const services = providerServices
    .filter((service) => service.categoryId === categoryId)
    .sort(
      (a, b) =>
        Number(Boolean(providers.find((provider) => provider.id === b.providerId)?.sponsored)) -
        Number(Boolean(providers.find((provider) => provider.id === a.providerId)?.sponsored)),
    );

  return (
    <section className="product-page client-category-page">
      <header className="flow-page-heading">
        <div>
          <Link className="back-link" href="/proveedores">
            Todas las categorías
          </Link>
          <p>Servicios disponibles</p>
          <h1>{category?.name ?? "Categoría"}</h1>
          <span>Compara alternativas según lo incluido y el precio de partida.</span>
        </div>
      </header>
      <div className="service-results">
        {services.map((service) => {
          const provider = providers.find((item) => item.id === service.providerId)!;
          return (
            <article key={service.id}>
              <header>
                <div>
                  {provider.sponsored && <em>Patrocinado</em>}
                  <h2>{service.name}</h2>
                  <p>{provider.name}</p>
                </div>
                <strong>
                  Desde {formatPEN(service.startingPrice)}
                  <small>{service.priceUnit}</small>
                </strong>
              </header>
              <footer>
                <span>{service.included.slice(0, 2).join(" · ")}</span>
                <Link className="secondary" href={`/servicios/${service.id}`}>
                  Ver servicio
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CategoryPage({ categoryId }: { categoryId: string }) {
  return (
    <ClientGate>
      <Category categoryId={categoryId} />
    </ClientGate>
  );
}
