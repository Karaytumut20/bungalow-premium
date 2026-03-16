import { prisma } from "@/lib/prisma";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { createAmenity, deleteAmenity } from "@/actions/taxonomy";

export const metadata = {
  title: "Özellik Yönetimi | Admin",
};

export default async function AmenitiesPage() {
  const amenities = await prisma.amenity.findMany({
    include: {
      _count: {
        select: { bungalows: true }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Özellik / İmkan Yönetimi</h2>
          <p className="text-gray-500 mt-1">Tesisleriniz için havuz, jakuzi, şömine gibi özellikleri tanımlayın.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol: Ekleme Formu */}
        <div className="lg:col-span-1 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm h-fit">
            <form action={async (formData) => {
                "use server";
                await createAmenity(formData);
            }} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Özellik Adı</label>
                    <input required name="name" type="text" placeholder="Örn: Özel Isıtmalı Havuz" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:orange-100 focus:border-orange-400 outline-none transition" />
                </div>
                <button type="submit" className="w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95">
                    Oluştur
                </button>
            </form>
        </div>

        {/* Sağ: Özellik Listesi */}
        <div className="lg:col-span-2 border border-gray-100 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Mevcut Özellikler ({amenities.length})</h3>
            </div>
            
            {amenities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 p-6 gap-4 bg-gray-50/50">
                    {amenities.map((amenity) => (
                        <div key={amenity.id} className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition group">
                            <div className="flex items-center gap-3">
                                <div className="text-orange-500">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{amenity.name}</p>
                                    <p className="text-xs text-gray-400 font-medium">{amenity._count.bungalows} Tesis Kullanıyor</p>
                                </div>
                            </div>
                            
                            <form action={async () => {
                                "use server";
                                await deleteAmenity(amenity.id);
                            }}>
                                <button type="submit" className="p-2 text-gray-300 hover:text-red-500 transition-colors" title="Sil">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center text-gray-500">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-900 mb-1">Henüz Özellik Yok</p>
                    <p>Sistemde tesis özelliği tanımlanmamış. Sol taraftaki formu kullanarak özellik ekleyin.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
