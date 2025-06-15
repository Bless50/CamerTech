"use client"

import React from "react"

import { BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PerformanceScorecard } from "@/components/performance-scorecard"

const providers = [
  {
    id: "1",
    name: "Provider A",
    specialty: "Cardiology",
    responseTime: 22,
    completionRate: 95,
    averageRating: 4.8,
    customerRetention: 80,
    totalRevenue: 300000,
    totalBookings: 20,
    performanceScore: 92,
  },
  {
    id: "2",
    name: "Provider B",
    specialty: "Dermatology",
    responseTime: 18,
    completionRate: 90,
    averageRating: 4.5,
    customerRetention: 70,
    totalRevenue: 200000,
    totalBookings: 12,
    performanceScore: 85,
  },
  {
    id: "3",
    name: "Provider C",
    specialty: "Orthopedics",
    responseTime: 25,
    completionRate: 98,
    averageRating: 4.9,
    customerRetention: 85,
    totalRevenue: 400000,
    totalBookings: 25,
    performanceScore: 95,
  },
  {
    id: "4",
    name: "Provider D",
    specialty: "Neurology",
    responseTime: 20,
    completionRate: 92,
    averageRating: 4.7,
    customerRetention: 75,
    totalRevenue: 250000,
    totalBookings: 15,
    performanceScore: 88,
  },
  {
    id: "5",
    name: "Provider E",
    specialty: "Oncology",
    responseTime: 23,
    completionRate: 96,
    averageRating: 4.6,
    customerRetention: 72,
    totalRevenue: 280000,
    totalBookings: 18,
    performanceScore: 90,
  },
]

export default function ProvidersPage() {
  const [search, setSearch] = React.useState("")

  const filteredProviders = providers.filter((provider) => provider.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Providers</h2>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search providers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Benchmark Overview
          </Button>
        </div>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <PerformanceScorecard
              key={provider.id}
              providerId={provider.id}
              providerName={provider.name}
              specialty={provider.specialty}
              metrics={{
                responseTime: provider.responseTime || 20,
                completionRate: provider.completionRate || 92,
                customerRating: provider.averageRating || 4.7,
                customerRetention: provider.customerRetention || 75,
                monthlyRevenue: provider.totalRevenue || 250000,
                monthlyBookings: provider.totalBookings || 15,
              }}
              performanceScore={provider.performanceScore || 88}
              trends={{
                responseTime: { value: -5.2, direction: "down" },
                completionRate: { value: 2.1, direction: "up" },
                customerRating: { value: 0.1, direction: "up" },
                customerRetention: { value: 3.4, direction: "up" },
                monthlyRevenue: { value: 8.7, direction: "up" },
                monthlyBookings: { value: 12.4, direction: "up" },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
