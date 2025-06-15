"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  Star,
  Clock,
  Users,
  DollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import { getBenchmarkLevel } from "@/lib/benchmarks"
import Link from "next/link"

interface PerformanceScorecardProps {
  providerId: number
  providerName: string
  specialty: string
  metrics: {
    responseTime: number
    completionRate: number
    customerRating: number
    customerRetention: number
    monthlyRevenue: number
    monthlyBookings: number
  }
  performanceScore: number
  trends: {
    [key: string]: {
      value: number
      direction: "up" | "down" | "stable"
    }
  }
}

export function PerformanceScorecard({
  providerId,
  providerName,
  specialty,
  metrics,
  performanceScore,
  trends,
}: PerformanceScorecardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Good"
    if (score >= 70) return "Average"
    return "Needs Improvement"
  }

  const metricConfigs = [
    {
      key: "responseTime",
      label: "Response Time",
      value: metrics.responseTime,
      unit: "min",
      icon: Clock,
      benchmark: getBenchmarkLevel(metrics.responseTime, "Response Time"),
    },
    {
      key: "completionRate",
      label: "Completion Rate",
      value: metrics.completionRate,
      unit: "%",
      icon: Target,
      benchmark: getBenchmarkLevel(metrics.completionRate, "Completion Rate"),
    },
    {
      key: "customerRating",
      label: "Customer Rating",
      value: metrics.customerRating,
      unit: "⭐",
      icon: Star,
      benchmark: getBenchmarkLevel(metrics.customerRating, "Customer Rating"),
    },
    {
      key: "customerRetention",
      label: "Customer Retention",
      value: metrics.customerRetention,
      unit: "%",
      icon: Users,
      benchmark: getBenchmarkLevel(metrics.customerRetention, "Customer Retention"),
    },
    {
      key: "monthlyRevenue",
      label: "Monthly Revenue",
      value: metrics.monthlyRevenue,
      unit: "CFA",
      icon: DollarSign,
      benchmark: getBenchmarkLevel(metrics.monthlyRevenue, "Monthly Revenue"),
    },
    {
      key: "monthlyBookings",
      label: "Monthly Bookings",
      value: metrics.monthlyBookings,
      unit: "jobs",
      icon: Calendar,
      benchmark: getBenchmarkLevel(metrics.monthlyBookings, "Jobs per Month"),
    },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{providerName}</CardTitle>
            <p className="text-gray-600">{specialty}</p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(performanceScore)}`}
            >
              <Award className="h-4 w-4 mr-1" />
              {performanceScore}% - {getScoreLabel(performanceScore)}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Performance</span>
            <span className="font-medium">{performanceScore}%</span>
          </div>
          <Progress value={performanceScore} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {metricConfigs.map((config) => {
            const trend = trends[config.key]
            const Icon = config.icon

            return (
              <div key={config.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{config.label}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      config.benchmark.level === "excellent"
                        ? "border-green-500 text-green-700"
                        : config.benchmark.level === "good"
                          ? "border-blue-500 text-blue-700"
                          : config.benchmark.level === "average"
                            ? "border-yellow-500 text-yellow-700"
                            : "border-red-500 text-red-700"
                    }`}
                  >
                    {config.benchmark.level.replace("_", " ")}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {config.unit === "CFA"
                      ? formatCurrency(config.value, "CFA")
                      : `${config.value}${config.unit === "⭐" ? "" : " " + config.unit}`}
                  </span>

                  {trend && (
                    <div className="flex items-center space-x-1">
                      {trend.direction === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : trend.direction === "down" ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : null}
                      <span
                        className={`text-sm ${
                          trend.direction === "up"
                            ? "text-green-600"
                            : trend.direction === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {trend.direction !== "stable" && (
                          <>
                            {trend.direction === "up" ? "+" : ""}
                            {trend.value.toFixed(1)}%
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t">
          <div className="flex space-x-2">
            <Link href={`/admin/providers/${providerId}/analytics`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View Analytics
              </Button>
            </Link>
            <Link href={`/admin/providers/${providerId}/benchmark`} className="flex-1">
              <Button size="sm" className="w-full">
                Compare
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
