"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AnalyticsSummaryCard } from "@/components/analytics-summary-card"
import { Users, DollarSign, Star, Search, Filter, Download, Wrench, BarChart3, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

export default function AdminAnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [sortBy, setSortBy] = useState("performance")

  // Mock analytics data for all providers
  const providersAnalytics = [
    {
      providerId: 1,
      providerName: "Amadou Diallo",
      totalBookings: 156,
      totalRevenue: 2340000,
      averageRating: 4.9,
      completionRate: 94.9,
      performanceScore: 94.5,
      trend: "up" as const,
      trendValue: 12.5,
    },
    {
      providerId: 2,
      providerName: "Fatou Sow",
      totalBookings: 98,
      totalRevenue: 1104000,
      averageRating: 4.7,
      completionRate: 93.9,
      performanceScore: 89.2,
      trend: "up" as const,
      trendValue: 8.3,
    },
    {
      providerId: 3,
      providerName: "Moussa Traoré",
      totalBookings: 45,
      totalRevenue: 410000,
      averageRating: 4.8,
      completionRate: 91.1,
      performanceScore: 85.7,
      trend: "down" as const,
      trendValue: 3.2,
    },
  ]

  const overallStats = {
    totalProviders: providersAnalytics.length,
    totalBookings: providersAnalytics.reduce((sum, p) => sum + p.totalBookings, 0),
    totalRevenue: providersAnalytics.reduce((sum, p) => sum + p.totalRevenue, 0),
    averageRating: providersAnalytics.reduce((sum, p) => sum + p.averageRating, 0) / providersAnalytics.length,
    averagePerformance: providersAnalytics.reduce((sum, p) => sum + p.performanceScore, 0) / providersAnalytics.length,
  }

  const filteredProviders = providersAnalytics
    .filter((provider) => provider.providerName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "performance":
          return b.performanceScore - a.performanceScore
        case "revenue":
          return b.totalRevenue - a.totalRevenue
        case "bookings":
          return b.totalBookings - a.totalBookings
        case "rating":
          return b.averageRating - a.averageRating
        default:
          return 0
      }
    })

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
              <Link href="/admin/analytics" className="text-blue-600 font-medium">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-600">Comprehensive performance insights across all service providers</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Providers</p>
                  <p className="text-2xl font-bold text-blue-600">{overallStats.totalProviders}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-green-600">{overallStats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(overallStats.totalRevenue, "CFA")}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{overallStats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                  <p className="text-2xl font-bold text-indigo-600">{overallStats.averagePerformance.toFixed(1)}%</p>
                </div>
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Score</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="bookings">Total Bookings</SelectItem>
                <SelectItem value="rating">Average Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Provider Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <AnalyticsSummaryCard key={provider.providerId} {...provider} />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
