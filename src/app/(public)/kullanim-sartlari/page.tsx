

export const metadata = {
  title: "Kullanım Şartları | Premium Bungalov",
  description: "Web sitesi ve tesislerimizin genel kullanım kuralları ve şartları.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-col bg-white">
      <section className="pt-32 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Kullanım Şartları</h1>
          
          <div className="prose prose-lg prose-blue text-gray-600 max-w-none space-y-6">
            <p>
              Premium Bungalov platformuna hoş geldiniz. Web sitemizi kullanarak ve rezervasyon yaparak aşağıdaki şartları kabul etmiş olursunuz. Lütfen rezervasyon işlemlerinizden önce dikkatlice okuyunuz.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Rezervasyon ve Ödeme</h2>
            <p>
              Web sitemiz üzerinden yapılan rezervasyonların kesinleşmesi için belirlenen kaporanın veya toplam tutarın ödenmesi gereklidir. Ödeme yapılmayan rezervasyonlar sistem tarafından otomatik iptal edilecektir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. İptal ve İade Koşulları</h2>
            <p>
              Giriş tarihine 7 gün veya daha fazla süre kala yapılan iptallerde ödenen tutarın tamamı iade edilir. Giriş tarihine 7 günden daha az bir süre kaldığında yapılan iptallerde kapora iadesi yapılmamaktadır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Tesis Kuralları</h2>
            <p>
              - Giriş (Check-in) saatimiz 14:00, Çıkış (Check-out) saatimiz en geç 11:00&apos;dir.<br />
              - Tesis içinde doğaya ve çevreye zarar verecek etkinliklerde bulunmak kesinlikle yasaktır.<br />
              - Gürültü ve yüksek sesle müzik yayını, diğer misafirlerin huzurunu bozmamak adına gece 23:00&apos;dan sonra yasaktır.<br />
              - Evcil hayvan kabulü sadece belirtilen özel bungalovlarda, önceden haber verilmesi koşuluyla yapılmaktadır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Sorumluluk Reddi</h2>
            <p>
              Konaklama süresince misafirlerin kişisel eşyalarının kaybı veya tesis sınırları içindeki dikkatsizlik kaynaklı olası kazalardan Premium Bungalov sorumlu tutulamaz.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
