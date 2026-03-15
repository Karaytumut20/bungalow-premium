"use client";

import { useTransition } from "react";
import { deleteBungalow, toggleBungalowStatus } from "@/actions/bungalow";
import { Trash2, Power, PowerOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface BungalowActionsProps {
  id: string;
  isActive: boolean;
}

export default function BungalowTableActions({ id, isActive }: BungalowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleStatus = () => {
    startTransition(async () => {
      await toggleBungalowStatus(id, isActive);
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (window.confirm("Bu tesisi silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        await deleteBungalow(id);
        router.refresh();
      });
    }
  };

  return (
    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onClick={handleToggleStatus}
        disabled={isPending}
        className={`p-2 rounded-lg transition ${
          isActive 
            ? 'text-gray-500 hover:text-orange-600 hover:bg-orange-50' 
            : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
        }`}
        title={isActive ? "Pasife Al" : "Aktife Al"}
      >
        {isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
      </button>

      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
        title="Sil"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
