import Link from "next/link";
import { LayoutDashboard, Tent, CalendarDays, Settings, LogOut, Users, FolderTree, Tags } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wider">
            ADMIN<span className="text-blue-500">PANEL</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/bungalows" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Tent className="w-5 h-5" />
            <span className="font-medium">Tesisler</span>
          </Link>
          <Link href="/admin/reservations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">Rezervasyonlar</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <FolderTree className="w-5 h-5" />
            <span className="font-medium">Kategoriler</span>
          </Link>
          <Link href="/admin/amenities" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Tags className="w-5 h-5" />
            <span className="font-medium">Özellikler / İmkanlar</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Kullanıcılar</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Site Ayarları</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
