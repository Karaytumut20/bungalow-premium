import { TrendingUp, Users, Tent, CreditCard, CalendarX2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { ReservationStatus, PaymentStatus } from "@prisma/client";

export default async function AdminDashboard() {
  // Veritabanı istatistiklerini çekiyoruz
  const [totalBungalows, upcomingReservations, totalUsers, recentReservations] = await Promise.all([
    prisma.bungalow.count(),
    prisma.reservation.count({ where: { status: { in: [ReservationStatus.PENDING, ReservationStatus.APPROVED] } } }),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.reservation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        bungalow: { select: { title: true } }
      }
    })
  ]);

  // Gelir hesabı (Basit: COMPLETED ve APPROVED olanlar)
  const revenueData = await prisma.reservation.aggregate({
    where: { 
      status: { in: [ReservationStatus.COMPLETED, ReservationStatus.APPROVED] },
      paymentStatus: PaymentStatus.PAID
    },
    _sum: { totalPrice: true }
  });

  const totalRevenue = revenueData._sum.totalPrice || 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Genel Bakış</h2>
        <p className="text-gray-500 mt-1">Sisteminizin güncel durumu ve istatistikleri.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-green-100 p-4 rounded-xl text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Toplam Başarılı Gelir</p>
            <h3 className="text-2xl font-bold text-gray-900">₺{totalRevenue.toLocaleString("tr-TR")}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <Tent className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Kayıtlı Tesis</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalBungalows}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
            <CalendarX2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Aktif Rezervasyon</p>
            <h3 className="text-2xl font-bold text-gray-900">{upcomingReservations}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Toplam Misafir</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalUsers}</h3>
          </div>
        </div>
      </div>

      {/* Grafikler Alanı (Client Component) */}
      <DashboardCharts />

      {/* Son Rezervasyonlar Tablosu */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Son Rezervasyonlar</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">Misafir</th>
                <th className="px-6 py-4">Tesis</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Tutar</th>
                <th className="px-6 py-4 rounded-tr-2xl">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentReservations.length > 0 ? (
                recentReservations.map((res: any) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{res.guestName}</td>
                    <td className="px-6 py-4">{res.bungalow.title}</td>
                    <td className="px-6 py-4">
                      {res.checkIn.toLocaleDateString("tr-TR")} - {res.checkOut.toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 font-semibold">₺{res.totalPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        res.status === ReservationStatus.APPROVED ? 'bg-green-100 text-green-700' :
                        res.status === ReservationStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {res.status === ReservationStatus.COMPLETED ? 'Tamamlandı' : 
                         res.status === ReservationStatus.APPROVED ? 'Onaylandı' : 
                         res.status === ReservationStatus.PENDING ? 'Bekliyor' : 'İptal'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Henüz rezervasyon bulunmuyor.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
