import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditBungalowClient from "@/components/admin/EditBungalowClient";

export default async function EditBungalowServerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const bungalow = await prisma.bungalow.findUnique({
    where: { id: id },
    include: { amenities: true }
  });

  if (!bungalow) {
    notFound();
  }

  return <EditBungalowClient bungalow={bungalow} params={params} />;
}
