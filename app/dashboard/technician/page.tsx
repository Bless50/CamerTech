"use client"

import { useState, useEffect } from "react"
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
import { useSession } from "next-auth/react"

type Booking = {
  id: string;
  service: string;
  customer: { name: string } | string;
  date: string;
  time?: string;
  address?: string;
  price?: number;
  description?: string;
  status: string;
  urgency?: string;
  customerImage?: string;
  rating?: number;
  review?: string;
};

// Helper to get customer name as string
function getCustomerName(customer: string | { name: string }) {
  return typeof customer === "string" ? customer : customer?.name || "";
}

export default function TechnicianDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("requests")
  const [isAvailable, setIsAvailable] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!session?.user?.id) return;
    setLoading(true);
    fetch(`/api/bookings?technicianId=${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
    // Fetch technician profile
    fetch(`/api/technicians?id=${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        setProfile(Array.isArray(data) ? data[0] : data);
      });
  }, [session?.user?.id]);

  // Filter bookings by status
  const bookingRequests = bookings.filter((b: any) => b.status === "PENDING");
  const upcomingJobs = bookings.filter((b: any) => b.status === "CONFIRMED");
  const completedJobs = bookings.filter((b: any) => b.status === "COMPLETED");

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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session?.user?.name}!</h1>
          <p className="text-gray-600">Manage your bookings and grow your business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(completedJobs.reduce((sum, job) => sum + (job.price ?? 0), 0), "CFA")}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">+0% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jobs Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{completedJobs.length}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{completedJobs.length ? (completedJobs.reduce((sum, job) => sum + (job.rating ?? 0), 0) / completedJobs.length).toFixed(1) : "0.0"}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Based on {completedJobs.length} reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-purple-600">0%</p>
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
                            {getCustomerName(request.customer).split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{request.service}</h3>
                            <Badge className={getUrgencyColor(request.urgency ?? "")}>{request.urgency} priority</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">Requested by {getCustomerName(request.customer)}</p>
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
                          {formatCurrency(Number(request.price ?? 0), "CFA")}
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
                            {getCustomerName(job.customer).split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.service}</h3>
                          <p className="text-gray-600 mb-2">for {getCustomerName(job.customer)}</p>
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
                        <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(Number(job.price ?? 0), "CFA")}</div>
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
                            {getCustomerName(job.customer).split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.service}</h3>
                          <p className="text-gray-600 mb-2">for {getCustomerName(job.customer)}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span>{job.rating ?? 0}/5</span>
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
                        <div className="text-xl font-bold text-gray-900 mb-2">{formatCurrency(Number(job.price ?? 0), "CFA")}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < (job.rating ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
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
                    <AvatarImage src={profile?.image || "/placeholder.svg?height=80&width=80"} />
                    <AvatarFallback>{profile?.name ? profile.name.split(" ").map((n: string) => n[0]).join("") : ""}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{profile?.name || "No Name"}</h3>
                    <p className="text-gray-600">{profile?.technicianProfile?.bio || "No bio"}</p>
                    <p className="text-gray-600">{profile?.technicianProfile?.experience || ""}</p>
                    {/* You can add rating/reviews if available in profile */}
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
                      {profile?.technicianProfile?.services?.length ? (
                        profile.technicianProfile.services.map((service: string) => (
                          <Badge key={service} variant="secondary">{service}</Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">No services listed</span>
                      )}
                    </div>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      Manage Services
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Area</h4>
                    <p className="text-gray-600">{profile?.technicianProfile?.location || "No location"}</p>
                    <Button variant="link" className="p-0 h-auto">
                      Update Service Area
                    </Button>
                  </div>
                </div>
                {/* Add certifications if available in profile.technicianProfile */}
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
