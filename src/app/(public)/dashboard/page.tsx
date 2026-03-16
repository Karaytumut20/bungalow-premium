import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { User, LogOut, Calendar, Settings } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Profilim | Premium Bungalov",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Admin kullanıcılar dashboard'a girerse direkt admin paneline atabiliriz veya burada özel bir mesaj gösterebiliriz
  if ((session.user as any)?.role === "ADMIN") {
    redirect("/admin");
  }

  // Normal kullanıcılar için (Eğer rezervasyon sistemi kurulduysa)
  // const reservations = await prisma.reservation.findMany({ where: { userId: session.user.id } })

  return (
    <main className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hoş Geldiniz, {session.user?.name || "Kullanıcı"}</h1>
                <p className="text-gray-500 mt-1">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Rezervasyonlarım</h3>
                <p className="text-gray-500 text-sm mb-4">Mevcut ve geçmiş rezervasyonlarınızı görüntüleyin.</p>
                <div className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                  Yakında Eklenecek
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-gray-600 mb-4 shadow-sm">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hesap Ayarları</h3>
                <p className="text-gray-500 text-sm mb-4">Kişisel bilgilerinizi ve şifrenizi güncelleyin.</p>
                <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg inline-block">
                  Yakında Eklenecek
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
