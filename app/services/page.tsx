import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookNowButton } from "@/components/book-now-button"
import { formatCurrency } from "@/lib/currency"
import {
  Wrench,
  Zap,
  Droplets,
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

const serviceCategories = [
  {
    id: "electrical",
    name: "Electrical Services",
    icon: Zap,
    description: "Professional electrical repairs, installations, and maintenance",
    color: "bg-yellow-500",
    searchQuery: "electrical",
    services: [
      {
        name: "Electrical Wiring",
        description: "Complete wiring installation and repair services",
        priceRange: { min: 15000, max: 50000 },
        duration: "2-4 hours",
        difficulty: "Advanced",
        rating: 4.8,
        providers: 24,
        searchQuery: "electrical wiring",
      },
      {
        name: "Light Installation",
        description: "Install ceiling lights, chandeliers, and fixtures",
        priceRange: { min: 5000, max: 15000 },
        duration: "1-2 hours",
        difficulty: "Intermediate",
        rating: 4.9,
        providers: 32,
        searchQuery: "light installation",
      },
      {
        name: "Outlet & Switch Repair",
        description: "Fix faulty outlets, switches, and electrical connections",
        priceRange: { min: 3000, max: 10000 },
        duration: "30min-1 hour",
        difficulty: "Basic",
        rating: 4.7,
        providers: 28,
        searchQuery: "outlet repair",
      },
      {
        name: "Circuit Breaker Service",
        description: "Circuit breaker installation, repair, and panel upgrades",
        priceRange: { min: 20000, max: 75000 },
        duration: "3-6 hours",
        difficulty: "Advanced",
        rating: 4.8,
        providers: 18,
        searchQuery: "circuit breaker",
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    icon: Droplets,
    description: "Expert plumbing repairs, installations, and emergency services",
    color: "bg-blue-500",
    searchQuery: "plumbing",
    services: [
      {
        name: "Pipe Repair & Installation",
        description: "Fix leaks, install new pipes, and water line services",
        priceRange: { min: 8000, max: 35000 },
        duration: "1-3 hours",
        difficulty: "Intermediate",
        rating: 4.6,
        providers: 26,
        searchQuery: "pipe repair",
      },
      {
        name: "Toilet & Sink Repair",
        description: "Fix running toilets, clogged drains, and faucet issues",
        priceRange: { min: 4000, max: 12000 },
        duration: "30min-2 hours",
        difficulty: "Basic",
        rating: 4.8,
        providers: 34,
        searchQuery: "toilet repair",
      },
      {
        name: "Water Heater Service",
        description: "Water heater installation, repair, and maintenance",
        priceRange: { min: 15000, max: 60000 },
        duration: "2-4 hours",
        difficulty: "Advanced",
        rating: 4.7,
        providers: 20,
        searchQuery: "water heater",
      },
      {
        name: "Emergency Plumbing",
        description: "24/7 emergency plumbing services for urgent issues",
        priceRange: { min: 10000, max: 25000 },
        duration: "1-2 hours",
        difficulty: "Intermediate",
        rating: 4.9,
        providers: 16,
        searchQuery: "emergency plumbing",
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive Services",
    icon: Car,
    description: "Professional car repair and maintenance services",
    color: "bg-red-500",
    searchQuery: "automotive",
    services: [
      {
        name: "Engine Diagnostics",
        description: "Complete engine diagnosis and troubleshooting",
        priceRange: { min: 12000, max: 30000 },
        duration: "1-2 hours",
        difficulty: "Advanced",
        rating: 4.7,
        providers: 22,
        searchQuery: "engine repair",
      },
      {
        name: "Brake Service",
        description: "Brake pad replacement, brake fluid, and system repair",
        priceRange: { min: 8000, max: 25000 },
        duration: "1-3 hours",
        difficulty: "Intermediate",
        rating: 4.8,
        providers: 28,
        searchQuery: "brake repair",
      },
      {
        name: "Oil Change & Maintenance",
        description: "Regular oil changes and basic vehicle maintenance",
        priceRange: { min: 3000, max: 8000 },
        duration: "30min-1 hour",
        difficulty: "Basic",
        rating: 4.9,
        providers: 35,
        searchQuery: "oil change",
      },
      {
        name: "Tire Service",
        description: "Tire installation, rotation, balancing, and repair",
        priceRange: { min: 5000, max: 15000 },
        duration: "30min-2 hours",
        difficulty: "Basic",
        rating: 4.6,
        providers: 30,
        searchQuery: "tire service",
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics Repair",
    icon: Smartphone,
    description: "Expert repair services for phones, computers, and electronics",
    color: "bg-purple-500",
    searchQuery: "electronics",
    services: [
      {
        name: "Phone Screen Repair",
        description: "iPhone and Android screen replacement and repair",
        priceRange: { min: 8000, max: 20000 },
        duration: "30min-1 hour",
        difficulty: "Intermediate",
        rating: 4.8,
        providers: 25,
        searchQuery: "phone repair",
      },
      {
        name: "Computer Repair",
        description: "Laptop and desktop repair, virus removal, upgrades",
        priceRange: { min: 10000, max: 35000 },
        duration: "1-4 hours",
        difficulty: "Advanced",
        rating: 4.7,
        providers: 18,
        searchQuery: "computer repair",
      },
      {
        name: "TV & Audio Repair",
        description: "Television, speaker, and audio equipment repair",
        priceRange: { min: 12000, max: 40000 },
        duration: "1-3 hours",
        difficulty: "Advanced",
        rating: 4.6,
        providers: 15,
        searchQuery: "tv repair",
      },
      {
        name: "Gaming Console Repair",
        description: "PlayStation, Xbox, and Nintendo console repair",
        priceRange: { min: 15000, max: 30000 },
        duration: "1-2 hours",
        difficulty: "Advanced",
        rating: 4.9,
        providers: 12,
        searchQuery: "gaming console",
      },
    ],
  },
  {
    id: "home-improvement",
    name: "Home Improvement",
    icon: Home,
    description: "Professional home renovation and improvement services",
    color: "bg-green-500",
    searchQuery: "home improvement",
    services: [
      {
        name: "Painting Services",
        description: "Interior and exterior painting, wall preparation",
        priceRange: { min: 20000, max: 80000 },
        duration: "4-8 hours",
        difficulty: "Intermediate",
        rating: 4.7,
        providers: 30,
        searchQuery: "painting",
      },
      {
        name: "Flooring Installation",
        description: "Tile, hardwood, laminate, and carpet installation",
        priceRange: { min: 25000, max: 100000 },
        duration: "4-12 hours",
        difficulty: "Advanced",
        rating: 4.8,
        providers: 20,
        searchQuery: "flooring",
      },
      {
        name: "Cabinet Installation",
        description: "Kitchen and bathroom cabinet installation and repair",
        priceRange: { min: 30000, max: 120000 },
        duration: "6-12 hours",
        difficulty: "Advanced",
        rating: 4.6,
        providers: 16,
        searchQuery: "cabinet installation",
      },
      {
        name: "Door & Window Service",
        description: "Door and window installation, repair, and replacement",
        priceRange: { min: 15000, max: 50000 },
        duration: "2-6 hours",
        difficulty: "Intermediate",
        rating: 4.8,
        providers: 24,
        searchQuery: "door window",
      },
    ],
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    icon: Wrench,
    description: "Professional appliance repair and maintenance services",
    color: "bg-orange-500",
    searchQuery: "appliance",
    services: [
      {
        name: "Refrigerator Repair",
        description: "Refrigerator and freezer repair, maintenance, and parts",
        priceRange: { min: 12000, max: 35000 },
        duration: "1-3 hours",
        difficulty: "Advanced",
        rating: 4.7,
        providers: 22,
        searchQuery: "refrigerator repair",
      },
      {
        name: "Washing Machine Repair",
        description: "Washer and dryer repair, installation, and maintenance",
        priceRange: { min: 10000, max: 30000 },
        duration: "1-2 hours",
        difficulty: "Intermediate",
        rating: 4.8,
        providers: 26,
        searchQuery: "washing machine",
      },
      {
        name: "Dishwasher Service",
        description: "Dishwasher repair, installation, and troubleshooting",
        priceRange: { min: 8000, max: 25000 },
        duration: "1-2 hours",
        difficulty: "Intermediate",
        rating: 4.6,
        providers: 20,
        searchQuery: "dishwasher",
      },
      {
        name: "HVAC Service",
        description: "Air conditioning and heating system repair and maintenance",
        priceRange: { min: 15000, max: 60000 },
        duration: "2-4 hours",
        difficulty: "Advanced",
        rating: 4.9,
        providers: 18,
        searchQuery: "hvac",
      },
    ],
  },
]

const difficultyColors = {
  Basic: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export default function ServicesPage() {
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

          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/search?q=${encodeURIComponent(category.searchQuery)}&category=${category.id}`}
                  className="group"
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:shadow-md transition-all duration-200 group-hover:scale-105"
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {category.services.reduce((total, service) => total + service.providers, 0)} pros
                    </Badge>
                  </Button>
                </Link>
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

      {/* Service Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Our Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From emergency repairs to planned maintenance, our verified technicians are ready to help with
              professional, reliable service.
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Category Header */}
                  <div className={`${category.color} text-white p-8`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{category.name}</h3>
                          <p className="text-white/90">{category.description}</p>
                        </div>
                      </div>
                      <Link href={`/search?q=${encodeURIComponent(category.searchQuery)}&category=${category.id}`}>
                        <Button
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Find {category.name.split(" ")[0]} Pros
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {category.services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                              <CardTitle className="text-lg">{service.name}</CardTitle>
                              <Badge className={difficultyColors[service.difficulty as keyof typeof difficultyColors]}>
                                {service.difficulty}
                              </Badge>
                            </div>
                            <CardDescription className="text-gray-600">{service.description}</CardDescription>
                          </CardHeader>

                          <CardContent>
                            <div className="space-y-4">
                              {/* Price Range */}
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Price Range:</span>
                                <span className="font-semibold text-lg">
                                  {formatCurrency(service.priceRange.min, "CFA")} -{" "}
                                  {formatCurrency(service.priceRange.max, "CFA")}
                                </span>
                              </div>

                              {/* Service Details */}
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{service.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="text-gray-600">{service.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{service.providers} pros</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2">
                                <BookNowButton service={service.name} className="flex-1" />
                                <Link
                                  href={`/search?q=${encodeURIComponent(service.searchQuery)}&service=${encodeURIComponent(service.name)}`}
                                  className="flex-1"
                                >
                                  <Button variant="outline" className="w-full">
                                    <Search className="h-4 w-4 mr-2" />
                                    Find Pros
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
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
