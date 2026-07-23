import { EventPage } from "@/features/customer";
export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  return <EventPage eventId={(await params).eventId} />;
}
