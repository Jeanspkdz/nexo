import { ProviderSummary } from "@/features/provider";
export default async function Page({ params }: { params: Promise<{ empresaId: string }> }) {
  return <ProviderSummary providerId={(await params).empresaId} />;
}
