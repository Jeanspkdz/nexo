"use client";

import Link from "next/link";
import { providers, providerServices } from "@/features/marketplace";
import { formatPEN } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";
import { ClientGate } from "./client-gate";
import { backLink, customerPage, flowHeading, primaryLink } from "./customer-styles";

function Service({ serviceId }: { serviceId: string }) {
  const service = providerServices.find((item) => item.id === serviceId);
  if (!service) return <section className={customerPage}>Servicio no encontrado.</section>;
  const provider = providers.find((item) => item.id === service.providerId)!;

  return (
    <section className={customerPage}>
      <header className={flowHeading}>
        <div>
          <Link className={backLink} href={`/proveedores/${service.categoryId}`}>
            Volver a resultados
          </Link>
          <p>{provider.name}</p>
          <h1>{service.name}</h1>
          <span>Consulta lo incluido y pide una propuesta con el contexto de tu evento.</span>
        </div>
        <div className="grid min-w-48 rounded-nexo-surface border border-nexo-line p-4 text-[0.85rem] text-nexo-muted">
          Desde{" "}
          <strong className="mt-[0.3rem] text-[1.35rem] text-nexo-plum-deep">
            {formatPEN(service.startingPrice)}
          </strong>
          <small className="mt-[0.2rem]">{service.priceUnit}</small>
        </div>
      </header>
      <div className="grid grid-cols-[minmax(0,1fr)_18rem] gap-8 max-[680px]:grid-cols-1">
        <div className="min-w-0">
          <section>
            <h2 className="mb-4 text-[1.2rem]">Incluye</h2>
            <ul className="m-0 list-none border-t border-nexo-line p-0">
              {service.included.map((included) => (
                <li
                  className="border-b border-nexo-line py-4 before:mr-[0.7rem] before:font-extrabold before:text-nexo-success before:content-['✓']"
                  key={included}
                >
                  {included}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-8" aria-labelledby="service-provider-video-title">
            <div>
              <div>
                <span className="text-[0.82rem] font-[750] text-nexo-plum">
                  Video de presentación
                </span>
                <h2 className="mt-2 mb-3" id="service-provider-video-title">
                  Conoce a {provider.name}
                </h2>
                <p className="max-w-[65ch] text-nexo-muted">
                  Una muestra del ambiente, la atención y los detalles que forman parte de su
                  propuesta.
                </p>
              </div>
            </div>
            <video
              className="mt-4 aspect-video w-full rounded-nexo-surface object-cover"
              controls
              playsInline
              preload="metadata"
              poster={provider.image}
            >
              <source src="/videos/event_video.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </section>
          <section
            className="mt-8 flex items-start justify-between gap-6 border-t border-nexo-line pt-6 max-[680px]:flex-col"
            aria-labelledby="service-provider-socials-title"
          >
            <div>
              <h2 id="service-provider-socials-title">Redes sociales</h2>
              <p className="text-nexo-muted">
                Conoce más del trabajo y las novedades de {provider.name}.
              </p>
            </div>
            <nav className="flex flex-wrap gap-3" aria-label={`Redes sociales de ${provider.name}`}>
              {[
                ["Instagram", `https://www.instagram.com/nexo.${provider.id}`],
                ["Facebook", `https://www.facebook.com/nexo.${provider.id}`],
                ["TikTok", `https://www.tiktok.com/@nexo.${provider.id}`],
              ].map(([network, href]) => (
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-nexo-control border border-nexo-line px-3 font-[650] text-nexo-plum no-underline hover:border-nexo-plum"
                  key={network}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className="grid size-7 place-items-center rounded-full bg-nexo-surface text-xs"
                    aria-hidden="true"
                  >
                    {network.slice(0, 2)}
                  </span>
                  {network}
                </a>
              ))}
            </nav>
          </section>
        </div>
        <aside className="rounded-nexo-surface border border-nexo-line bg-nexo-surface p-6">
          <h2 className="mb-4 text-[1.2rem]">Antes de solicitar</h2>
          <p className="text-nexo-muted">
            La empresa recibirá los datos de tu evento y podrá responderte con una propuesta
            detallada.
          </p>
          <Link className={cn(primaryLink, "w-full")} href={`/servicios/${service.id}/solicitar`}>
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
