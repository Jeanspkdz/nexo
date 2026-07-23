import { EventContractsPage } from "@/features/customer";
export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  return <EventContractsPage eventId={(await params).eventId} />;
}
