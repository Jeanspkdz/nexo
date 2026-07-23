import { QuoteRequestPage } from "@/features/provider";

export default async function Page({
  params,
}: {
  params: Promise<{ empresaId: string; solicitudId: string }>;
}) {
  const { empresaId, solicitudId } = await params;
  return <QuoteRequestPage providerId={empresaId} requestId={solicitudId} />;
}
