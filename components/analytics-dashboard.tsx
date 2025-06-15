"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  Download,
  Filter,
  BarChart3,
  PieChartIcon,
  Activity,
  Award,
  MessageSquare,
} from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import {
  generateProviderAnalytics,
  calculateComparisonMetrics,
  exportAnalyticsData,
  type ProviderAnalytics,
  type ComparisonMetrics,
} from "@/lib/analytics"

interface AnalyticsDashboardProps {
  providerId: number
  providerName: string
}

export function AnalyticsDashboard({ providerId, providerName }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [analytics, setAnalytics] = useState<ProviderAnalytics | null>(null)
  const [previousAnalytics, setPreviousAnalytics] = useState<ProviderAnalytics | null>(null)
  const [comparisonMetrics, setComparisonMetrics] = useState<ComparisonMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const currentData = generateProviderAnalytics(providerId, selectedPeriod)
      const previousData = generateProviderAnalytics(providerId, selectedPeriod)
      // Simulate previous period data with slight variations
      previousData.totalBookings = Math.floor(currentData.totalBookings * 0.85)
      previousData.totalRevenue = Math.floor(currentData.totalRevenue * 0.82)
      previousData.completionRate = currentData.completionRate - 2.1
      previousData.averageRating = currentData.averageRating - 0.1

      setAnalytics(currentData)
      setPreviousAnalytics(previousData)
      setComparisonMetrics(calculateComparisonMetrics(currentData, previousData))
      setLoading(false)
    }

    loadAnalytics()
  }, [providerId, selectedPeriod])

  const handleExport = (format: "csv" | "pdf" | "excel") => {
    if (analytics) {
      exportAnalyticsData(analytics, format)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  const ratingDistributionData = Object.entries(analytics.customerFeedback.ratingDistribution).map(
    ([rating, count]) => ({
      rating: `${rating} Stars`,
      count,
      percentage: (count / analytics.customerFeedback.totalReviews) * 100,
    }),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Performance insights for {providerName}</p>
        </div>
        <div className="flex items-center space-x-4">
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

      {/* Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Overall Performance Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-blue-600">{analytics.performanceScore}%</span>
                <Badge
                  variant={
                    analytics.performanceScore >= 90
                      ? "default"
                      : analytics.performanceScore >= 80
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {analytics.performanceScore >= 90
                    ? "Excellent"
                    : analytics.performanceScore >= 80
                      ? "Good"
                      : "Needs Improvement"}
                </Badge>
              </div>
              <Progress value={analytics.performanceScore} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                Based on completion rate, customer satisfaction, response time, and reliability
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {comparisonMetrics.map((metric, index) => {
          const icons = [Calendar, DollarSign, CheckCircle, Star]
          const Icon = icons[index] || Activity
          const isPercentage = metric.metric.includes("Rate") || metric.metric.includes("Rating")
          const isCurrency = metric.metric.includes("Revenue")

          return (
            <Card key={metric.metric}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {isCurrency
                        ? formatCurrency(metric.currentValue, "CFA")
                        : isPercentage && !metric.metric.includes("Rating")
                          ? `${metric.currentValue}%`
                          : metric.currentValue}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center mt-2">
                  {metric.changeType === "increase" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      metric.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(metric.change).toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="revenue" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Revenue</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="ratings" className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Ratings</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center space-x-2">
            <PieChartIcon className="h-4 w-4" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Feedback</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value), "CFA"), "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Bookings (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.bookingsByDay.slice(-30)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).getDate().toString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completed</span>
                    <span className="text-sm text-gray-600">{analytics.completedJobs}</span>
                  </div>
                  <Progress value={(analytics.completedJobs / analytics.totalBookings) * 100} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cancelled</span>
                    <span className="text-sm text-gray-600">{analytics.cancelledJobs}</span>
                  </div>
                  <Progress value={(analytics.cancelledJobs / analytics.totalBookings) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.responseTime} min</div>
                  <p className="text-sm text-gray-600">Average response time</p>
                  <div className="mt-4">
                    <Badge
                      variant={
                        analytics.responseTime <= 15
                          ? "default"
                          : analytics.responseTime <= 30
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {analytics.responseTime <= 15
                        ? "Excellent"
                        : analytics.responseTime <= 30
                          ? "Good"
                          : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{analytics.customerRetention}%</div>
                  <p className="text-sm text-gray-600">Repeat customers</p>
                  <div className="mt-4">
                    <Progress value={analytics.customerRetention} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ rating, percentage }) => `${rating}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {ratingDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.ratingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[4, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rating" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.popularServices.map((service, index) => (
                  <div key={service.serviceName} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{service.serviceName}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{service.bookings} bookings</span>
                        <span>{formatCurrency(service.revenue, "CFA")} revenue</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{service.averageRating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Praises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.customerFeedback.commonPraises.map((praise, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{praise}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.customerFeedback.commonComplaints.map((complaint, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{complaint}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => handleExport("csv")}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("excel")}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
