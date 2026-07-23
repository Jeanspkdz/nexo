import { RequestPage } from "@/components/prototype-client";
export default async function Page({ params }: { params: Promise<{ servicioId: string }> }) { return <RequestPage serviceId={(await params).servicioId} />; }
