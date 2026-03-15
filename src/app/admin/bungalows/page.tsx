import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Home, CreditCard } from "lucide-react";
import BungalowTableActions from "@/components/admin/BungalowTableActions";

export default async function AdminBungalowsPage() {
  const bungalows = await prisma.bungalow.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      reservations: {
        where: { status: { in: ["APPROVED", "COMPLETED"] } }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tesis Yönetimi</h2>
          <p className="text-gray-500 mt-1">Sistemdeki tüm bungalovları görüntüleyin ve düzenleyin.</p>
        </div>
        <Link 
          href="/admin/bungalows/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition shadow-sm shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" />
          Yeni Tesis Ekle
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Tesis Adı</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Fiyat (Gecelik)</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bungalows.length > 0 ? (
                bungalows.map((bungalow) => (
                  <tr key={bungalow.id} className="hover:bg-gray-50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {bungalow.images.length > 0 ? (
                            <img src={bungalow.images[0]} alt={bungalow.title} className="object-cover w-full h-full" />
                          ) : (
                            <Home className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{bungalow.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate">{bungalow.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {bungalow.category ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {bungalow.category.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Kategorisiz</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">₺{bungalow.basePrice}</span>
                        {bungalow.weekendPrice && (
                          <span className="text-xs text-gray-500">H.Sonu: ₺{bungalow.weekendPrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        bungalow.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {bungalow.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/bungalows/${bungalow.id}/pricing`}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Fiyatları Yönet"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/bungalows/${bungalow.id}/edit`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <BungalowTableActions id={bungalow.id} isActive={bungalow.isActive} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Home className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-1">Henüz tesis eklenmemiş</p>
                      <p className="text-sm mb-6">Sisteme ilk bungalovunuzu ekleyerek başlayın.</p>
                      <Link 
                        href="/admin/bungalows/new" 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-xl font-medium transition"
                      >
                        Tesis Ekle
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
