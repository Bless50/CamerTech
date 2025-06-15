"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Users,
  BarChart3,
  Star,
  Clock,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import {
  INDUSTRY_BENCHMARKS,
  PLATFORM_BENCHMARKS,
  getBenchmarkLevel,
  generateComparisonData,
  getTopPerformers,
  getBottomPerformers,
  type ComparisonData,
} from "@/lib/benchmarks"

interface BenchmarkComparisonProps {
  providers: any[]
}

export function BenchmarkComparison({ providers }: BenchmarkComparisonProps) {
  const [selectedMetric, setSelectedMetric] = useState("Customer Rating")
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComparisons = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const data = generateComparisonData(providers)
      setComparisonData(data)
      setLoading(false)
    }

    if (providers.length > 0) {
      loadComparisons()
    }
  }, [providers])

  const topPerformers = getTopPerformers(comparisonData, selectedMetric)
  const bottomPerformers = getBottomPerformers(comparisonData, selectedMetric)

  const selectedProviderData = selectedProvider ? comparisonData.find((p) => p.providerId === selectedProvider) : null

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "Response Time":
        return Clock
      case "Completion Rate":
        return Target
      case "Customer Rating":
        return Star
      case "Customer Retention":
        return Users
      case "Monthly Revenue":
        return DollarSign
      case "Monthly Bookings":
        return Calendar
      default:
        return BarChart3
    }
  }

  const getBenchmarkColor = (level: string) => {
    switch (level) {
      case "excellent":
        return "text-green-600 bg-green-50"
      case "good":
        return "text-blue-600 bg-blue-50"
      case "average":
        return "text-yellow-600 bg-yellow-50"
      case "below_average":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const formatMetricValue = (value: number, metric: string) => {
    if (metric.includes("Revenue")) return formatCurrency(value, "CFA")
    if (metric.includes("Rate") || metric.includes("Retention")) return `${value}%`
    if (metric === "Response Time") return `${value} min`
    if (metric === "Customer Rating") return `${value} ⭐`
    return value.toString()
  }

  const radarData = selectedProviderData
    ? [
        {
          metric: "Response Time",
          provider: 100 - selectedProviderData.metrics["Response Time"].percentile,
          industry: 70,
          platform: 75,
        },
        {
          metric: "Completion Rate",
          provider: selectedProviderData.metrics["Completion Rate"].percentile,
          industry: 70,
          platform: 75,
        },
        {
          metric: "Customer Rating",
          provider: selectedProviderData.metrics["Customer Rating"].percentile,
          industry: 70,
          platform: 75,
        },
        {
          metric: "Customer Retention",
          provider: selectedProviderData.metrics["Customer Retention"].percentile,
          industry: 70,
          platform: 75,
        },
        {
          metric: "Monthly Revenue",
          provider: selectedProviderData.metrics["Monthly Revenue"].percentile,
          industry: 70,
          platform: 75,
        },
        {
          metric: "Monthly Bookings",
          provider: selectedProviderData.metrics["Monthly Bookings"].percentile,
          industry: 70,
          platform: 75,
        },
      ]
    : []

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Benchmark Comparison</h2>
          <p className="text-gray-600">Compare provider performance against industry and platform standards</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Response Time">Response Time</SelectItem>
              <SelectItem value="Completion Rate">Completion Rate</SelectItem>
              <SelectItem value="Customer Rating">Customer Rating</SelectItem>
              <SelectItem value="Customer Retention">Customer Retention</SelectItem>
              <SelectItem value="Monthly Revenue">Monthly Revenue</SelectItem>
              <SelectItem value="Monthly Bookings">Monthly Bookings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Platform Average</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {PLATFORM_BENCHMARKS.map((benchmark) => (
              <div key={benchmark.metric} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{benchmark.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{formatMetricValue(benchmark.platformAverage, benchmark.metric)}</span>
                  {benchmark.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : benchmark.trend === "down" ? (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Top Performers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topPerformers.slice(0, 5).map((provider, index) => (
                <div key={provider.providerId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{provider.providerName}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatMetricValue(provider.metrics[selectedMetric].value, selectedMetric)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span>Needs Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bottomPerformers.slice(0, 5).map((provider, index) => (
                <div key={provider.providerId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{provider.providerName}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatMetricValue(provider.metrics[selectedMetric].value, selectedMetric)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Analysis</TabsTrigger>
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution - {selectedMetric}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="providerName" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [formatMetricValue(Number(value), selectedMetric), "Value"]} />
                  <Bar dataKey={`metrics.${selectedMetric}.value`} fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Provider Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select
                  value={selectedProvider?.toString() || ""}
                  onValueChange={(value) => setSelectedProvider(Number(value))}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {comparisonData.map((provider) => (
                      <SelectItem key={provider.providerId} value={provider.providerId.toString()}>
                        {provider.providerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProviderData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Performance Radar</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Provider" dataKey="provider" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                        <Radar
                          name="Platform Avg"
                          dataKey="platform"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.1}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Detailed Metrics</h4>
                    <div className="space-y-4">
                      {Object.entries(selectedProviderData.metrics).map(([metric, data]) => {
                        const benchmark = getBenchmarkLevel(data.value, metric)
                        const Icon = getMetricIcon(metric)

                        return (
                          <div key={metric} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Icon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">{metric}</span>
                              </div>
                              <Badge className={getBenchmarkColor(benchmark.level)}>
                                {benchmark.level.replace("_", " ")}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Value:</span>
                                <span className="font-medium">{formatMetricValue(data.value, metric)}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Percentile:</span>
                                <span className="font-medium">{data.percentile.toFixed(1)}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>vs Platform:</span>
                                <span
                                  className={`font-medium ${
                                    data.platformComparison > 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {data.platformComparison > 0 ? "+" : ""}
                                  {data.platformComparison.toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={data.percentile} className="h-2" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-green-600">Excellent</TableHead>
                      <TableHead className="text-blue-600">Good</TableHead>
                      <TableHead className="text-yellow-600">Average</TableHead>
                      <TableHead className="text-red-600">Below Average</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INDUSTRY_BENCHMARKS.map((benchmark, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{benchmark.metric}</TableCell>
                        <TableCell>{benchmark.category}</TableCell>
                        <TableCell className="text-green-600">
                          {formatMetricValue(benchmark.excellent, benchmark.metric)}
                        </TableCell>
                        <TableCell className="text-blue-600">
                          {formatMetricValue(benchmark.good, benchmark.metric)}
                        </TableCell>
                        <TableCell className="text-yellow-600">
                          {formatMetricValue(benchmark.average, benchmark.metric)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {formatMetricValue(benchmark.belowAverage, benchmark.metric)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{benchmark.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provider Rankings - {selectedMetric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Percentile</TableHead>
                      <TableHead>Benchmark</TableHead>
                      <TableHead>vs Platform</TableHead>
                      <TableHead>vs Industry</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData
                      .sort((a, b) => {
                        const aValue = a.metrics[selectedMetric]?.value || 0
                        const bValue = b.metrics[selectedMetric]?.value || 0

                        if (selectedMetric === "Response Time") {
                          return aValue - bValue // Lower is better
                        }
                        return bValue - aValue // Higher is better
                      })
                      .map((provider, index) => {
                        const metric = provider.metrics[selectedMetric]
                        const benchmark = getBenchmarkLevel(metric.value, selectedMetric)

                        return (
                          <TableRow key={provider.providerId}>
                            <TableCell>
                              <Badge variant="outline" className="w-8 h-8 p-0 flex items-center justify-center">
                                {index + 1}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{provider.providerName}</TableCell>
                            <TableCell>{formatMetricValue(metric.value, selectedMetric)}</TableCell>
                            <TableCell>{metric.percentile.toFixed(1)}%</TableCell>
                            <TableCell>
                              <Badge className={getBenchmarkColor(benchmark.level)}>
                                {benchmark.level.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className={metric.platformComparison > 0 ? "text-green-600" : "text-red-600"}>
                              {metric.platformComparison > 0 ? "+" : ""}
                              {metric.platformComparison.toFixed(1)}%
                            </TableCell>
                            <TableCell className={metric.industryComparison > 0 ? "text-green-600" : "text-red-600"}>
                              {metric.industryComparison > 0 ? "+" : ""}
                              {metric.industryComparison.toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
