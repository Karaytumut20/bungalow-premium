import Hero from "@/components/features/Hero";
import PopularBungalows from "@/components/features/PopularBungalows";

export const revalidate = 60; // 60 seconds ISR

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <PopularBungalows />
      {/* İlerleyen adımlarda buraya;
        - Neden Biz? (Özellikler bölümü)
        - Müşteri Yorumları
        - Bülten Aboneliği (Newsletter)
        eklenebilir.
      */}
    </main>
  );
}
