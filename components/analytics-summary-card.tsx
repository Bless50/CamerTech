"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Star, Calendar, DollarSign, BarChart3, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"

interface AnalyticsSummaryCardProps {
  providerId: number
  providerName: string
  totalBookings: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  performanceScore: number
  trend: "up" | "down" | "neutral"
  trendValue: number
}

export function AnalyticsSummaryCard({
  providerId,
  providerName,
  totalBookings,
  totalRevenue,
  averageRating,
  completionRate,
  performanceScore,
  trend,
  trendValue,
}: AnalyticsSummaryCardProps) {
  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { variant: "default" as const, label: "Excellent" }
    if (score >= 80) return { variant: "secondary" as const, label: "Good" }
    return { variant: "destructive" as const, label: "Needs Improvement" }
  }

  const performanceBadge = getPerformanceBadge(performanceScore)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{providerName}</CardTitle>
          <Badge {...performanceBadge}>{performanceBadge.label}</Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Performance Score:</span>
          <span className="font-semibold text-blue-600">{performanceScore}%</span>
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : trend === "down" ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : null}
          {trend !== "neutral" && (
            <span className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>{trendValue}%</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Bookings</span>
            </div>
            <p className="text-xl font-semibold">{totalBookings}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(totalRevenue, "CFA")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-600">Rating</span>
            </div>
            <p className="text-xl font-semibold">{averageRating}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Completion</span>
            </div>
            <p className="text-xl font-semibold">{completionRate}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Performance</span>
            <span className="font-medium">{performanceScore}%</span>
          </div>
          <Progress value={performanceScore} className="h-2" />
        </div>

        <div className="flex space-x-2 pt-2">
          <Link href={`/admin/providers/${providerId}/analytics`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Link href={`/admin/providers/${providerId}/analytics`} className="flex-1">
            <Button size="sm" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
