"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteCloudinaryImage(url: string) {
  try {
    if (!url) return { success: false, error: "URL is required" };

    // Cloudinary URL'den public_id kısmını çıkartma
    // Örnek: https://res.cloudinary.com/.../upload/v1234/bungalow_preset/filename.jpg -> bungalow_preset/filename
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return { success: false, error: "Invalid Cloudinary URL" };

    // v12353456 gibi olan version kısmını atla (upload/v.../klasor/resim)
    const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/"); 
    const publicId = publicIdWithExtension.split(".")[0];

    if (!publicId) return { success: false, error: "Public ID not found" };

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return { success: true };
    } else {
      console.warn("Cloudinary silme uyarısı:", result);
      return { success: false, error: "Resim silinemedi", details: result };
    }
  } catch (error) {
    console.error("Cloudinary silme hatası:", error);
    return { success: false, error: "Sunucu hatası" };
  }
}
