import { prisma } from "@/lib/prisma";
import { Plus, Trash2, Tag } from "lucide-react";
import { createCategory, deleteCategory } from "@/actions/taxonomy";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kategori Yönetimi | Admin",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
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
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Kategori Yönetimi</h2>
          <p className="text-gray-500 mt-1">Tesisleriniz için dinamik kategoriler oluşturun ve yönetin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol: Ekleme Formu */}
        <div className="lg:col-span-1 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                   <Plus className="w-5 h-5" />
                </div>
                Kategori Ekle
            </h3>
            
            <form action={createCategory} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Kategori Adı</label>
                    <input required name="name" type="text" placeholder="Örn: Balayı Evleri" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Kısa Açıklama <span className="text-gray-400 font-normal">(Opsiyonel)</span></label>
                    <textarea name="description" rows={3} placeholder="Kategori için kısa bir açıklama..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95">
                    Oluştur
                </button>
            </form>
        </div>

        {/* Sağ: Kategori Listesi */}
        <div className="lg:col-span-2 border border-gray-100 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Mevcut Kategoriler ({categories.length})</h3>
            </div>
            
            {categories.length > 0 ? (
                <div className="divide-y divide-gray-100">
                    {categories.map((category) => (
                        <div key={category.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between hover:bg-gray-50/50 transition pr-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-100 p-3 rounded-xl text-gray-500 mt-1">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{category.name}</h4>
                                    <p className="text-sm text-gray-500 mb-2">{category.description || "Açıklama girilmemiş"}</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {category._count.bungalows} Tesis
                                    </span>
                                </div>
                            </div>
                            
                            <form action={async () => {
                                "use server";
                                await deleteCategory(category.id);
                            }}>
                                <button type="submit" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group" title="Sil">
                                    <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center text-gray-500">
                    <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-900 mb-1">Henüz Kategori Yok</p>
                    <p>Sistemde henüz bir kategori tanımlanmamış. Sol taraftaki formu kullanarak ilk kategorinizi oluşturabilirsiniz.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
