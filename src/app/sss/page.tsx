import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Sıkça Sorulan Sorular | Premium Bungalov",
  description: "Tesislerimiz ve rezervasyon süreci hakkında merak edilenler.",
};

const faqs = [
  {
    question: "Giriş ve çıkış saatleri nelerdir?",
    answer: "Check-in (giriş) saatimiz 14:00, check-out (çıkış) saatimiz ise en geç 11:00'dir."
  },
  {
    question: "Evcil hayvan kabul ediliyor mu?",
    answer: "Önceden bilgi verilmesi şartıyla ve bazı tesislerimizde evcil dostlarınızı memnuniyetle ağırlıyoruz. Tesis sayfalarından 'Evcil Hayvan Kabul Edilir' özelliğini kontrol edebilirsiniz."
  },
  {
    question: "Fiyatlara kahvaltı dahil mi?",
    answer: "Aksi belirtilmedikçe tüm konaklamalarımızda tamamen organik ve yöresel serpme kahvaltımız fiyata dahildir."
  },
  {
    question: "Rezervasyonumu nasıl iptal edebilirim?",
    answer: "Rezervasyondan 7 gün öncesine kadar ücretsiz iptal hakkınız bulunmaktadır. Detaylı bilgi için Kullanım Şartları sayfamızı inceleyebilirsiniz."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 h-24"></div>
      <Navbar />
      
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Sıkça Sorulan Sorular</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Konaklamanız öncesinde aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
