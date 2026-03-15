"use client";

import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { DatePickerWithRange } from "@/components/shared/DatePickerWithRange";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Premium Bungalov"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
        >
          Doğanın Kalbinde, <br className="hidden md:block" />
          <span className="text-white/90 font-light">Lüksün Zirvesinde</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12"
        >
          Özel havuzlu, jakuzili premium bungalovlarda sıradanlıktan uzak, unutulmaz bir deneyim yaşayın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-2 relative z-20"
        >
          {/* Lokasyon */}
          <div className="flex items-center gap-3 px-6 py-3 w-full md:w-auto flex-1 hover:bg-gray-50 rounded-full cursor-pointer transition">
            <MapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col items-start w-full">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Lokasyon</span>
              <input
                type="text"
                placeholder="Nereye gitmek istersin?"
                className="w-full text-sm text-gray-600 bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Dinamik Tarih Seçici */}
          <div className="flex items-center gap-3 px-6 py-3 w-full md:w-auto flex-[1.2] hover:bg-gray-50 rounded-full cursor-pointer transition">
            <Calendar className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col items-start w-full overflow-hidden">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-0.5">Tarihler</span>
              <DatePickerWithRange />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {/* Misafir */}
          <div className="flex items-center gap-3 px-6 py-3 w-full md:w-auto flex-1 hover:bg-gray-50 rounded-full cursor-pointer transition">
            <Users className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col items-start w-full">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Misafir</span>
              <span className="text-sm text-gray-400">Kişi Ekle</span>
            </div>
          </div>

          {/* Arama Butonu */}
          <button className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white p-4 px-8 rounded-full flex items-center justify-center gap-2 transition-colors duration-300">
            <Search className="w-5 h-5" />
            <span className="font-medium">Ara</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
