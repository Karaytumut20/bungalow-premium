"use client"

import * as React from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useBookingStore } from "@/store/useBookingStore"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  // Zustand store'dan tarih state'ini çekiyoruz
  const { dates, setDates } = useBookingStore()

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"ghost"}
            className={cn(
              "w-full justify-start text-left font-normal px-0 h-auto py-0 hover:bg-transparent",
              !dates?.from && "text-muted-foreground"
            )}
          >
            {dates?.from ? (
              dates.to ? (
                <span className="text-sm font-medium text-gray-900">
                  {format(dates.from, "dd MMM", { locale: tr })} -{" "}
                  {format(dates.to, "dd MMM", { locale: tr })}
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-900">
                  {format(dates.from, "dd MMM", { locale: tr })}
                </span>
              )
            ) : (
              <span className="text-sm text-gray-400">Giriş - Çıkış</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from}
            selected={{ from: dates?.from, to: dates?.to }}
            onSelect={(range) => setDates({ from: range?.from, to: range?.to })}
            numberOfMonths={2}
            locale={tr}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // Geçmiş tarihleri seçilemez yap
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
