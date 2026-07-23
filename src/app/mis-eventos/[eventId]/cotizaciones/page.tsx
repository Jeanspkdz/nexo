import { EventQuotesPage } from "@/features/customer";
export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  return <EventQuotesPage eventId={(await params).eventId} />;
}
