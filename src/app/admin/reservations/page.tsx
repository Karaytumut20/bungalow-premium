import { prisma } from "@/lib/prisma";
import ReservationsCalendarClient from "@/components/admin/ReservationsCalendarClient";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      bungalow: {
        select: { title: true }
      }
    }
  });

  return (
    <div className="space-y-8 h-full min-h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Rezervasyon Takvimi</h2>
        <p className="text-gray-500 mt-1">Tüm tesislerdeki doluluk oranlarını ve rezervasyonları izleyin.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex-1 h-[700px]">
        <ReservationsCalendarClient initialReservations={reservations} />
      </div>
    </div>
  );
}
