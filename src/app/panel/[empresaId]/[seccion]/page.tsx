import { notFound } from "next/navigation";
import {
  ProviderContracts,
  ProviderProfile,
  ProviderQuotes,
  ProviderRequests,
  ProviderServices,
  ProviderSummary,
} from "@/components/prototype-provider";
export default async function Page({
  params,
}: {
  params: Promise<{ empresaId: string; seccion: string }>;
}) {
  const { empresaId, seccion } = await params;
  if (seccion === "resumen") return <ProviderSummary providerId={empresaId} />;
  if (seccion === "solicitudes") return <ProviderRequests providerId={empresaId} />;
  if (seccion === "cotizaciones") return <ProviderQuotes providerId={empresaId} />;
  if (seccion === "servicios") return <ProviderServices providerId={empresaId} />;
  if (seccion === "contratos") return <ProviderContracts providerId={empresaId} />;
  if (seccion === "perfil") return <ProviderProfile providerId={empresaId} />;
  notFound();
}
