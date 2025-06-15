"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ArrowLeft, Wrench } from "lucide-react"

interface Provider {
  id: number
  name: string
  email: string
  specialty: string
  status: string
}

export default function ProviderAnalyticsPage() {
  const params = useParams()
  const providerId = Number(params.id)
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call to fetch provider details
    const fetchProvider = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock provider data
      const mockProviders = {
        1: {
          id: 1,
          name: "Amadou Diallo",
          email: "amadou.diallo@email.com",
          specialty: "Electrical Engineer",
          status: "active",
        },
        2: {
          id: 2,
          name: "Fatou Sow",
          email: "fatou.sow@email.com",
          specialty: "Plumbing Specialist",
          status: "active",
        },
        3: {
          id: 3,
          name: "Moussa Traoré",
          email: "moussa.traore@email.com",
          specialty: "AC Technician",
          status: "pending",
        },
      }

      setProvider(mockProviders[providerId as keyof typeof mockProviders] || null)
      setLoading(false)
    }

    if (providerId) {
      fetchProvider()
    }
  }, [providerId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h1>
          <p className="text-gray-600 mb-4">The requested provider could not be found.</p>
          <Link href="/admin/providers">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Providers
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">TechConnect</span>
              </Link>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Admin Panel
              </Badge>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/admin/providers" className="text-gray-600 hover:text-blue-600">
                Providers
              </Link>
              <Link href="/admin/services" className="text-gray-600 hover:text-blue-600">
                Services
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link href="/admin/providers" className="text-blue-600 hover:text-blue-800">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Providers
            </Button>
          </Link>
        </div>

        {/* Provider Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{provider.name}</h2>
              <p className="text-gray-600">{provider.specialty}</p>
              <p className="text-sm text-gray-500">{provider.email}</p>
            </div>
            <Badge
              className={provider.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
            >
              {provider.status}
            </Badge>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard providerId={provider.id} providerName={provider.name} />
      </div>
    </div>
  )
}
