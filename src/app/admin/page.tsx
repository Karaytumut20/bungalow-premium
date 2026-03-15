import { TrendingUp, Users, Tent, CreditCard } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Genel Bakış</h2>
        <p className="text-gray-500 mt-1">Sisteminizin güncel durumu ve istatistikleri.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-xl text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Aylık Gelir</p>
            <h3 className="text-2xl font-bold text-gray-900">₺124.500</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <Tent className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Aktif Tesis</p>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Bekleyen Rezervasyon</p>
            <h3 className="text-2xl font-bold text-gray-900">8</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Toplam Misafir</p>
            <h3 className="text-2xl font-bold text-gray-900">450+</h3>
          </div>
        </div>
      </div>

      {/* Son Rezervasyonlar Tablosu (Taslak) */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Son Rezervasyonlar</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Tümünü Gör</button>
        </div>
        <div className="p-6 text-center text-gray-500">
          Gerçek veritabanı bağlandığında buraya dinamik tablo gelecek.
        </div>
      </div>
    </div>
  );
}
