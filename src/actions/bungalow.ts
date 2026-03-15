"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBungalow(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const price = parseInt(formData.get("price") as string);
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
        price,
        guests,
        description,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
        features
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
