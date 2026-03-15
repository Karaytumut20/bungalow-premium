import { prisma } from "@/lib/prisma";
import SettingsFormClient from "@/components/admin/SettingsFormClient";
import { revalidatePath } from "next/cache";

export default async function AdminSettingsPage() {
  // En az 1 settings kaydı olduğundan emin oluyoruz veya ilk bulduğu kaydı alıyoruz
  let settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        heroTitle: "Lüks Bungalov Deneyimi",
        heroSubtitle: "Doğayla iç içe, unutulmaz bir tatil sizi bekliyor.",
        contactEmail: "info@bungalow.com",
        contactPhone: "+90 555 123 4567",
        contactAddress: "Örnek Mah. Orman Sok. No:1 Kartepe/Kocaeli",
        privacyText: "<p>Gizlilik politikamız...</p>",
        termsText: "<p>Kullanım koşulları...</p>"
      }
    });
  }

  async function updateSettings(formData: FormData) {
    "use server";
    
    // Güvenlik için ID üzerinden güncelliyoruz
    const settingsId = formData.get("id") as string;
    
    await prisma.siteSettings.update({
      where: { id: settingsId },
      data: {
        heroTitle: formData.get("heroTitle") as string,
        heroSubtitle: formData.get("heroSubtitle") as string,
        contactEmail: formData.get("contactEmail") as string,
        contactPhone: formData.get("contactPhone") as string,
        contactAddress: formData.get("contactAddress") as string,
        instagramUrl: formData.get("instagramUrl") as string,
        facebookUrl: formData.get("facebookUrl") as string,
        twitterUrl: formData.get("twitterUrl") as string,
      }
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
  }

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Site Ayarları</h2>
        <p className="text-gray-500 mt-1">Müşteri arayüzünde (Frontend) görünen dinamik metinleri ve iletişim bilgilerini yönetin.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <SettingsFormClient settings={settings} action={updateSettings} />
      </div>
    </div>
  );
}
