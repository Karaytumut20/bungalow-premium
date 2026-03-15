import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, Users, ChevronLeft } from "lucide-react";
import { DatePickerWithRange } from "@/components/shared/DatePickerWithRange";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BungalowDetail({ params }: { params: Promise<{ id: string }> }) {
  // YENİ STANDART: params artık bir Promise, bu yüzden await etmemiz şart.
  const { id } = await params;

  const bungalow = await prisma.bungalow.findUnique({
    where: { id: id }
  });

  if (!bungalow) {
    notFound();
  }

  const defaultImages = [
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const displayImages = [...bungalow.images, ...defaultImages].slice(0, 5);

  return (
    <main className="min-h-screen bg-white pb-24 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{bungalow.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-900 font-bold">5.0</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span className="underline">{bungalow.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-gray-900">
              <Users className="w-5 h-5" />
              <span>Maks. {bungalow.guests} Misafir</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[50vh] min-h-[400px] mb-12 rounded-3xl overflow-hidden shadow-sm">
          <div className="md:col-span-2 md:row-span-2 relative h-full w-full cursor-pointer group">
            <Image src={displayImages[0]} alt={bungalow.title} fill className="object-cover group-hover:scale-105 transition duration-700" />
          </div>
          {displayImages.slice(1, 5).map((img, idx) => (
            <div key={idx} className="hidden md:block relative h-full w-full cursor-pointer group bg-gray-100">
              <Image src={img} alt={`Görsel ${idx + 2}`} fill className="object-cover group-hover:scale-105 transition duration-700" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Tesis Hakkında</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">{bungalow.description}</p>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Sunulan İmkanlar</h2>
              <div className="grid grid-cols-2 gap-4">
                {bungalow.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-700 font-medium transition-colors hover:bg-white hover:shadow-md">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 relative">
            <div className="sticky top-28 bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50">
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">₺{bungalow.price}</span>
                <span className="text-gray-500 font-medium pb-1.5">/ gece</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-3xl p-4 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Konaklama Tarihi</span>
                  <DatePickerWithRange />
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-5 rounded-3xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-gray-900/10">
                Rezervasyon Yap
              </button>

              <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                Güvenli ödeme ve 24 saat iptal garantisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
