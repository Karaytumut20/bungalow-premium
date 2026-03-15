"use client";

import { Save, ImagePlus, X, ChevronLeft, GripVertical } from "lucide-react";
import { useTransition, useState, useEffect } from "react";
import { updateBungalow } from "@/actions/bungalow";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
function SortableImage({ id, url, onRemove }: { id: string, url: string, onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-32 rounded-xl border border-gray-200 group bg-gray-50 flex overflow-hidden">
      <div 
        {...attributes} 
        {...listeners} 
        className="w-10 bg-gray-100/80 border-r border-gray-200 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-200 transition-colors z-10"
      >
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      <div className="relative flex-1">
        <Image src={url} alt="Bungalow Image" fill className="object-cover" />
      </div>
      <button 
        type="button" 
        onClick={(e) => { e.stopPropagation(); onRemove(); }} 
        className="absolute top-2 right-2 bg-white/90 shadow-sm text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-500 hover:text-white"
        title="Görseli Sil"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export default function EditBungalowPage({ params, bungalow }: { params: any, bungalow: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // DnD requires unique string IDs for items, so we map urls to objects {id, url}
  const [items, setItems] = useState<{id: string, url: string}[]>(() => {
    if (bungalow?.images) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return bungalow.images.map((url: string, index: number) => ({
        id: `img-${index}-${Date.now()}`,
        url
      }));
    }
    return [];
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px hareket ettirmeden drag'ı başlatma ki tıklamalarla çakışmasın
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeImage = (idToRemove: string) => {
    setItems(items.filter((item) => item.id !== idToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Extract ordered URLs
    const orderedUrls = items.map(item => item.url);
    formData.append("images", JSON.stringify(orderedUrls));
    formData.append("bungalowId", bungalow.id);

    startTransition(async () => {
      const result = await updateBungalow(formData);
      if (result.success) {
        alert("Tesis başarıyla güncellendi!");
        router.push("/admin/bungalows");
        router.refresh();
      } else {
        alert("Bir hata oluştu.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/bungalows" 
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tesisi Düzenle</h2>
          <p className="text-gray-500 mt-1">{bungalow.title} özelliklerini ve görsellerini güncelleyin.</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">Temel Bilgiler</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tesis Başlığı</label>
              <input type="text" name="title" defaultValue={bungalow.title} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Lokasyon</label>
              <input type="text" name="location" defaultValue={bungalow.location} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Temel Gecelik Fiyat (₺)</label>
              <input type="number" name="price" defaultValue={bungalow.basePrice} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Maksimum Misafir</label>
              <input type="number" name="guests" defaultValue={bungalow.guests} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Detaylı Açıklama</label>
            <textarea name="description" defaultValue={bungalow.description} required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"></textarea>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
             <h3 className="text-xl font-semibold text-gray-900">Görselleri Yönet</h3>
             <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
               <GripVertical className="w-3 h-3" /> Sürükleyerek sıralayın
             </span>
          </div>

          {items.length > 0 && (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={items.map(i => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {items.map((item) => (
                    <SortableImage 
                      key={item.id} 
                      id={item.id} 
                      url={item.url} 
                      onRemove={() => removeImage(item.id)} 
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "bungalow_preset"}
            onSuccess={(result: { info?: { secure_url: string } | string }) => {
              if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                const newUrl = (result.info as { secure_url: string }).secure_url;
                setItems(prev => [...prev, { id: `new-${Date.now()}`, url: newUrl }]);
              }
            }}
          >
            {({ open }) => {
              return (
                <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:bg-gray-50 transition flex flex-col items-center justify-center group">
                  <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
                  <p className="text-gray-900 font-bold">Yeni Görsel Yükle</p>
                  <p className="text-sm text-gray-500 mt-2">Sıralamayı belirlemek için yükledikten sonra sürükleyin</p>
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isPending} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/20 disabled:opacity-70">
            <Save className="w-5 h-5" />
            {isPending ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
