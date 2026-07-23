"use client";

import { providerCategories, providerServices } from "@/features/marketplace";
import { formatCurrencyPEN } from "@/shared/lib/money";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function Services({ providerId }: { providerId: string }) {
  const services = providerServices.filter((service) => service.providerId === providerId);
  const unitLabel = { person: "persona", hour: "hora", fixed: "servicio" } as const;

  return (
    <ProviderFrame providerId={providerId} active="services">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Catálogo vigente</p>
          <h1>Servicios</h1>
          <p>Consulta las ofertas publicadas por tu empresa y su precio mínimo contratable.</p>
        </div>
        <span className="provider-count">
          {services.length} servicio{services.length === 1 ? "" : "s"}
        </span>
      </div>
      {services.length ? (
        <div className="provider-service-list">
          {services.map((service) => (
            <article key={service.id}>
              <header>
                <div>
                  <span className="status-chip">
                    {
                      providerCategories.find((category) => category.id === service.categoryId)
                        ?.name
                    }
                  </span>
                  <h2>{service.name}</h2>
                </div>
                <strong>
                  {formatCurrencyPEN(service.currentUnitPrice * service.minimumQuantity)}
                </strong>
              </header>
              <dl>
                <div>
                  <dt>Precio vigente</dt>
                  <dd>
                    {formatCurrencyPEN(service.currentUnitPrice)} por {unitLabel[service.unit]}
                  </dd>
                </div>
                <div>
                  <dt>Cantidad mínima</dt>
                  <dd>
                    {service.minimumQuantity} {unitLabel[service.unit]}
                    {service.minimumQuantity === 1 ? "" : "s"}
                  </dd>
                </div>
                <div>
                  <dt>Unidad</dt>
                  <dd>{service.unit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>Aún no hay servicios publicados</h2>
          <p>Los servicios de esta empresa aparecerán aquí cuando formen parte del catálogo.</p>
        </section>
      )}
    </ProviderFrame>
  );
}

export function ProviderServices({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Services providerId={providerId} />
    </ProviderGate>
  );
}
