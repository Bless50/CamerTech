"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { BookingModal } from "./booking-modal"

interface BookNowButtonProps {
  technician?: {
    id: number
    name: string
    specialty: string
    rating: number
    hourlyRate: number
    image?: string
    verified?: boolean
    location?: string
  }
  service?: {
    id: string
    name: string
    category: string
    description?: string
  }
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "sm" | "default" | "lg"
  className?: string
  showModal?: boolean
  children?: React.ReactNode
}

export function BookNowButton({
  technician,
  service,
  variant = "default",
  size = "default",
  className = "",
  showModal = false,
  children,
}: BookNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleBookNow = () => {
    if (showModal) {
      setIsModalOpen(true)
    } else {
      // Navigate to full booking page with pre-filled data
      const params = new URLSearchParams()

      if (technician) {
        params.set("technician", technician.id.toString())
      }

      if (service) {
        params.set("service", service.id)
      }

      router.push(`/book-service?${params.toString()}`)
    }
  }

  return (
    <>
      <Button onClick={handleBookNow} variant={variant} size={size} className={className}>
        {children || (
          <>
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </>
        )}
      </Button>

      {showModal && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          technician={technician}
          service={service}
        />
      )}
    </>
  )
}
