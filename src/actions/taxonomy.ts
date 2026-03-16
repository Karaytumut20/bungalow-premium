"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: FormData) {
  try {
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await prisma.category.create({
      data: { name, slug, description }
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Kategori eklenirken hata:", error);
    return { success: false, error: "Eklenemedi" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Kategori silinirken hata:", error);
    return { success: false, error: "Silinemedi" };
  }
}

export async function createAmenity(data: FormData) {
  try {
    const name = data.get("name") as string;
    const icon = data.get("icon") as string;

    await prisma.amenity.create({
      data: { name, icon }
    });

    revalidatePath("/admin/amenities");
    return { success: true };
  } catch (error) {
    console.error("Özellik eklenirken hata:", error);
    return { success: false, error: "Eklenemedi" };
  }
}

export async function deleteAmenity(id: string) {
  try {
    await prisma.amenity.delete({ where: { id } });
    revalidatePath("/admin/amenities");
    return { success: true };
  } catch (error) {
    console.error("Özellik silinirken hata:", error);
    return { success: false, error: "Silinemedi" };
  }
}
