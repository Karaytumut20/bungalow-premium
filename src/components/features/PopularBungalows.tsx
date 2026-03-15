import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function PopularBungalows() {
  // Veritabanından en yeni 6 tesisi çekiyoruz
  const bungalows = await prisma.bungalow.findMany({
    take: 6,
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              En Çok Tercih Edilenler
            </h2>
            <p className="text-gray-500 text-lg">
              Misafirlerimizin favorisi olan, unutulmaz anılar biriktirebileceğiniz öne çıkan tesislerimizi keşfedin.
            </p>
          </div>
        </div>

        {bungalows.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">Henüz hiç tesis eklenmemiş.</h3>
            <p className="text-gray-500 mt-2">Admin panelinden ilk tesisinizi ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bungalows.map((bungalow) => (
              <div key={bungalow.id} className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  {/* Array'deki ilk görseli göster */}
                  <Image
                    src={bungalow.images[0] || "https://images.unsplash.com/photo-1587061949409-02df41d5e562"}
                    alt={bungalow.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">5.0</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{bungalow.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1">{bungalow.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {bungalow.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-lg border border-gray-100 font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Gecelik</span>
                      <span className="text-2xl font-bold text-gray-900">₺{bungalow.price}</span>
                    </div>
                    <Link href={`/bungalov/${bungalow.id}`} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
