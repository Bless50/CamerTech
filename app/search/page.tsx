"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Star, Clock, Wrench, Zap, Droplets } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Mock search results
  const searchResults = {
    technicians: [
      {
        id: 1,
        name: "John Okafor",
        specialty: "Electrical Engineer",
        rating: 4.9,
        reviews: 127,
        location: "Lagos, Nigeria",
        hourlyRate: 2500,
        image: "/placeholder.svg?height=60&width=60",
        verified: true,
        availability: "Available today",
      },
      {
        id: 2,
        name: "Sarah Mensah",
        specialty: "Plumbing Specialist",
        rating: 4.8,
        reviews: 89,
        location: "Accra, Ghana",
        hourlyRate: 2000,
        image: "/placeholder.svg?height=60&width=60",
        verified: true,
        availability: "Available tomorrow",
      },
    ],
    services: [
      {
        id: 1,
        name: "Electrical Repairs",
        description: "Professional electrical repair and installation services",
        category: "Electrical",
        averagePrice: "₦2,000 - ₦5,000",
        technicians: 45,
        icon: Zap,
      },
      {
        id: 2,
        name: "Plumbing Services",
        description: "Complete plumbing solutions for homes and offices",
        category: "Plumbing",
        averagePrice: "₦1,500 - ₦4,000",
        technicians: 38,
        icon: Droplets,
      },
    ],
    articles: [
      {
        id: 1,
        title: "How to Choose the Right Electrician",
        excerpt: "Learn what to look for when hiring an electrical technician for your home or business.",
        category: "Guide",
        readTime: "5 min read",
      },
      {
        id: 2,
        title: "Common Plumbing Issues and Solutions",
        excerpt: "Discover the most common plumbing problems and when to call a professional.",
        category: "Tips",
        readTime: "7 min read",
      },
    ],
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TechConnect</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link href="/technicians" className="text-gray-700 hover:text-blue-600">
                Find Technicians
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600">
                How It Works
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for services, technicians, or help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </form>
        </div>

        {/* Search Results */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="technicians">Technicians</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Technicians Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technicians</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.technicians.map((technician) => (
                  <Card key={technician.id} className="hover:shadow-lg transition-shadow">
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
                              <span>{technician.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-600">
                              ₦{technician.hourlyRate.toLocaleString()}/hr
                            </span>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.services.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <service.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p className="text-gray-500">Price range: {service.averagePrice}</p>
                              <p className="text-gray-500">{service.technicians} technicians available</p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Help Articles Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Help & Guides</h2>
              <div className="space-y-4">
                {searchResults.articles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span className="text-sm text-gray-500">{article.readTime}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                          <p className="text-gray-600">{article.excerpt}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technicians">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.technicians.map((technician) => (
                <Card key={technician.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={technician.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {technician.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mb-1">{technician.name}</h3>
                      <p className="text-gray-600 mb-2">{technician.specialty}</p>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{technician.rating}</span>
                        <span className="text-gray-500">({technician.reviews})</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{technician.location}</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600 mb-4">
                        ₦{technician.hourlyRate.toLocaleString()}/hr
                      </div>
                      <Button className="w-full">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <service.icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-500">Price range: {service.averagePrice}</p>
                      <p className="text-sm text-gray-500">{service.technicians} technicians available</p>
                    </div>
                    <Button className="w-full">Find Technicians</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="help">
            <div className="space-y-6">
              {searchResults.articles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="secondary">{article.category}</Badge>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-xl mb-3">{article.title}</h3>
                        <p className="text-gray-600 text-lg">{article.excerpt}</p>
                      </div>
                      <Button variant="outline">Read Article</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results State */}
        {searchQuery && (
          <div className="text-center py-12">
            <div className="mb-6">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found for "{searchQuery}"</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse our popular services below.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                electrical repair
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                plumbing service
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                ac maintenance
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                carpentry work
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
