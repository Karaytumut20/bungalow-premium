import Image from "next/image";

export const metadata = {
  title: "Hakkımızda | Premium Bungalov",
  description: "Doğanın kalbinde lüks bungalov deneyimi sunan platformumuz hakkında bilgi edinin.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col bg-white">
      <section className="pt-32 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Hakkımızda</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Doğanın kalbinde, modern lüksü ve huzuru bir araya getiren premium bungalov deneyimi sunuyoruz. Amacımız misafirlerimize unutulmaz anılar yaşatmaktır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] relative">
              <Image 
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Bungalows surrounded by nature" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Doğayla Bütünleşen Konfor</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Şehrin gürültüsünden uzak, ormanın tam kalbinde yer alan tesislerimiz, özenle tasarlanmış mimarisi ve üst düzey hizmet anlayışıyla size evinizin konforunu doğanın huzuruyla birlikte sunar.
              </p>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> 7/24 Kesintisiz Hizmet
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> Sürdürülebilir Turizm 
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> Lüks ve Özgün Tasarım
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
