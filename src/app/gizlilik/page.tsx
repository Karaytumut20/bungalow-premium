import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "Gizlilik Politikası | Premium Bungalov",
  description: "Kişisel verilerinizin korunması ve gizliliğiniz hakkındaki politikamız.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-900 h-24"></div>
      <Navbar />
      
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Gizlilik Politikası</h1>
          
          <div className="prose prose-lg prose-blue text-gray-600 max-w-none space-y-6">
            <p>
              Premium Bungalov olarak, kullanıcılarımızın kişisel verilerinin korunması ve gizliliğinin sağlanması önceliğimizdir. Bu aydınlatma metni, Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Toplanan Veriler</h2>
            <p>
              Web sitemize kayıt olurken veya rezervasyon yaparken isim, e-posta, telefon numarası gibi temel iletişim bilgilerinizi bizimle paylaşırsınız. Ödeme işlemleri güvenli üçüncü parti ödeme kuruluşları (örn. Iyzico) üzerinden gerçekleşir ve kredi kartı bilgileriniz tarafımızca saklanmaz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Verilerin Kullanılma Amacı</h2>
            <p>
              Toplanan veriler sadece; rezervasyonunuzun tamamlanması, tarafınıza konaklama hakkında bilgi verilmesi, fatura kesilmesi ve talep ettiğiniz durumlarda kampanyalarımızdan haberdar edilmeniz amacıyla kullanılır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Çerez (Cookie) Kullanımı</h2>
            <p>
              Web sitemizin düzgün çalışması, oturum yönetimi ve deneyiminizin iyileştirilmesi amacıyla çerezler kullanıyoruz. Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Veri Güvenliği ve Haklarınız</h2>
            <p>
              Verileriniz üst düzey güvenlik önlemleriyle saklanmaktadır. KVKK madde 11 uyarınca hakkınızdaki verileri öğrenme, değiştirme ve silinmesini talep etme hakkına sahipsiniz. Bunun için <strong>info@bungalow.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
