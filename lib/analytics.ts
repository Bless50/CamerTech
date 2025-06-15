export interface ProviderAnalytics {
  providerId: number
  period: "week" | "month" | "quarter" | "year"
  totalBookings: number
  completedJobs: number
  cancelledJobs: number
  totalRevenue: number
  averageRating: number
  responseTime: number // in minutes
  completionRate: number // percentage
  customerRetention: number // percentage
  popularServices: ServiceStats[]
  revenueByMonth: MonthlyRevenue[]
  ratingTrend: RatingTrend[]
  bookingsByDay: DailyBookings[]
  customerFeedback: FeedbackSummary
  performanceScore: number
}

export interface ServiceStats {
  serviceName: string
  bookings: number
  revenue: number
  averageRating: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  bookings: number
}

export interface RatingTrend {
  date: string
  rating: number
  reviewCount: number
}

export interface DailyBookings {
  date: string
  bookings: number
  revenue: number
}

export interface FeedbackSummary {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  commonPraises: string[]
  commonComplaints: string[]
}

export interface ComparisonMetrics {
  metric: string
  currentValue: number
  previousValue: number
  change: number
  changeType: "increase" | "decrease" | "neutral"
}

// Mock data generator for analytics
export function generateProviderAnalytics(providerId: number, period: string): ProviderAnalytics {
  const baseData = {
    1: {
      // Amadou Diallo
      totalBookings: 156,
      completedJobs: 148,
      cancelledJobs: 8,
      totalRevenue: 2340000, // 2,340,000 CFA
      averageRating: 4.9,
      responseTime: 15,
      completionRate: 94.9,
      customerRetention: 87.5,
    },
    2: {
      // Fatou Sow
      totalBookings: 98,
      completedJobs: 92,
      cancelledJobs: 6,
      totalRevenue: 1104000, // 1,104,000 CFA
      averageRating: 4.7,
      responseTime: 22,
      completionRate: 93.9,
      customerRetention: 82.1,
    },
    3: {
      // Moussa Traoré
      totalBookings: 45,
      completedJobs: 41,
      cancelledJobs: 4,
      totalRevenue: 410000, // 410,000 CFA
      averageRating: 4.8,
      responseTime: 18,
      completionRate: 91.1,
      customerRetention: 78.3,
    },
  }

  const provider = baseData[providerId as keyof typeof baseData] || baseData[1]

  return {
    providerId,
    period: period as any,
    ...provider,
    popularServices: [
      { serviceName: "Electrical Installation", bookings: 45, revenue: 675000, averageRating: 4.9 },
      { serviceName: "Appliance Repair", bookings: 32, revenue: 384000, averageRating: 4.8 },
      { serviceName: "Wiring & Maintenance", bookings: 28, revenue: 420000, averageRating: 4.7 },
      { serviceName: "Solar Installation", bookings: 15, revenue: 450000, averageRating: 5.0 },
    ],
    revenueByMonth: [
      { month: "Jan", revenue: 180000, bookings: 12 },
      { month: "Feb", revenue: 225000, bookings: 15 },
      { month: "Mar", revenue: 195000, bookings: 13 },
      { month: "Apr", revenue: 240000, bookings: 16 },
      { month: "May", revenue: 285000, bookings: 19 },
      { month: "Jun", revenue: 315000, bookings: 21 },
      { month: "Jul", revenue: 270000, bookings: 18 },
      { month: "Aug", revenue: 330000, bookings: 22 },
      { month: "Sep", revenue: 285000, bookings: 19 },
      { month: "Oct", revenue: 360000, bookings: 24 },
      { month: "Nov", revenue: 315000, bookings: 21 },
      { month: "Dec", revenue: 390000, bookings: 26 },
    ],
    ratingTrend: [
      { date: "2024-01", rating: 4.6, reviewCount: 8 },
      { date: "2024-02", rating: 4.7, reviewCount: 12 },
      { date: "2024-03", rating: 4.8, reviewCount: 10 },
      { date: "2024-04", rating: 4.8, reviewCount: 14 },
      { date: "2024-05", rating: 4.9, reviewCount: 16 },
      { date: "2024-06", rating: 4.9, reviewCount: 18 },
    ],
    bookingsByDay: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, "0")}`,
      bookings: Math.floor(Math.random() * 5) + 1,
      revenue: (Math.floor(Math.random() * 50) + 10) * 1000,
    })),
    customerFeedback: {
      totalReviews: 127,
      averageRating: 4.9,
      ratingDistribution: {
        5: 89,
        4: 28,
        3: 7,
        2: 2,
        1: 1,
      },
      commonPraises: [
        "Excellent workmanship",
        "Very professional",
        "Quick response time",
        "Fair pricing",
        "Clean work area",
      ],
      commonComplaints: ["Slightly delayed arrival", "Could improve communication"],
    },
    performanceScore: 94.5,
  }
}

export function calculateComparisonMetrics(
  current: ProviderAnalytics,
  previous: ProviderAnalytics,
): ComparisonMetrics[] {
  return [
    {
      metric: "Total Bookings",
      currentValue: current.totalBookings,
      previousValue: previous.totalBookings,
      change: ((current.totalBookings - previous.totalBookings) / previous.totalBookings) * 100,
      changeType: current.totalBookings > previous.totalBookings ? "increase" : "decrease",
    },
    {
      metric: "Revenue",
      currentValue: current.totalRevenue,
      previousValue: previous.totalRevenue,
      change: ((current.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100,
      changeType: current.totalRevenue > previous.totalRevenue ? "increase" : "decrease",
    },
    {
      metric: "Completion Rate",
      currentValue: current.completionRate,
      previousValue: previous.completionRate,
      change: current.completionRate - previous.completionRate,
      changeType: current.completionRate > previous.completionRate ? "increase" : "decrease",
    },
    {
      metric: "Average Rating",
      currentValue: current.averageRating,
      previousValue: previous.averageRating,
      change: current.averageRating - previous.averageRating,
      changeType: current.averageRating > previous.averageRating ? "increase" : "decrease",
    },
  ]
}

export function exportAnalyticsData(analytics: ProviderAnalytics, format: "csv" | "pdf" | "excel") {
  // Mock export functionality
  console.log(`Exporting analytics data in ${format} format...`)

  if (format === "csv") {
    const csvData = [
      ["Metric", "Value"],
      ["Total Bookings", analytics.totalBookings],
      ["Completed Jobs", analytics.completedJobs],
      ["Total Revenue (CFA)", analytics.totalRevenue],
      ["Average Rating", analytics.averageRating],
      ["Completion Rate (%)", analytics.completionRate],
      ["Customer Retention (%)", analytics.customerRetention],
      ["Performance Score", analytics.performanceScore],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `provider-${analytics.providerId}-analytics.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
