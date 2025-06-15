"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Star, Clock, Shield, CreditCard, ArrowLeft, ArrowRight, Filter } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

export default function BookServicePage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedTechnician, setSelectedTechnician] = useState(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [searchLocation, setSearchLocation] = useState("")

  const serviceCategories = [
    { id: "electrical", name: "Electrical", description: "Wiring, repairs, installations" },
    { id: "plumbing", name: "Plumbing", description: "Pipes, fixtures, water systems" },
    { id: "carpentry", name: "Carpentry", description: "Wood work, furniture, repairs" },
    { id: "ac", name: "AC Maintenance", description: "Air conditioning service & repair" },
    { id: "general", name: "General Repairs", description: "Home and office maintenance" },
  ]

  const availableTechnicians = [
    {
      id: 1,
      name: "John Okafor",
      specialty: "Electrical Engineer",
      rating: 4.9,
      reviews: 127,
      location: "Lagos Island",
      distance: "2.3 km",
      hourlyRate: 2500,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      responseTime: "Usually responds in 15 mins",
      completedJobs: 156,
      availability: "Available today",
    },
    {
      id: 2,
      name: "Sarah Mensah",
      specialty: "Plumbing Specialist",
      rating: 4.8,
      reviews: 89,
      location: "Victoria Island",
      distance: "3.1 km",
      hourlyRate: 2000,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      responseTime: "Usually responds in 30 mins",
      completedJobs: 98,
      availability: "Available tomorrow",
    },
    {
      id: 3,
      name: "David Mwangi",
      specialty: "AC Technician",
      rating: 4.7,
      reviews: 156,
      location: "Ikoyi",
      distance: "4.2 km",
      hourlyRate: 1800,
      image: "/placeholder.svg?height=60&width=60",
      verified: true,
      responseTime: "Usually responds in 1 hour",
      completedJobs: 203,
      availability: "Available today",
    },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">What service do you need?</h2>
              <p className="text-gray-600">Select the type of service you're looking for</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService === category.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedService(category.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Your Location</Label>
                <Input
                  id="location"
                  placeholder="Enter your address or area"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Describe your issue (optional)</Label>
                <Textarea id="description" placeholder="Tell us more about what needs to be fixed..." rows={3} />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose a Technician</h2>
              <p className="text-gray-600">Select from verified professionals in your area</p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <Input placeholder="Search by name or specialty" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {availableTechnicians.map((technician) => (
                <Card
                  key={technician.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTechnician?.id === technician.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedTechnician(technician)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={technician.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {technician.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{technician.name}</h3>
                          {technician.verified && <Shield className="h-4 w-4 text-green-500" />}
                          <Badge className="bg-green-100 text-green-800">{technician.availability}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{technician.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{technician.rating}</span>
                            <span>({technician.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {technician.location} • {technician.distance}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <p>{technician.completedJobs} jobs completed</p>
                            <p>{technician.responseTime}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-blue-600">
                              {formatCurrency(technician.hourlyRate, "CFA")}
                            </span>
                            <span className="text-gray-500">/hour</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Schedule Your Service</h2>
              <p className="text-gray-600">Choose your preferred date and time</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Label className="text-base font-semibold mb-4 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">Available Time Slots</Label>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="justify-center"
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Please select a date to see available time slots</p>
                )}
              </div>
            </div>

            {selectedTechnician && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedTechnician.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedTechnician.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedTechnician.name}</p>
                      <p className="text-sm text-gray-600">{selectedTechnician.specialty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Confirm & Pay</h2>
              <p className="text-gray-600">Review your booking details and complete payment</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-semibold">{serviceCategories.find((s) => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Technician:</span>
                  <span className="font-semibold">{selectedTechnician?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-semibold">
                    {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold">{searchLocation}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Cost:</span>
                    <span className="text-blue-600">{formatCurrency(selectedTechnician?.hourlyRate, "CFA")}/hour</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Final cost will be determined after service assessment</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="wallet">Mobile Wallet</SelectItem>
                    <SelectItem value="cash">Pay on Completion</SelectItem>
                  </SelectContent>
                </Select>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Secure Payment</p>
                      <p className="text-sm text-yellow-700">
                        Your payment is held securely and only released to the technician after job completion.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">TechConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/customer">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
                `}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`
                    w-24 h-1 mx-4
                    ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Service</span>
            <span>Technician</span>
            <span>Schedule</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && !selectedTechnician) ||
                (step === 3 && (!selectedDate || !selectedTime))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
