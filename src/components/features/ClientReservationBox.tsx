"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/shared/DatePickerWithRange";
import { calculateTotalPrice } from "@/lib/utils";
import { useBookingStore } from "@/store/useBookingStore";

interface ClientReservationBoxProps {
  bungalowId: string;
  basePrice: number;
  weekendPrice: number | null;
  cleaningFee: number | null;
  bookedDates: { checkIn: Date; checkOut: Date }[];
}

export function ClientReservationBox({
  bungalowId,
  basePrice,
  weekendPrice,
  cleaningFee,
  bookedDates
}: ClientReservationBoxProps) {
  const router = useRouter();
  const { dates } = useBookingStore();
  const [isNavigating, setIsNavigating] = useState(false);

  // Fiyat hesaplama
  let totalData = { total: 0, nights: 0 };
  if (dates?.from && dates?.to) {
    totalData = calculateTotalPrice(dates.from, dates.to, basePrice, weekendPrice, cleaningFee);
  }

  const handleReservation = () => {
    if (!dates?.from || !dates?.to) {
      alert("Lütfen giriş ve çıkış tarihlerini seçin."); // İleride sonner ile ezeceğiz
      return;
    }

    setIsNavigating(true);
    // Checkout sayfasına ID ve güncel state taşınıyor (Zustand üzerinden taşınıyor ama URL'de id kalsın)
    router.push(`/checkout?bungalowId=${bungalowId}`);
  };

  return (
    <div className="sticky top-28 bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50">
      <div className="flex items-end gap-1 mb-6">
        <span className="text-4xl font-extrabold text-gray-900">
          ₺{totalData.total > 0 ? totalData.total.toLocaleString("tr-TR") : basePrice.toLocaleString("tr-TR")}
        </span>
        <span className="text-gray-500 font-medium pb-1.5">
          {totalData.nights > 0 ? `/ ${totalData.nights} gece` : "/ gece"}
        </span>
      </div>

      <div className="space-y-4 mb-8">
        <div className="border border-gray-200 rounded-3xl p-4 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">
            Konaklama Tarihi
          </span>
          <DatePickerWithRange bookedDates={bookedDates} />
        </div>
      </div>

      {totalData.total > 0 && (
        <div className="mb-6 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{totalData.nights} gece konaklama</span>
            <span>₺{(totalData.total - (cleaningFee || 0)).toLocaleString("tr-TR")}</span>
          </div>
          {cleaningFee && cleaningFee > 0 && (
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Temizlik ücreti</span>
              <span>₺{cleaningFee.toLocaleString("tr-TR")}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-gray-900 pt-2 text-base">
            <span>Toplam</span>
            <span>₺{totalData.total.toLocaleString("tr-TR")}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleReservation}
        disabled={isNavigating || !dates?.from || !dates?.to}
        className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-5 rounded-3xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isNavigating ? "Yönlendiriliyor..." : "Rezervasyon Yap"}
      </button>

      <p className="text-center text-xs text-gray-400 mt-6 font-medium">
        Güvenli ödeme ve 24 saat iptal garantisi
      </p>
    </div>
  );
}
