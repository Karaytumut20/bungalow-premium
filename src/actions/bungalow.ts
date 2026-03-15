"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBungalow(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const basePrice = parseInt(formData.get("price") as string);
    const guests = parseInt(formData.get("guests") as string);
    const description = formData.get("description") as string;

    // Formdan gelen JSON formatındaki görsel linklerini parse ediyoruz
    const imagesRaw = formData.get("images") as string;
    const images = imagesRaw ? JSON.parse(imagesRaw) : [];

    // Şimdilik standart özellikler
    const features = ["Özel Havuz", "Jakuzi", "Şömine", "Doğa Manzarası"];

    await prisma.bungalow.create({
      data: {
        title,
        location,
        basePrice, // Updated to basePrice
        guests,
        description,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
        // Basic implementation for features mapping to amenities
        amenities: {
          connectOrCreate: features.map(f => ({
            where: { name: f },
            create: { name: f }
          }))
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Bungalov eklenirken hata:", error);
    return { success: false, error: "Eklenemedi" };
  }
}

export async function updateBungalow(formData: FormData) {
  try {
    const bungalowId = formData.get("bungalowId") as string;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const basePrice = parseInt(formData.get("price") as string);
    const guests = parseInt(formData.get("guests") as string);
    const description = formData.get("description") as string;

    const imagesRaw = formData.get("images") as string;
    const images = imagesRaw ? JSON.parse(imagesRaw) : [];

    await prisma.bungalow.update({
      where: { id: bungalowId },
      data: {
        title,
        location,
        basePrice,
        guests,
        description,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      }
    });

    revalidatePath("/admin/bungalows");
    revalidatePath(`/bungalov/${bungalowId}`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Bungalov güncellenirken hata:", error);
    return { success: false, error: "Güncellenemedi" };
  }
}

export async function toggleBungalowStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.bungalow.update({
      where: { id },
      data: { isActive: !currentStatus }
    });

    revalidatePath("/admin/bungalows");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Durum güncellenirken hata:", error);
    return { success: false, error: "Durum güncellenemedi" };
  }
}

export async function deleteBungalow(id: string) {
  try {
    await prisma.bungalow.delete({
      where: { id }
    });

    revalidatePath("/admin/bungalows");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Tesis silinirken hata:", error);
    return { success: false, error: "Tesis silinemedi" };
  }
}
