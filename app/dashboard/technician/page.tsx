"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Bell,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("requests")
  const [isAvailable, setIsAvailable] = useState(true)

  const bookingRequests = [
    {
      id: 1,
      service: "Electrical Repair",
      customer: "Jane Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      address: "123 Victoria Island, Lagos",
      price: 15000,
      description: "Need to fix faulty wiring in the kitchen",
      customerImage: "/placeholder.svg?height=40&width=40",
      urgency: "high",
    },
    {
      id: 2,
      service: "AC Installation",
      customer: "Mike Johnson",
      date: "2024-01-16",
      time: "2:00 PM",
      address: "456 Ikoyi, Lagos",
      price: 45000,
      description: "Install new split AC unit in bedroom",
      customerImage: "/placeholder.svg?height=40&width=40",
      urgency: "medium",
    },
  ]

  const upcomingJobs = [
    {
      id: 3,
      service: "Plumbing Repair",
      customer: "Sarah Wilson",
      date: "2024-01-17",
      time: "9:00 AM",
      address: "789 Lekki, Lagos",
      price: 12000,
      status: "confirmed",
      customerImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  const completedJobs = [
    {
      id: 4,
      service: "Carpentry Work",
      customer: "David Brown",
      date: "2024-01-12",
      price: 25000,
      rating: 5,
      review: "Excellent work! Very professional and completed on time.",
      customerImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      service: "Electrical Maintenance",
      customer: "Lisa Davis",
      date: "2024-01-10",
      price: 18000,
      rating: 4,
      review: "Good service, arrived on time and fixed the issue quickly.",
      customerImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">TechConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Available</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Manage your bookings and grow your business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(125000, "CFA")}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jobs Completed</p>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">4.9</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Based on 127 reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="requests">New Requests</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Jobs</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">New Booking Requests</h2>
              <Badge variant="secondary">{bookingRequests.length} pending</Badge>
            </div>

            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={request.customerImage || "/placeholder.svg"} />
                          <AvatarFallback>
                            {request.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{request.service}</h3>
                            <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">Requested by {request.customer}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{request.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{request.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{request.address}</span>
                          </div>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{request.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-4">
                          {formatCurrency(request.price, "CFA")}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Jobs</h2>
              <Badge variant="secondary">{upcomingJobs.length} scheduled</Badge>
            </div>

            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={job.customerImage || "/placeholder.svg"} />
                          <AvatarFallback>
                            {job.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.service}</h3>
                          <p className="text-gray-600 mb-2">for {job.customer}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.time}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">{job.status}</Badge>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{job.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(job.price, "CFA")}</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Completed Jobs</h2>
              <Badge variant="secondary">{completedJobs.length} this month</Badge>
            </div>

            <div className="space-y-4">
              {completedJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={job.customerImage || "/placeholder.svg"} />
                          <AvatarFallback>
                            {job.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.service}</h3>
                          <p className="text-gray-600 mb-2">for {job.customer}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span>{job.rating}/5</span>
                            </div>
                          </div>
                          {job.review && (
                            <div className="bg-blue-50 p-3 rounded-md">
                              <p className="text-sm text-gray-700 italic">"{job.review}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-2">{formatCurrency(job.price, "CFA")}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < job.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technician Profile</CardTitle>
                <CardDescription>Manage your professional information and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">John Okafor</h3>
                    <p className="text-gray-600">Electrical Engineer</p>
                    <p className="text-gray-600">5 years experience</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">4.9 (127 reviews)</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Services Offered</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary">Electrical Repairs</Badge>
                      <Badge variant="secondary">Wiring Installation</Badge>
                      <Badge variant="secondary">Circuit Breaker Repair</Badge>
                    </div>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      Manage Services
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Area</h4>
                    <p className="text-gray-600">Lagos Island, Victoria Island, Ikoyi</p>
                    <p className="text-sm text-gray-500">Within 15km radius</p>
                    <Button variant="link" className="p-0 h-auto">
                      Update Service Area
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Electrical Engineering License</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Safety Certification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Insurance Verification (Pending)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Availability Status</h4>
                      <p className="text-sm text-gray-600">Control when you receive new booking requests</p>
                    </div>
                    <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Auto-Accept Bookings</h4>
                      <p className="text-sm text-gray-600">Automatically accept bookings that match your criteria</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Notification Preferences</h4>
                      <p className="text-sm text-gray-600">Choose how you want to be notified</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Payment Settings</h4>
                      <p className="text-sm text-gray-600">Manage your payout preferences</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
