"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookNowButton } from "@/components/book-now-button"
import { formatCurrency } from "@/lib/currency"
import {
  Zap,
  Droplets,
  Hammer,
  Wind,
  Wrench,
  Car,
  Smartphone,
  Home,
  Search,
  Clock,
  Star,
  Shield,
  MapPin,
  Filter,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const ICONS: Record<string, any> = {
  electrical: Zap,
  plumbing: Droplets,
  carpentry: Hammer,
  ac: Wind,
  general: Wrench,
}

const CATEGORY_COLORS: Record<string, string> = {
  electrical: "bg-yellow-500",
  plumbing: "bg-blue-500",
  carpentry: "bg-amber-500",
  ac: "bg-cyan-500",
  general: "bg-gray-500",
}

export default function ServicesPage() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/technicians")
      .then(res => res.json())
      .then(techs => {
        // Build a map: { category: { name, icon, color, services: Set } }
        const catMap: Record<string, any> = {}
        techs.forEach((tech: any) => {
          const services = tech.technicianProfile?.services || []
          services.forEach((service: string) => {
            // Assume service is the category id (e.g., 'electrical')
            if (!catMap[service]) {
              catMap[service] = {
                id: service,
                name: service.charAt(0).toUpperCase() + service.slice(1),
                icon: ICONS[service] || Wrench,
                color: CATEGORY_COLORS[service] || "bg-gray-500",
                technicians: new Set(),
              }
            }
            catMap[service].technicians.add(tech.id)
          })
        })
        // Convert to array and sort
        setCategories(Object.values(catMap).map(cat => ({ ...cat, count: cat.technicians.size })))
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Services at Your Fingertips</h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with verified technicians for all your repair and maintenance needs. Quality service guaranteed
              with transparent pricing.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for services (e.g., electrical, plumbing, car repair...)"
                  className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-full shadow-lg"
                />
                <Link href="/search">
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Service Categories */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Popular Service Categories</h2>
            <p className="text-gray-600">Click to find technicians for specific services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.length === 0 && (
              <div className="col-span-full text-center text-gray-500">No services available yet.</div>
            )}
            {categories.map(category => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className={`${category.color} text-white p-6 rounded-t-2xl`}>
                    <div className="flex items-center gap-4">
                      <IconComponent className="h-8 w-8" />
                      <div>
                        <CardTitle className="text-2xl font-bold">{category.name} Services</CardTitle>
                        <p className="text-white/90">{category.count} technician(s) available</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex gap-2">
                      <BookNowButton service={{ id: category.id, name: category.name, category: category.name }} className="flex-1" />
                      <Link href={`/search?q=${encodeURIComponent(category.name.toLowerCase())}&category=${category.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Search className="h-4 w-4 mr-2" />
                          Find Pros
                  </Button>
                </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter Services:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10000">Under 10,000 CFA</SelectItem>
                  <SelectItem value="10000-25000">10,000 - 25,000 CFA</SelectItem>
                  <SelectItem value="25000-50000">25,000 - 50,000 CFA</SelectItem>
                  <SelectItem value="50000+">50,000+ CFA</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Under 1 hour</SelectItem>
                  <SelectItem value="medium">1-3 hours</SelectItem>
                  <SelectItem value="long">3+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We ensure quality service through rigorous vetting and continuous monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All technicians undergo background checks and skill verification before joining our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee with our quality assurance program and customer protection.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-600">
                Quick booking process with same-day availability for most services and emergency support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-green-100">
            Book a service today or join our network of professional technicians
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Find a Technician
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
