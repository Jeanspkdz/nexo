import { EventQuotesPage } from "@/components/prototype-client";
export default async function Page({ params }: { params: Promise<{ eventId: string }> }) { return <EventQuotesPage eventId={(await params).eventId} />; }
