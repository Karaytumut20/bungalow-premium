"use client";


import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { tr } from "date-fns/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReservationStatus } from "@prisma/client";

// Set up the localizer for react-big-calendar using date-fns and Turkish locale
const locales = {
  "tr-TR": tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Tip tanımı, Prisma modelinin alt kümesi
type CalendarReservation = {
  id: string;
  bungalowId: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  guestPhone: string;
  totalPrice: number;
  status: ReservationStatus;
  bungalow: {
    title: string;
  };
};

export default function ReservationsCalendarClient({ 
  initialReservations 
}: { 
  initialReservations: CalendarReservation[] 
}) {
  // react-big-calendar için event formatına çeviriyoruz
  const events = initialReservations.map((res: CalendarReservation) => ({
    id: res.id,
    title: `${res.bungalow.title} - ${res.guestName}`,
    start: new Date(res.checkIn),
    end: new Date(res.checkOut),
    status: res.status,
    resource: res
  }));

  // Renklendirme mantığı (status'e göre)
  const eventStyleGetter = (event: { status: ReservationStatus }) => {
    let backgroundColor = '#3B82F6'; // Default Blue
    
    if (event.status === ReservationStatus.APPROVED) {
      backgroundColor = '#10B981'; // Green
    } else if (event.status === ReservationStatus.PENDING) {
      backgroundColor = '#F59E0B'; // Yellow/Orange
    } else if (event.status === ReservationStatus.CANCELLED) {
      backgroundColor = '#EF4444'; // Red
    } else if (event.status === ReservationStatus.COMPLETED) {
      backgroundColor = '#6B7280'; // Gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event: { title: string, status: string, resource: { totalPrice: number } }) => {
    // Burada detay modali açılabilir
    alert(`${event.title}\nDurum: ${event.status}\nTutar: ₺${event.resource.totalPrice}`);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      culture="tr-TR"
      eventPropGetter={eventStyleGetter}
      onSelectEvent={handleSelectEvent}
      defaultView={Views.MONTH}
      views={['month', 'week', 'day', 'agenda']}
      messages={{
        next: "İleri",
        previous: "Geri",
        today: "Bugün",
        month: "Ay",
        week: "Hafta",
        day: "Gün",
        agenda: "Ajanda",
        date: "Tarih",
        time: "Saat",
        event: "Rezervasyon",
        noEventsInRange: "Bu aralıkta rezervasyon bulunmuyor."
      }}
    />
  );
}
