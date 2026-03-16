import { Mail, Phone, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "İletişim | Premium Bungalov",
  description: "Bize ulaşın ve kusursuz tatilinizi planlamaya hemen başlayın.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <section className="pt-32 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">İletişim</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Rezervasyonunuzu planlamadan önce aklınıza takılan tüm sorular için bize ulaşabilirsiniz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* İletişim Bilgileri */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Telefon</h3>
                  <p className="text-gray-600 mt-1">+90 555 123 4567</p>
                  <p className="text-sm text-gray-500 mt-1">Hafta içi 09:00 - 18:00 arası</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">E-Posta</h3>
                  <p className="text-gray-600 mt-1">info@bungalow.com</p>
                  <p className="text-sm text-gray-500 mt-1">7/24 destek talebi oluşturabilirsiniz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Adres</h3>
                  <p className="text-gray-600 mt-1">Örnek Mah. Orman Sok. No:1 Kartepe/Kocaeli</p>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <form className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-900">Adınız Soyadınız</label>
                  <input type="text" className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Ahmet Yılmaz" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900">E-Posta Adresiniz</label>
                  <input type="email" className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="ahmet@example.com" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900">Mesajınız</label>
                  <textarea rows={4} className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                </div>
                <button type="button" className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-bold transition">
                  <Send className="w-5 h-5" /> Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
