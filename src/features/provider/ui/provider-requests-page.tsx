"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { providerServices, type QuotationRequest } from "@/features/marketplace";
import { transactionStore } from "@/features/transactions";
import { shortId } from "@/shared/lib/ids";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function Requests({ providerId }: { providerId: string }) {
  const [requests, setRequests] = useState<QuotationRequest[]>([]);

  useEffect(() => setRequests(transactionStore.requests(providerId)), [providerId]);

  const pending = requests.filter((request) => request.status === "pending").length;

  return (
    <ProviderFrame providerId={providerId} active="requests">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Bandeja de entrada</p>
          <h1>Solicitudes</h1>
          <p>Revisa el contexto antes de preparar una propuesta clara y completa.</p>
        </div>
        <span className="provider-count">
          {pending} pendiente{pending === 1 ? "" : "s"}
        </span>
      </div>
      {requests.length ? (
        <div className="provider-request-list">
          {requests.map((request) => {
            const event = transactionStore.event(request.userEventId);
            const services = providerServices.filter((service) =>
              request.providerServiceIds.includes(service.id),
            );
            return (
              <article key={request.id} className="provider-request-row">
                <div className="provider-request-status">
                  <span
                    className={request.status === "quoted" ? "status-chip success" : "status-chip"}
                  >
                    {request.status === "quoted" ? "Propuesta enviada" : "Requiere cotización"}
                  </span>
                  <small>Solicitud #{shortId(request.id)}</small>
                </div>
                <div>
                  <h2>{event?.name ?? "Evento sin nombre"}</h2>
                  <p>
                    {event
                      ? `${event.type} · ${event.date} · ${event.guestCount} invitados`
                      : "El contexto del evento no está disponible."}
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Ubicación</dt>
                    <dd>{event?.location ?? "Por confirmar"}</dd>
                  </div>
                  <div>
                    <dt>Servicios</dt>
                    <dd>{services.map((service) => service.name).join(", ") || "Sin servicios"}</dd>
                  </div>
                </dl>
                <Link
                  className={request.status === "pending" ? "primary" : "secondary"}
                  href={`/panel/${providerId}/solicitudes/${request.id}${request.status === "pending" ? "/cotizar" : ""}`}
                >
                  {request.status === "pending" ? "Preparar propuesta" : "Ver solicitud"}
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="provider-empty">
          <h2>Aún no hay solicitudes</h2>
          <p>
            Las solicitudes de clientes aparecerán aquí con el evento, los servicios y la siguiente
            acción requerida.
          </p>
        </section>
      )}
    </ProviderFrame>
  );
}

export function ProviderRequests({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Requests providerId={providerId} />
    </ProviderGate>
  );
}
