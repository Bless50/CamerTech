"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Download,
  Share2,
  Home,
  Star,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch the booking details from the API
    // For now, we'll simulate the booking data
    const mockBooking = {
      id: bookingId || "BK001234",
      status: "confirmed",
      service: "Electrical Repair",
      technician: {
        id: 1,
        name: "John Okafor",
        specialty: "Electrical Engineer",
        rating: 4.9,
        phone: "+234 801 234 5678",
        image: "/placeholder.svg?height=60&width=60",
        verified: true,
      },
      customer: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+234 802 345 6789",
      },
      schedule: {
        date: "2024-01-20",
        time: "10:00 AM",
        duration: "2 hours",
      },
      address: "123 Victoria Island, Lagos, Nigeria",
      description: "Fix faulty wiring in the kitchen area",
      estimatedCost: 15000,
      urgency: "normal",
      createdAt: new Date().toISOString(),
    }

    setBooking(mockBooking)
  }, [bookingId])

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
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
            <Link href="/dashboard/customer">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">Your service request has been successfully submitted and confirmed.</p>
          <Badge className="bg-green-100 text-green-800 mt-2">Booking ID: #{booking.id}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Technician Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Technician</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={booking.technician.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {booking.technician.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{booking.technician.name}</h3>
                      {booking.technician.verified && <Shield className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-gray-600 mb-2">{booking.technician.specialty}</p>
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{booking.technician.rating} rating</span>
                    </div>
                    <div className="flex space-x-3">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Service Type</h4>
                    <p className="text-gray-600">{booking.service}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Urgency</h4>
                    <Badge variant="secondary">{booking.urgency}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                  <p className="text-gray-600">{booking.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-semibold">{booking.schedule.date}</p>
                      <p className="text-sm text-gray-600">Service Date</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-semibold">{booking.schedule.time}</p>
                      <p className="text-sm text-gray-600">Estimated {booking.schedule.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold">{booking.address}</p>
                    <p className="text-sm text-gray-600">Service Location</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Technician Confirmation</h4>
                      <p className="text-sm text-gray-600">
                        {booking.technician.name} will confirm the appointment and may contact you for additional
                        details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Day</h4>
                      <p className="text-sm text-gray-600">
                        The technician will arrive at the scheduled time and complete the work.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment & Review</h4>
                      <p className="text-sm text-gray-600">
                        Pay securely through the app and leave a review to help other customers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold">#{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-semibold text-blue-600">₦{booking.estimatedCost.toLocaleString()}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Booking
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/customer">
                  <Button className="w-full" variant="outline">
                    View All Bookings
                  </Button>
                </Link>
                <Link href="/book-service">
                  <Button className="w-full" variant="outline">
                    Book Another Service
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full" variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  If you have any questions about your booking, our support team is here to help.
                </p>
                <Link href="/contact">
                  <Button className="w-full" variant="outline">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
