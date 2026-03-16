"use client";

import { Save, ImagePlus, X } from "lucide-react";
import { useTransition, useState } from "react";
import { createBungalow } from "@/actions/bungalow";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export default function AddBungalowClient({ categories, amenities }: { categories: any[], amenities: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Görselleri ve özellikleri JSON string olarak forma ekle
    formData.append("images", JSON.stringify(imageUrls));
    formData.append("amenities", JSON.stringify(selectedAmenities));

    startTransition(async () => {
      const result = await createBungalow(formData);
      if (result.success) {
        alert("Tesis başarıyla eklendi ve ana sayfada yayına alındı!");
        router.push("/admin");
        router.refresh();
      } else {
        alert("Bir hata oluştu.");
      }
    });
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(prev => prev.filter(a => a !== id));
    } else {
      setSelectedAmenities(prev => [...prev, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Yeni Tesis Ekle</h2>
        <p className="text-gray-500 mt-1">Sisteme yeni bir bungalov veya villa kaydedin.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">Temel Bilgiler</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tesis Başlığı</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Lokasyon</label>
              <input type="text" name="location" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gecelik Fiyat (₺)</label>
              <input type="number" name="price" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Maksimum Misafir</label>
              <input type="number" name="guests" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select name="categoryId" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white" required>
                <option value="">Kategori Seçin</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hafta Sonu Gecelik Fiyatı (₺)</label>
              <input type="number" name="weekendPrice" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Opsiyonel" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Temizlik Ücreti (₺)</label>
              <input type="number" name="cleaningFee" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Opsiyonel" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Detaylı Açıklama</label>
            <textarea name="description" required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"></textarea>
          </div>
        </div>

        {/* Özellikler (Amenities) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">Tesis Özellikleri</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map(amenity => (
              <label key={amenity.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input 
                  type="checkbox" 
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={() => toggleAmenity(amenity.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
              </label>
            ))}
          </div>
          {amenities.length === 0 && <p className="text-sm text-gray-500">Henüz hiç özellik tanımlanmamış. Admin panelinden ekleyebilirsiniz.</p>}
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">Görseller</h3>

          {/* Yüklenen Görsellerin Önizlemesi */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative h-32 rounded-xl overflow-hidden border border-gray-200 group">
                  <Image src={url} alt="Uploaded" fill className="object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Cloudinary Widget Butonu */}
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "bungalow_preset"}
            onSuccess={(result: { info?: { secure_url: string } | string }) => {
              if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                setImageUrls((prev) => [...prev, (result.info as { secure_url: string }).secure_url]);
              }
            }}
          >
            {({ open }) => {
              return (
                <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:bg-gray-50 transition flex flex-col items-center justify-center">
                  <ImagePlus className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="text-gray-900 font-bold">Yeni Görsel Yükle</p>
                  <p className="text-sm text-gray-500 mt-2">Cloudinary güvencesiyle sınırsız depolama</p>
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={isPending} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg disabled:opacity-70">
            <Save className="w-5 h-5" />
            {isPending ? "Kaydediliyor..." : "Tesisi Kaydet ve Yayınla"}
          </button>
        </div>
      </form>
    </div>
  );
}
