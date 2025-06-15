"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  ArrowLeft,
  Wrench,
  Users,
  Calendar,
  Phone,
  Mail,
  Zap,
  Droplets,
  Hammer,
  Wind,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AISuggestions from "@/components/ai-suggestions"
import { useClientUrl } from "@/hooks/use-client-url"
import { SmartSearch } from "@/components/smart-search"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const clientUrl = useClientUrl()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularServices = [
    { icon: Zap, name: "Electrical Repairs", href: "/services/electrical" },
    { icon: Droplets, name: "Plumbing Services", href: "/services/plumbing" },
    { icon: Hammer, name: "Carpentry Work", href: "/services/carpentry" },
    { icon: Wind, name: "AC Maintenance", href: "/services/ac" },
  ]

  const quickLinks = [
    { name: "Find Technicians", href: "/technicians", icon: Users },
    { name: "Book a Service", href: "/book-service", icon: Calendar },
    { name: "How It Works", href: "/how-it-works", icon: Settings },
    { name: "Contact Support", href: "/contact", icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-9xl font-bold text-blue-100 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 rounded-full p-6">
                  <Wrench className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-2">The page you're looking for seems to have gone missing.</p>
            <p className="text-lg text-gray-500">
              Don't worry, even the best technicians sometimes lose their tools! Let's help you find what you need.
            </p>
          </div>

          {/* AI-Powered Suggestions */}
          {clientUrl && <AISuggestions requestedUrl={clientUrl} className="mb-8" />}

          {/* Search Bar */}
          <SmartSearch
            onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
            placeholder="Search for services, technicians, or help..."
            className="max-w-2xl mx-auto"
          />

          {/* Navigation Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left hover:bg-blue-50 hover:text-blue-600"
                      >
                        <link.icon className="h-5 w-5 mr-3" />
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Services</h3>
                <div className="space-y-3">
                  {popularServices.map((service, index) => (
                    <Link key={index} href={service.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left hover:bg-green-50 hover:text-green-600"
                      >
                        <service.icon className="h-5 w-5 mr-3" />
                        {service.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="h-5 w-5 mr-2" />
                Back to Homepage
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Help Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
              <p className="text-blue-700 mb-4">
                If you're having trouble finding what you're looking for, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Link href="tel:+234-800-TECH-HELP">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            <strong>Error Code:</strong> 404 - Page Not Found
          </p>
          <p>
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
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
                  <Link href="/services/electrical" className="hover:text-white">
                    Electrical
                  </Link>
                </li>
                <li>
                  <Link href="/services/plumbing" className="hover:text-white">
                    Plumbing
                  </Link>
                </li>
                <li>
                  <Link href="/services/carpentry" className="hover:text-white">
                    Carpentry
                  </Link>
                </li>
                <li>
                  <Link href="/services/ac" className="hover:text-white">
                    AC Maintenance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
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
