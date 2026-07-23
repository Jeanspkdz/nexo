"use client";

import { providers } from "@/features/marketplace";
import { ProviderFrame, ProviderGate } from "./provider-page-shell";

function Profile({ providerId }: { providerId: string }) {
  const provider = providers.find((item) => item.id === providerId);

  return (
    <ProviderFrame providerId={providerId} active="summary">
      <div className="provider-flow-title">
        <div>
          <p className="provider-flow-kicker">Perfil público</p>
          <h1>{provider?.name ?? "Tu empresa"}</h1>
          <p>{provider?.description ?? "Completa la información pública de tu empresa."}</p>
        </div>
      </div>
      <dl className="provider-profile-facts">
        <div>
          <dt>Ubicación</dt>
          <dd>{provider?.location ?? "Por definir"}</dd>
        </div>
        <div>
          <dt>Cobertura</dt>
          <dd>{provider?.coverage ?? "Por definir"}</dd>
        </div>
        <div>
          <dt>Valoración</dt>
          <dd>
            {provider ? `${provider.rating} · ${provider.reviewCount} reseñas` : "Sin valoraciones"}
          </dd>
        </div>
      </dl>
    </ProviderFrame>
  );
}

export function ProviderProfile({ providerId }: { providerId: string }) {
  return (
    <ProviderGate providerId={providerId}>
      <Profile providerId={providerId} />
    </ProviderGate>
  );
}
