export interface IndustryBenchmark {
  category: string
  metric: string
  excellent: number
  good: number
  average: number
  belowAverage: number
  unit: string
  description: string
}

export interface PlatformBenchmark {
  metric: string
  platformAverage: number
  topPerformer: number
  bottomPerformer: number
  median: number
  unit: string
  trend: "up" | "down" | "stable"
  trendValue: number
}

export interface ComparisonData {
  providerId: number
  providerName: string
  metrics: {
    [key: string]: {
      value: number
      percentile: number
      benchmark: "excellent" | "good" | "average" | "below_average"
      industryComparison: number
      platformComparison: number
    }
  }
}

// Industry benchmarks for different service categories
export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    category: "General",
    metric: "Response Time",
    excellent: 15,
    good: 30,
    average: 60,
    belowAverage: 120,
    unit: "minutes",
    description: "Time to respond to customer inquiries",
  },
  {
    category: "General",
    metric: "Completion Rate",
    excellent: 95,
    good: 90,
    average: 85,
    belowAverage: 80,
    unit: "%",
    description: "Percentage of jobs completed successfully",
  },
  {
    category: "General",
    metric: "Customer Rating",
    excellent: 4.8,
    good: 4.5,
    average: 4.2,
    belowAverage: 4.0,
    unit: "stars",
    description: "Average customer satisfaction rating",
  },
  {
    category: "General",
    metric: "Customer Retention",
    excellent: 85,
    good: 75,
    average: 65,
    belowAverage: 55,
    unit: "%",
    description: "Percentage of repeat customers",
  },
  {
    category: "Electrical",
    metric: "Hourly Rate",
    excellent: 8000,
    good: 6000,
    average: 4500,
    belowAverage: 3000,
    unit: "CFA",
    description: "Average hourly rate for electrical services",
  },
  {
    category: "Plumbing",
    metric: "Hourly Rate",
    excellent: 7000,
    good: 5500,
    average: 4000,
    belowAverage: 2500,
    unit: "CFA",
    description: "Average hourly rate for plumbing services",
  },
  {
    category: "HVAC",
    metric: "Hourly Rate",
    excellent: 9000,
    good: 7000,
    average: 5500,
    belowAverage: 4000,
    unit: "CFA",
    description: "Average hourly rate for HVAC services",
  },
  {
    category: "General",
    metric: "Monthly Revenue",
    excellent: 500000,
    good: 350000,
    average: 200000,
    belowAverage: 100000,
    unit: "CFA",
    description: "Average monthly revenue per provider",
  },
  {
    category: "General",
    metric: "Jobs per Month",
    excellent: 25,
    good: 18,
    average: 12,
    belowAverage: 8,
    unit: "jobs",
    description: "Average number of jobs completed per month",
  },
]

// Platform benchmarks (calculated from all providers)
export const PLATFORM_BENCHMARKS: PlatformBenchmark[] = [
  {
    metric: "Response Time",
    platformAverage: 22.5,
    topPerformer: 8,
    bottomPerformer: 45,
    median: 20,
    unit: "minutes",
    trend: "down",
    trendValue: 5.2,
  },
  {
    metric: "Completion Rate",
    platformAverage: 91.2,
    topPerformer: 98.5,
    bottomPerformer: 78.3,
    median: 92.1,
    unit: "%",
    trend: "up",
    trendValue: 2.1,
  },
  {
    metric: "Customer Rating",
    platformAverage: 4.6,
    topPerformer: 5.0,
    bottomPerformer: 3.8,
    median: 4.7,
    unit: "stars",
    trend: "up",
    trendValue: 0.1,
  },
  {
    metric: "Customer Retention",
    platformAverage: 72.8,
    topPerformer: 95.2,
    bottomPerformer: 45.1,
    median: 74.5,
    unit: "%",
    trend: "stable",
    trendValue: 0.3,
  },
  {
    metric: "Monthly Revenue",
    platformAverage: 285000,
    topPerformer: 650000,
    bottomPerformer: 85000,
    median: 245000,
    unit: "CFA",
    trend: "up",
    trendValue: 8.7,
  },
  {
    metric: "Monthly Bookings",
    platformAverage: 16.3,
    topPerformer: 35,
    bottomPerformer: 4,
    median: 15,
    unit: "bookings",
    trend: "up",
    trendValue: 12.4,
  },
]

export function getBenchmarkLevel(
  value: number,
  metric: string,
  category = "General",
): {
  level: "excellent" | "good" | "average" | "below_average"
  color: string
  description: string
} {
  const benchmark = INDUSTRY_BENCHMARKS.find((b) => b.metric === metric && b.category === category)

  if (!benchmark) {
    return { level: "average", color: "gray", description: "No benchmark available" }
  }

  // For metrics where higher is better
  const higherIsBetter = [
    "Completion Rate",
    "Customer Rating",
    "Customer Retention",
    "Monthly Revenue",
    "Jobs per Month",
    "Hourly Rate",
  ]

  if (higherIsBetter.includes(metric)) {
    if (value >= benchmark.excellent)
      return { level: "excellent", color: "green", description: "Excellent performance" }
    if (value >= benchmark.good) return { level: "good", color: "blue", description: "Good performance" }
    if (value >= benchmark.average) return { level: "average", color: "yellow", description: "Average performance" }
    return { level: "below_average", color: "red", description: "Below average performance" }
  } else {
    // For metrics where lower is better (like Response Time)
    if (value <= benchmark.excellent)
      return { level: "excellent", color: "green", description: "Excellent performance" }
    if (value <= benchmark.good) return { level: "good", color: "blue", description: "Good performance" }
    if (value <= benchmark.average) return { level: "average", color: "yellow", description: "Average performance" }
    return { level: "below_average", color: "red", description: "Below average performance" }
  }
}

export function calculatePercentile(value: number, allValues: number[]): number {
  const sorted = allValues.sort((a, b) => a - b)
  const index = sorted.findIndex((v) => v >= value)
  return index === -1 ? 100 : (index / sorted.length) * 100
}

export function generateComparisonData(providers: any[]): ComparisonData[] {
  const allResponseTimes = providers.map((p) => p.responseTime)
  const allCompletionRates = providers.map((p) => p.completionRate)
  const allRatings = providers.map((p) => p.averageRating)
  const allRetentionRates = providers.map((p) => p.customerRetention)
  const allRevenues = providers.map((p) => p.totalRevenue)
  const allBookings = providers.map((p) => p.totalBookings)

  return providers.map((provider) => ({
    providerId: provider.id,
    providerName: provider.name,
    metrics: {
      "Response Time": {
        value: provider.responseTime,
        percentile: calculatePercentile(provider.responseTime, allResponseTimes),
        benchmark: getBenchmarkLevel(provider.responseTime, "Response Time").level,
        industryComparison: ((provider.responseTime - 30) / 30) * 100, // Compare to industry average of 30 min
        platformComparison: ((provider.responseTime - 22.5) / 22.5) * 100, // Compare to platform average
      },
      "Completion Rate": {
        value: provider.completionRate,
        percentile: calculatePercentile(provider.completionRate, allCompletionRates),
        benchmark: getBenchmarkLevel(provider.completionRate, "Completion Rate").level,
        industryComparison: ((provider.completionRate - 85) / 85) * 100,
        platformComparison: ((provider.completionRate - 91.2) / 91.2) * 100,
      },
      "Customer Rating": {
        value: provider.averageRating,
        percentile: calculatePercentile(provider.averageRating, allRatings),
        benchmark: getBenchmarkLevel(provider.averageRating, "Customer Rating").level,
        industryComparison: ((provider.averageRating - 4.2) / 4.2) * 100,
        platformComparison: ((provider.averageRating - 4.6) / 4.6) * 100,
      },
      "Customer Retention": {
        value: provider.customerRetention,
        percentile: calculatePercentile(provider.customerRetention, allRetentionRates),
        benchmark: getBenchmarkLevel(provider.customerRetention, "Customer Retention").level,
        industryComparison: ((provider.customerRetention - 65) / 65) * 100,
        platformComparison: ((provider.customerRetention - 72.8) / 72.8) * 100,
      },
      "Monthly Revenue": {
        value: provider.totalRevenue,
        percentile: calculatePercentile(provider.totalRevenue, allRevenues),
        benchmark: getBenchmarkLevel(provider.totalRevenue, "Monthly Revenue").level,
        industryComparison: ((provider.totalRevenue - 200000) / 200000) * 100,
        platformComparison: ((provider.totalRevenue - 285000) / 285000) * 100,
      },
      "Monthly Bookings": {
        value: provider.totalBookings,
        percentile: calculatePercentile(provider.totalBookings, allBookings),
        benchmark: getBenchmarkLevel(provider.totalBookings, "Jobs per Month").level,
        industryComparison: ((provider.totalBookings - 12) / 12) * 100,
        platformComparison: ((provider.totalBookings - 16.3) / 16.3) * 100,
      },
    },
  }))
}

export function getTopPerformers(comparisonData: ComparisonData[], metric: string, limit = 5) {
  return comparisonData
    .sort((a, b) => {
      const aValue = a.metrics[metric]?.value || 0
      const bValue = b.metrics[metric]?.value || 0

      // For response time, lower is better
      if (metric === "Response Time") {
        return aValue - bValue
      }
      // For other metrics, higher is better
      return bValue - aValue
    })
    .slice(0, limit)
}

export function getBottomPerformers(comparisonData: ComparisonData[], metric: string, limit = 5) {
  return comparisonData
    .sort((a, b) => {
      const aValue = a.metrics[metric]?.value || 0
      const bValue = b.metrics[metric]?.value || 0

      // For response time, higher is worse
      if (metric === "Response Time") {
        return bValue - aValue
      }
      // For other metrics, lower is worse
      return aValue - bValue
    })
    .slice(0, limit)
}
