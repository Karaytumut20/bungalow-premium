"use client";

import { useTransition } from "react";
import { Save } from "lucide-react";

export default function SettingsFormClient({ settings, action }: { settings: any, action: (formData: FormData) => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", settings.id);

    startTransition(async () => {
      await action(formData);
      alert("Site ayarları başarıyla güncellendi.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Hero Section Ayarları */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Ana Sayfa Karşılama Ekranı (Hero)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Ana Başlık</label>
            <input 
              type="text" 
              name="heroTitle" 
              defaultValue={settings.heroTitle}
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Alt Başlık (Açıklama)</label>
            <textarea 
              name="heroSubtitle" 
              defaultValue={settings.heroSubtitle}
              required 
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" 
            />
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">İletişim ve Adres</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">E-Posta Adresi</label>
            <input 
              type="email" 
              name="contactEmail" 
              defaultValue={settings.contactEmail}
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Telefon Numarası</label>
            <input 
              type="text" 
              name="contactPhone" 
              defaultValue={settings.contactPhone}
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Açık Adres</label>
            <textarea 
              name="contactAddress" 
              defaultValue={settings.contactAddress}
              required 
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" 
            />
          </div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Sosyal Medya Linkleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Instagram</label>
            <input 
              type="url" 
              name="instagramUrl" 
              defaultValue={settings.instagramUrl || ""}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Facebook</label>
            <input 
              type="url" 
              name="facebookUrl" 
              defaultValue={settings.facebookUrl || ""}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Twitter (X)</label>
            <input 
              type="url" 
              name="twitterUrl" 
              defaultValue={settings.twitterUrl || ""}
              placeholder="https://twitter.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {isPending ? "Kaydediliyor..." : "Ayarları Kaydet"}
        </button>
      </div>

    </form>
  );
}
