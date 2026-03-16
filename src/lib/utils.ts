import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotalPrice(
  checkIn: Date,
  checkOut: Date,
  basePrice: number,
  weekendPrice: number | null,
  cleaningFee: number | null
): { total: number, nights: number } {
  let total = 0;
  let nights = 0;

  let currentDate = new Date(checkIn);
  // checkOut gecesi konaklanmadığı için < checkOut kullanıyoruz
  while (currentDate < checkOut) {
    const dayOfWeek = currentDate.getDay();
    // 0 = Pazar, 6 = Cumartesi (Hafta sonu kabul ediyoruz)
    if (weekendPrice && (dayOfWeek === 0 || dayOfWeek === 6)) {
       total += weekendPrice;
    } else {
       total += basePrice;
    }
    nights++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (cleaningFee && nights > 0) {
    total += cleaningFee;
  }

  return { total, nights };
}
