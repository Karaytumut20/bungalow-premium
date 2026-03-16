"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, Plus, Minus } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const DatePickerWithRange = dynamic(
  () => import("@/components/shared/DatePickerWithRange").then((mod) => mod.DatePickerWithRange),
  { ssr: false, loading: () => <div className="h-10 w-full animate-pulse bg-gray-100 rounded-md" /> }
);
import { useBookingStore } from "@/store/useBookingStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const { guests, setGuests, dates } = useBookingStore();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (guests > 1) params.append("guests", guests.toString());
    
    // Dates are handled by the store but we could also pass them in URL if needed
    // if (dates?.from) params.append("checkIn", dates.from.toISOString());
    // if (dates?.to) params.append("checkOut", dates.to.toISOString());

    router.push(`/tesisler?${params.toString()}`);
  };
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-3 px-6 py-3 w-full md:w-auto flex-1 hover:bg-gray-50 rounded-full cursor-pointer transition">
                <Users className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Misafir</span>
                  <span className="text-sm text-gray-900">{guests} Kişi</span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 rounded-2xl" align="center">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">Yetişkin</span>
                  <span className="text-xs text-gray-500">13 yaş ve üzeri</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={guests <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-medium">{guests}</span>
                  <button 
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Arama Butonu */}
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white p-4 px-8 rounded-full flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Ara</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
