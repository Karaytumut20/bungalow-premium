import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BedDouble, Users, MapPin } from "lucide-react";

export const metadata = {
  title: "Tesislerimiz | Premium Bungalov",
  description: "Doğanın kalbinde lüks ve konforu birleştiren bungalov seçeneklerimizi inceleyin.",
};

export default async function BungalowsCatalogPage() {
  // Veritabanından sadece aktif bungalovları getir
  const bungalows = await prisma.bungalow.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      amenities: true,
      category: true
    }
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 h-24"></div>
      <Navbar />
      
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Tesislerimiz</h1>
              <p className="text-xl text-gray-600">Her zevke ve ihtiyaca uygun, doğayla iç içe premium konaklama seçenekleri.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bungalows.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500">
                Şu anda listelenecek tesis bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.
              </div>
            ) : (
              bungalows.map((bungalow) => (
                <Link key={bungalow.id} href={`/bungalov/${bungalow.id}`} className="group block h-full">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full">
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={bungalow.images[0] || "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3"} 
                        alt={bungalow.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl font-bold text-gray-900 shadow-sm">
                        ₺{bungalow.basePrice} <span className="text-sm font-normal text-gray-500">/gece</span>
                      </div>
                      {bungalow.category && (
                        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-white">
                          {bungalow.category.name}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                        <MapPin className="w-4 h-4" />
                        {bungalow.location}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {bungalow.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">
                        {bungalow.description}
                      </p>
                      
                      <div className="h-px bg-gray-100 w-full mb-6"></div>
                      
                      <div className="flex items-center justify-between text-gray-600 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span>{bungalow.guests} Yetişkin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-5 h-5 text-gray-400" />
                          <span>Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
