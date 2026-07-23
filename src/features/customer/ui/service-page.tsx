"use client";

import Link from "next/link";
import { providers, providerServices } from "@/features/marketplace";
import { formatPEN } from "@/shared/lib/money";
import { ClientGate } from "./client-gate";

function Service({ serviceId }: { serviceId: string }) {
  const service = providerServices.find((item) => item.id === serviceId);
  if (!service) return <section className="product-page">Servicio no encontrado.</section>;
  const provider = providers.find((item) => item.id === service.providerId)!;

  return (
    <section className="product-page client-service-page">
      <header className="flow-page-heading">
        <div>
          <Link className="back-link" href={`/proveedores/${service.categoryId}`}>
            Volver a resultados
          </Link>
          <p>{provider.name}</p>
          <h1>{service.name}</h1>
          <span>Consulta lo incluido y pide una propuesta con el contexto de tu evento.</span>
        </div>
        <div className="service-price">
          Desde <strong>{formatPEN(service.startingPrice)}</strong>
          <small>{service.priceUnit}</small>
        </div>
      </header>
      <div className="service-detail-grid">
        <div className="service-detail-content">
          <section>
            <h2>Incluye</h2>
            <ul>
              {service.included.map((included) => (
                <li key={included}>{included}</li>
              ))}
            </ul>
          </section>
          <section className="provider-video" aria-labelledby="service-provider-video-title">
            <div className="section-heading">
              <div>
                <span>Video de presentación</span>
                <h2 id="service-provider-video-title">Conoce a {provider.name}</h2>
                <p>
                  Una muestra del ambiente, la atención y los detalles que forman parte de su
                  propuesta.
                </p>
              </div>
            </div>
            <video controls playsInline preload="metadata" poster={provider.image}>
              <source src="/videos/event_video.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </section>
          <section className="provider-socials" aria-labelledby="service-provider-socials-title">
            <div>
              <h2 id="service-provider-socials-title">Redes sociales</h2>
              <p>Conoce más del trabajo y las novedades de {provider.name}.</p>
            </div>
            <nav aria-label={`Redes sociales de ${provider.name}`}>
              {[
                ["Instagram", `https://www.instagram.com/nexo.${provider.id}`],
                ["Facebook", `https://www.facebook.com/nexo.${provider.id}`],
                ["TikTok", `https://www.tiktok.com/@nexo.${provider.id}`],
              ].map(([network, href]) => (
                <a key={network} href={href} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">{network.slice(0, 2)}</span>
                  {network}
                </a>
              ))}
            </nav>
          </section>
        </div>
        <aside>
          <h2>Antes de solicitar</h2>
          <p>
            La empresa recibirá los datos de tu evento y podrá responderte con una propuesta
            detallada.
          </p>
          <Link className="primary" href={`/servicios/${service.id}/solicitar`}>
            Solicitar cotización
          </Link>
        </aside>
      </div>
    </section>
  );
}

export function ServicePage({ serviceId }: { serviceId: string }) {
  return (
    <ClientGate>
      <Service serviceId={serviceId} />
    </ClientGate>
  );
}
