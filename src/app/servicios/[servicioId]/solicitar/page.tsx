import { RequestPage } from "@/features/customer";
export default async function Page({ params }: { params: Promise<{ servicioId: string }> }) {
  return <RequestPage serviceId={(await params).servicioId} />;
}
