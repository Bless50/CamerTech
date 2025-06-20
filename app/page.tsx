import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Users, Wrench, Zap, Droplets, Hammer, Wind, Search } from "lucide-react"
import Link from "next/link"
import { BookNowButton } from "@/components/book-now-button"
import { QuickBookWidget } from "@/components/quick-book-widget"
import { formatCurrency } from "@/lib/currency"
import { useEffect, useState } from "react"

export default function HomePage() {
  const serviceCategories = [
    { icon: Zap, name: "Electrical", count: 45, color: "bg-yellow-100 text-yellow-800" },
    { icon: Droplets, name: "Plumbing", count: 38, color: "bg-blue-100 text-blue-800" },
    { icon: Hammer, name: "Carpentry", count: 32, color: "bg-amber-100 text-amber-800" },
    { icon: Wind, name: "AC Maintenance", count: 28, color: "bg-cyan-100 text-cyan-800" },
    { icon: Wrench, name: "General Repairs", count: 52, color: "bg-gray-100 text-gray-800" },
  ]

  const [featuredTechnicians, setFeaturedTechnicians] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/technicians")
      .then((res) => res.json())
      .then((data) => {
        // Optionally filter or sort for "featured"
        setFeaturedTechnicians(data)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TechConnect</span>
            </div>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Skilled Technicians
            <span className="block text-blue-600">When You Need Them</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with verified, reliable technicians for all your repair and maintenance needs. Book instantly, pay
            securely, and get the job done right.
          </p>

          {/* Search Bar */}
          <QuickBookWidget className="max-w-2xl mx-auto mb-12" showTitle={false} />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Technicians</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-lg text-gray-600">Choose from our wide range of professional services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <category.icon className="h-12 w-12 mx-auto text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <Badge variant="secondary" className={category.color}>
                    {category.count} technicians
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Technicians */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top-Rated Technicians</h2>
            <p className="text-lg text-gray-600">Meet our most trusted and experienced professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTechnicians.map((technician) => (
              <Card key={technician.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={technician.image || "/placeholder.svg"}
                      alt={technician.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{technician.name}</h3>
                        {technician.verified && <Shield className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{technician.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{technician.rating}</span>
                          <span>({technician.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{technician.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(technician.hourlyRate, "CFA")}/hr
                        </span>
                        <BookNowButton
                          technician={{
                            id: technician.id,
                            name: technician.name,
                            specialty: technician.specialty,
                            rating: technician.rating,
                            hourlyRate: technician.hourlyRate,
                            image: technician.image,
                            verified: technician.verified,
                            location: technician.location,
                          }}
                          size="sm"
                          showModal={true}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get your repairs done in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search & Compare</h3>
              <p className="text-gray-600">
                Browse verified technicians in your area and compare ratings, prices, and availability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Book Instantly</h3>
              <p className="text-gray-600">
                Schedule your service at a convenient time and receive instant confirmation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get It Done</h3>
              <p className="text-gray-600">
                Your technician arrives on time, completes the job, and you pay securely through the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust TechConnect for their repair needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Users className="h-5 w-5 mr-2" />
                Find a Technician
              </Button>
            </Link>
            <Link href="/technician-signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600"
              >
                <Wrench className="h-5 w-5 mr-2" />
                Become a Technician
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">TechConnect</span>
              </div>
              <p className="text-gray-400">
                Connecting skilled technicians with customers across Africa for reliable, professional service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services/electrical">Electrical</Link>
                </li>
                <li>
                  <Link href="/services/plumbing">Plumbing</Link>
                </li>
                <li>
                  <Link href="/services/carpentry">Carpentry</Link>
                </li>
                <li>
                  <Link href="/services/ac">AC Maintenance</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/safety">Safety Guidelines</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
