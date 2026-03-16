import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addDays } from "date-fns";

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
    const dayOfWeek = currentDate.getDay(); // 0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Cuma ve Cumartesi geceleri haftasonu sayılır

    if (isWeekend && weekendPrice) {
      total += weekendPrice;
    } else {
      total += basePrice;
    }
    nights++; // Increment nights for each day
    // Bir sonraki güne geç (Yeni bir Date objesi oluşturarak mutation'dan kaçınıyoruz)
    currentDate = addDays(currentDate, 1);
  }

  if (cleaningFee && nights > 0) {
    total += cleaningFee;
  }

  return { total, nights };
}
