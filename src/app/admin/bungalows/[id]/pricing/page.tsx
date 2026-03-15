import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function BungalowPricingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const bungalow = await prisma.bungalow.findUnique({
    where: { id: id }
  });

  if (!bungalow) {
    notFound();
  }

  async function updatePricing(formData: FormData) {
    "use server";
    
    const basePrice = parseInt(formData.get("basePrice") as string);
    const weekendPriceRaw = formData.get("weekendPrice") as string;
    const cleaningFeeRaw = formData.get("cleaningFee") as string;
    
    const weekendPrice = weekendPriceRaw ? parseInt(weekendPriceRaw) : null;
    const cleaningFee = cleaningFeeRaw ? parseInt(cleaningFeeRaw) : null;

    await prisma.bungalow.update({
      where: { id },
      data: {
        basePrice,
        weekendPrice,
        cleaningFee
      }
    });

    revalidatePath("/admin/bungalows");
    revalidatePath(`/bungalov/${id}`);
    redirect("/admin/bungalows");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/bungalows" 
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Fiyatlandırma Yönetimi</h2>
          <p className="text-gray-500 mt-1"><span className="font-semibold text-gray-900">{bungalow.title}</span> için fiyat kurallarını belirleyin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form action={updatePricing} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="basePrice" className="block text-sm font-semibold text-gray-900">
              Temel Gecelik Fiyat (₺) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="basePrice" 
              name="basePrice"
              required 
              defaultValue={bungalow.basePrice}
              min="1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
            />
            <p className="text-xs text-gray-500">Hafta içi standart gecelik konaklama bedeli.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="weekendPrice" className="block text-sm font-semibold text-gray-900">
              Hafta Sonu Fiyatı (₺) <span className="text-gray-400 font-normal">(Opsiyonel)</span>
            </label>
            <input 
              type="number" 
              id="weekendPrice" 
              name="weekendPrice"
              defaultValue={bungalow.weekendPrice || ""}
              min="1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
            />
            <p className="text-xs text-gray-500">Cuma ve Cumartesi günleri için geçerli olacak özel fiyat. Boş bırakırsanız temel fiyat uygulanır.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="cleaningFee" className="block text-sm font-semibold text-gray-900">
              Temizlik Ücreti (₺) <span className="text-gray-400 font-normal">(Opsiyonel)</span>
            </label>
            <input 
              type="number" 
              id="cleaningFee" 
              name="cleaningFee"
              defaultValue={bungalow.cleaningFee || ""}
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" 
            />
            <p className="text-xs text-gray-500">Rezervasyon başına bir kez alınacak sabit temizlik bedeli.</p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Fiyatları Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
