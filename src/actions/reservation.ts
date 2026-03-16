"use server";

import { prisma } from "@/lib/prisma";

export async function getBookedDates(bungalowId: string) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        bungalowId,
        status: {
          in: ["APPROVED", "PENDING"] // Dolu sayılan durumlar
        }
      },
      select: {
        checkIn: true,
        checkOut: true
      }
    });

    return { success: true, reservations };
  } catch (error) {
    console.error("Dolu tarihler çekilirken hata:", error);
    return { success: false, error: "Tarihler alınamadı." };
  }
}

export async function createReservation(data: {
  bungalowId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}) {
  try {
    const reservation = await prisma.reservation.create({
      data: {
        bungalowId: data.bungalowId,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        notes: data.notes,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        totalPrice: data.totalPrice,
        status: "PENDING",
        paymentStatus: "PENDING",
      }
    });

    return { success: true, id: reservation.id };
  } catch (error) {
    console.error("Rezervasyon yaratılırken hata:", error);
    return { success: false, error: "Rezervasyon oluşturulamadı. Lütfen tekrar deneyin." };
  }
}
