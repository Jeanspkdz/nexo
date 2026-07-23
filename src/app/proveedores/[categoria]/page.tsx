import { CategoryPage } from "@/components/prototype-client";
export default async function Page({ params }: { params: Promise<{ categoria: string }> }) { return <CategoryPage categoryId={(await params).categoria} />; }
