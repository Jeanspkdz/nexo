import { ServicePage } from "@/features/customer";
export default async function Page({ params }: { params: Promise<{ servicioId: string }> }) {
  return <ServicePage serviceId={(await params).servicioId} />;
}
