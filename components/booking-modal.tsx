"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, MapPin, Star, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { format, isBefore, isToday } from "date-fns"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/currency"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
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
}

interface BookingFormData {
  selectedDate: Date | undefined
  selectedTime: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceAddress: string
  serviceDescription: string
  urgency: string
  estimatedDuration: string
}

export function BookingModal({ isOpen, onClose, technician, service }: BookingModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<BookingFormData>({
    selectedDate: undefined,
    selectedTime: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceAddress: "",
    serviceDescription: "",
    urgency: "normal",
    estimatedDuration: "1-2",
  })

  // Available time slots
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ]

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (stepNumber) {
      case 1:
        if (!formData.selectedDate) {
          newErrors.selectedDate = "Please select a date"
        }
        if (!formData.selectedTime) {
          newErrors.selectedTime = "Please select a time"
        }
        break

      case 2:
        if (!formData.customerName.trim()) {
          newErrors.customerName = "Name is required"
        }
        if (!formData.customerEmail.trim()) {
          newErrors.customerEmail = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
          newErrors.customerEmail = "Please enter a valid email"
        }
        if (!formData.customerPhone.trim()) {
          newErrors.customerPhone = "Phone number is required"
        }
        if (!formData.serviceAddress.trim()) {
          newErrors.serviceAddress = "Service address is required"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would make an API call to create the booking
      const bookingData = {
        ...formData,
        technicianId: technician?.id,
        serviceId: service?.id,
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      console.log("Booking created:", bookingData)

      // Close modal and redirect to confirmation
      onClose()
      router.push(`/booking-confirmation?id=${Date.now()}`)
    } catch (error) {
      console.error("Booking error:", error)
      setErrors({ submit: "Failed to create booking. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateEstimatedCost = () => {
    if (!technician || !formData.estimatedDuration) return 0

    const durationHours = Number.parseFloat(formData.estimatedDuration.split("-")[1] || "1")
    return technician.hourlyRate * durationHours
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Choose Date</Label>
                  <Calendar
                    mode="single"
                    selected={formData.selectedDate}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, selectedDate: date }))}
                    disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                    className="rounded-md border"
                  />
                  {errors.selectedDate && <p className="text-sm text-red-600 mt-1">{errors.selectedDate}</p>}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                  {formData.selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={formData.selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData((prev) => ({ ...prev, selectedTime: time }))}
                          className="justify-center"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Please select a date to see available times</p>
                  )}
                  {errors.selectedTime && <p className="text-sm text-red-600 mt-1">{errors.selectedTime}</p>}
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="urgency" className="text-sm font-medium">
                  Service Urgency
                </Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait a few days</SelectItem>
                    <SelectItem value="normal">Normal - Within 24-48 hours</SelectItem>
                    <SelectItem value="high">High - Same day service needed</SelectItem>
                    <SelectItem value="emergency">Emergency - Immediate attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                    className={errors.customerName ? "border-red-500" : ""}
                  />
                  {errors.customerName && <p className="text-sm text-red-600 mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                    className={errors.customerPhone ? "border-red-500" : ""}
                  />
                  {errors.customerPhone && <p className="text-sm text-red-600 mt-1">{errors.customerPhone}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
                  className={errors.customerEmail ? "border-red-500" : ""}
                />
                {errors.customerEmail && <p className="text-sm text-red-600 mt-1">{errors.customerEmail}</p>}
              </div>

              <div>
                <Label htmlFor="serviceAddress">Service Address *</Label>
                <Input
                  id="serviceAddress"
                  value={formData.serviceAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceAddress: e.target.value }))}
                  placeholder="Enter the address where service is needed"
                  className={errors.serviceAddress ? "border-red-500" : ""}
                />
                {errors.serviceAddress && <p className="text-sm text-red-600 mt-1">{errors.serviceAddress}</p>}
              </div>

              <div>
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Select
                  value={formData.estimatedDuration}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, estimatedDuration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5-1">30 minutes - 1 hour</SelectItem>
                    <SelectItem value="1-2">1 - 2 hours</SelectItem>
                    <SelectItem value="2-4">2 - 4 hours</SelectItem>
                    <SelectItem value="4-8">4 - 8 hours (Full day)</SelectItem>
                    <SelectItem value="8+">More than 8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="serviceDescription">Service Description</Label>
                <Textarea
                  id="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceDescription: e.target.value }))}
                  placeholder="Describe the work that needs to be done..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

              {/* Technician Info */}
              {technician && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={technician.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {technician.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{technician.name}</h4>
                        {technician.verified && <Shield className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{technician.specialty}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{technician.rating}</span>
                        {technician.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{technician.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{service?.name || "General Service"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {formData.selectedDate && format(formData.selectedDate, "PPP")} at {formData.selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formData.estimatedDuration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium">{formData.serviceAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgency:</span>
                  <Badge variant={formData.urgency === "emergency" ? "destructive" : "secondary"}>
                    {formData.urgency}
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Estimated Cost:</span>
                  <span className="text-blue-600">{formatCurrency(calculateEstimatedCost(), "CFA")}</span>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Final cost will be determined after the technician assesses the work. Payment is held securely and
                  only released after job completion.
                </AlertDescription>
              </Alert>

              {errors.submit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Book Service</span>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
                `}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`
                    w-16 h-1 mx-2
                    ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={step === 1 ? onClose : handleBack} disabled={isLoading}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext} disabled={isLoading}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Booking...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
