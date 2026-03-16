import { prisma } from "@/lib/prisma";
import AddBungalowClient from "@/components/admin/AddBungalowClient";

export const metadata = {
  title: "Yeni Tesis Ekle | Admin",
};

export default async function NewBungalowPage() {
  const [categories, amenities] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.amenity.findMany({ orderBy: { name: 'asc' } })
  ]);

  return <AddBungalowClient categories={categories} amenities={amenities} />;
}
