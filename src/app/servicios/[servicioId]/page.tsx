import { ServicePage } from "@/components/prototype-client";
export default async function Page({ params }: { params: Promise<{ servicioId: string }> }) { return <ServicePage serviceId={(await params).servicioId} />; }
