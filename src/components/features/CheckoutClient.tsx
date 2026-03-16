"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { calculateTotalPrice } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createReservation } from "@/actions/reservation";

interface CheckoutClientProps {
  bungalow: {
    id: string;
    title: string;
    basePrice: number;
    weekendPrice: number | null;
    cleaningFee: number | null;
  }
}

export function CheckoutClient({ bungalow }: CheckoutClientProps) {
  const router = useRouter();
  const { dates } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand state boşsa (kullanıcı direkt linkle gelmişse vs.) geri yolla
  if (!dates?.from || !dates?.to) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center">
        <p className="text-red-500 font-medium mb-4">Tarih seçimleriniz kaybolmuş. Lütfen tesis sayfasına dönüp tekrar tarih seçin.</p>
        <button onClick={() => router.push(`/bungalov/${bungalow.id}`)} className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl transition">Geri Dön</button>
      </div>
    );
  }

  const { total } = calculateTotalPrice(
    dates.from,
    dates.to,
    bungalow.basePrice,
    bungalow.weekendPrice,
    bungalow.cleaningFee
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const data = {
      bungalowId: bungalow.id,
      guestName: formData.get("guestName") as string,
      guestEmail: formData.get("guestEmail") as string,
      guestPhone: formData.get("guestPhone") as string,
      notes: formData.get("notes") as string,
      checkIn: dates!.from!,
      checkOut: dates!.to!,
      totalPrice: total
    };

    const result = await createReservation(data);

    if (result.success) {
      // Başarılı sayfasına (veya profile) yönlendirilebilir, şimdilik ana sayfaya atalım
      // İleride Sonner Toast ile "Başarılı" denecek
      router.push(`/?success=1`); 
    } else {
      setError(result.error || "Rezervasyon oluşturulurken bir hata oluştu.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
      <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
         <div>
            <h2 className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Seçili Tarihler</h2>
            <p className="font-bold text-gray-900 text-lg">
                {format(dates.from, "dd MMMM yyyy", { locale: tr })} - {format(dates.to, "dd MMMM yyyy", { locale: tr })}
            </p>
         </div>
         <div className="text-right">
            <h2 className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Toplam Tutar</h2>
            <p className="font-bold text-blue-600 text-2xl">₺{total.toLocaleString("tr-TR")}</p>
         </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
            {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Ad Soyad</label>
                <input required name="guestName" type="text" placeholder="Örn: Ahmet Yılmaz" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Telefon Numarası</label>
                <input required name="guestPhone" type="tel" placeholder="Örn: 0555 555 5555" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">E-Posta Adresi</label>
            <input required name="guestEmail" type="email" placeholder="Sipariş detayı için gereklidir" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Özel İstekler / Notlar <span className="text-gray-400 font-normal">(Opsiyonel)</span></label>
            <textarea name="notes" rows={4} placeholder="Tesise iletmek istediğiniz özel bir durum varsa belirtebilirsiniz..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition resize-none"></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "İşleniyor..." : "Rezervasyonu Onayla ve Ödeme Adımına Geç"}
        </button>
        <p className="text-center text-xs text-gray-400 font-medium">
            Ödeme altyapısı Test modundadır. Veritabanına statüsü PENDING olarak kayıt edilecektir.
        </p>
      </form>
    </div>
  );
}
