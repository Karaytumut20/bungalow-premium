import { create } from 'zustand';

interface BookingState {
  dates: { from: Date | undefined; to: Date | undefined };
  guests: number;
  setDates: (dates: { from: Date | undefined; to: Date | undefined }) => void;
  setGuests: (guests: number) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  dates: { from: undefined, to: undefined },
  guests: 1,
  setDates: (dates) => set({ dates }),
  setGuests: (guests) => set({ guests }),
}));
