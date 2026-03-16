// src/app/(public)/checkout/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/features/CheckoutClient";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  searchParams: Promise<{ bungalowId?: string }>;
}

export const metadata = {
  title: "Güvenli Ödeme | Premium Bungalov",
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  // Promise olarak çöz (Next.js 15)
  const params = await searchParams;
  
  if (!params.bungalowId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-2xl font-bold">Hatalı Yönlendirme</h1>
        <p className="text-gray-500">Lütfen önce tarih seçip bir tesisten rezervasyon başlatın.</p>
        <Link href="/" className="px-6 py-2 bg-gray-900 text-white rounded-xl mt-4">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const bungalow = await prisma.bungalow.findUnique({
    where: { id: params.bungalowId },
    select: {
      id: true,
      title: true,
      location: true,
      images: true,
      basePrice: true,
      weekendPrice: true,
      cleaningFee: true
    }
  });

  if (!bungalow) {
    notFound();
  }

  return (
    <main className="flex flex-col bg-gray-50 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 w-full">
        <Link href={`/bungalov/${bungalow.id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition group font-medium">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Tesise Geri Dön
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Rezervasyon İşlemini Tamamla</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sol Kısım: Form ve Detaylar */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutClient bungalow={{
              id: bungalow.id,
              title: bungalow.title,
              basePrice: bungalow.basePrice,
              weekendPrice: bungalow.weekendPrice,
              cleaningFee: bungalow.cleaningFee
            }} />
          </div>

          {/* Sağ Kısım: Özet Kutusu */}
          <div className="lg:col-span-1 border border-gray-200 bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 sticky top-28">
             <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
                <Image 
                  src={bungalow.images[0] || "https://images.unsplash.com/photo-1587061949409-02df41d5e562"} 
                  alt={bungalow.title} 
                  fill
                  unoptimized={(bungalow.images[0] || "").toLowerCase().includes('.gif')}
                  className="object-cover"
                />
             </div>
             <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{bungalow.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{bungalow.location}</p>
             </div>
             
             <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4">
                Lütfen formda bilgilerinizi eksiksiz doldurun. Fiyat hesaplaması seçtiğiniz tarihlere göre otomatik yapılacaktır.
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
