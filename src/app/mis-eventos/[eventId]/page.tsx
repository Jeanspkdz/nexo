import { EventPage } from "@/components/prototype-client";
export default async function Page({ params }: { params: Promise<{ eventId: string }> }) { return <EventPage eventId={(await params).eventId} />; }
