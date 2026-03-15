import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              BUNGALOV<span className="text-blue-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-sm">
              Doğanın kalbinde, lüks ve konforu bir araya getiren premium konaklama deneyimleri sunuyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link></li>
              <li><Link href="/tesisler" className="hover:text-white transition">Tesislerimiz</Link></li>
              <li><Link href="/sss" className="hover:text-white transition">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><Instagram className="w-6 h-6" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><Facebook className="w-6 h-6" /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bungalov Premium. Tüm hakları saklıdır.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/gizlilik" className="hover:text-white transition">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:text-white transition">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
