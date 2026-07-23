"use client";

import Link from "next/link";
import { providerCategories, providers, providerServices } from "@/features/marketplace";
import { formatPEN } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";
import { ClientGate } from "./client-gate";
import { backLink, customerPage, flowHeading, secondaryLink } from "./customer-styles";

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
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <Link className={backLink} href="/proveedores">
            Todas las categorías
          </Link>
          <p>Servicios disponibles</p>
          <h1>{category?.name ?? "Categoría"}</h1>
          <span>Compara alternativas según lo incluido y el precio de partida.</span>
        </div>
      </header>
      <div className="grid gap-4">
        {services.map((service) => {
          const provider = providers.find((item) => item.id === service.providerId)!;
          return (
            <article
              className="rounded-nexo-surface border border-nexo-line bg-white p-6"
              key={service.id}
            >
              <header className="flex items-start justify-between gap-6 max-[680px]:flex-col max-[680px]:items-stretch">
                <div>
                  {provider.sponsored && (
                    <em className="text-[0.8rem] font-[750] not-italic text-nexo-plum">
                      Patrocinado
                    </em>
                  )}
                  <h2 className="my-[0.45rem] text-xl">{service.name}</h2>
                  <p className="m-0 text-nexo-muted">{provider.name}</p>
                </div>
                <strong className="grid justify-items-end text-[1.1rem] max-[680px]:justify-items-start">
                  Desde {formatPEN(service.startingPrice)}
                  <small className="mt-1 text-[0.78rem] font-medium text-nexo-muted">
                    {service.priceUnit}
                  </small>
                </strong>
              </header>
              <footer className="mt-6 flex items-center justify-between gap-6 border-t border-nexo-line pt-4 text-[0.9rem] text-nexo-muted max-[680px]:flex-col max-[680px]:items-stretch">
                <span>{service.included.slice(0, 2).join(" · ")}</span>
                <Link
                  className={cn(secondaryLink, "max-[680px]:w-full")}
                  href={`/servicios/${service.id}`}
                >
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
