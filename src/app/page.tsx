import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/features/Hero";
import PopularBungalows from "@/components/features/PopularBungalows";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <Hero />
      <PopularBungalows />
      {/* İlerleyen adımlarda buraya;
        - Neden Biz? (Özellikler bölümü)
        - Müşteri Yorumları
        - Bülten Aboneliği (Newsletter)
        eklenebilir.
      */}
      <Footer />
    </main>
  );
}
