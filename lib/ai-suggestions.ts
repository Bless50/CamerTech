// AI-powered URL analysis and content suggestion engine
export interface ContentSuggestion {
  type: "technician" | "service" | "page" | "booking" | "help"
  title: string
  description: string
  url: string
  confidence: number
  icon?: string
  metadata?: Record<string, any>
}

export interface URLAnalysis {
  originalUrl: string
  pathSegments: string[]
  queryParams: Record<string, string>
  detectedIntent: string
  keywords: string[]
  suggestions: ContentSuggestion[]
}

// Common URL patterns and their mappings
const URL_PATTERNS = {
  // Service-related patterns
  services: {
    electrical: ["electric", "electrician", "wiring", "power", "voltage", "circuit"],
    plumbing: ["plumb", "pipe", "water", "leak", "drain", "toilet", "sink"],
    carpentry: ["carpenter", "wood", "furniture", "cabinet", "door", "window"],
    ac: ["ac", "air-conditioning", "hvac", "cooling", "heating", "aircon"],
    general: ["repair", "fix", "maintenance", "handyman", "general"],
  },

  // User-related patterns
  users: {
    technician: ["technician", "tech", "worker", "professional", "expert"],
    customer: ["customer", "client", "user", "account", "profile"],
  },

  // Action-related patterns
  actions: {
    book: ["book", "schedule", "appointment", "reserve", "hire"],
    search: ["search", "find", "locate", "browse", "discover"],
    login: ["login", "signin", "auth", "authenticate"],
    register: ["register", "signup", "join", "create-account"],
  },

  // Location-related patterns
  locations: {
    lagos: ["lagos", "victoria-island", "ikoyi", "lekki"],
    accra: ["accra", "ghana", "kumasi"],
    nairobi: ["nairobi", "kenya", "mombasa"],
  },
}

// Mock database of available content
const AVAILABLE_CONTENT = {
  technicians: [
    {
      id: 1,
      name: "John Okafor",
      specialty: "Electrical Engineer",
      location: "Lagos, Nigeria",
      rating: 4.9,
      keywords: ["electrical", "wiring", "power", "lagos"],
    },
    {
      id: 2,
      name: "Sarah Mensah",
      specialty: "Plumbing Specialist",
      location: "Accra, Ghana",
      rating: 4.8,
      keywords: ["plumbing", "pipes", "water", "accra"],
    },
    {
      id: 3,
      name: "David Mwangi",
      specialty: "AC Technician",
      location: "Nairobi, Kenya",
      rating: 4.7,
      keywords: ["ac", "hvac", "cooling", "nairobi"],
    },
  ],

  services: [
    {
      id: 1,
      name: "Electrical Repairs",
      category: "electrical",
      description: "Professional electrical repair and installation services",
      keywords: ["electrical", "repair", "wiring", "power"],
    },
    {
      id: 2,
      name: "Plumbing Services",
      category: "plumbing",
      description: "Complete plumbing solutions for homes and offices",
      keywords: ["plumbing", "pipes", "water", "leak"],
    },
    {
      id: 3,
      name: "AC Installation & Repair",
      category: "ac",
      description: "Air conditioning installation, repair, and maintenance",
      keywords: ["ac", "air-conditioning", "cooling", "hvac"],
    },
  ],

  pages: [
    {
      id: 1,
      title: "How It Works",
      url: "/how-it-works",
      description: "Learn how TechConnect helps you find reliable technicians",
      keywords: ["how", "works", "process", "guide"],
    },
    {
      id: 2,
      title: "About Us",
      url: "/about",
      description: "Learn more about TechConnect and our mission",
      keywords: ["about", "company", "mission", "story"],
    },
    {
      id: 3,
      title: "Contact Support",
      url: "/contact",
      description: "Get help from our customer support team",
      keywords: ["contact", "support", "help", "assistance"],
    },
  ],
}

export function analyzeURL(url: string): URLAnalysis {
  // Parse the URL
  const urlObj = new URL(url, "https://techconnect.com")
  const pathSegments = urlObj.pathname.split("/").filter((segment) => segment.length > 0)
  const queryParams = Object.fromEntries(urlObj.searchParams.entries())

  // Extract keywords from path and query
  const allText = [...pathSegments, ...Object.values(queryParams)].join(" ").toLowerCase()
  const keywords = extractKeywords(allText)

  // Detect intent
  const detectedIntent = detectIntent(keywords, pathSegments)

  // Generate suggestions
  const suggestions = generateSuggestions(keywords, detectedIntent, pathSegments)

  return {
    originalUrl: url,
    pathSegments,
    queryParams,
    detectedIntent,
    keywords,
    suggestions,
  }
}

function extractKeywords(text: string): string[] {
  // Remove common words and extract meaningful keywords
  const commonWords = ["the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "a", "an"]
  const words = text
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((word) => word.length > 2 && !commonWords.includes(word.toLowerCase()))
    .map((word) => word.toLowerCase())

  return [...new Set(words)] // Remove duplicates
}

function detectIntent(keywords: string[], pathSegments: string[]): string {
  // Analyze keywords and path to determine user intent
  const firstSegment = pathSegments[0]?.toLowerCase()

  // Check for specific intents
  if (keywords.some((k) => URL_PATTERNS.actions.book.includes(k)) || firstSegment === "book") {
    return "booking"
  }

  if (keywords.some((k) => URL_PATTERNS.actions.search.includes(k)) || firstSegment === "search") {
    return "search"
  }

  if (keywords.some((k) => URL_PATTERNS.users.technician.includes(k)) || firstSegment === "technicians") {
    return "find_technician"
  }

  if (
    Object.values(URL_PATTERNS.services)
      .flat()
      .some((pattern) => keywords.some((k) => k.includes(pattern) || pattern.includes(k)))
  ) {
    return "service_request"
  }

  if (keywords.some((k) => URL_PATTERNS.actions.login.includes(k)) || firstSegment === "login") {
    return "authentication"
  }

  if (keywords.some((k) => URL_PATTERNS.actions.register.includes(k)) || firstSegment === "register") {
    return "registration"
  }

  return "general_browsing"
}

function generateSuggestions(keywords: string[], intent: string, pathSegments: string[]): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = []

  // Generate suggestions based on intent
  switch (intent) {
    case "service_request":
      suggestions.push(...generateServiceSuggestions(keywords))
      suggestions.push(...generateTechnicianSuggestions(keywords))
      break

    case "find_technician":
      suggestions.push(...generateTechnicianSuggestions(keywords))
      suggestions.push(...generateServiceSuggestions(keywords))
      break

    case "booking":
      suggestions.push({
        type: "booking",
        title: "Book a Service",
        description: "Start booking a service with our verified technicians",
        url: "/book-service",
        confidence: 0.9,
        icon: "Calendar",
      })
      suggestions.push(...generateServiceSuggestions(keywords))
      break

    case "authentication":
      suggestions.push({
        type: "page",
        title: "Sign In",
        description: "Access your TechConnect account",
        url: "/login",
        confidence: 0.95,
        icon: "LogIn",
      })
      break

    case "registration":
      suggestions.push({
        type: "page",
        title: "Create Account",
        description: "Join TechConnect as a customer or technician",
        url: "/register",
        confidence: 0.95,
        icon: "UserPlus",
      })
      break

    default:
      suggestions.push(...generateGeneralSuggestions(keywords))
  }

  // Add location-specific suggestions
  suggestions.push(...generateLocationSuggestions(keywords))

  // Add help suggestions if keywords suggest confusion
  if (keywords.some((k) => ["help", "support", "problem", "issue", "error"].includes(k))) {
    suggestions.push({
      type: "help",
      title: "Contact Support",
      description: "Get help from our customer support team",
      url: "/contact",
      confidence: 0.8,
      icon: "HelpCircle",
    })
  }

  // Sort by confidence and return top suggestions
  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 6)
}

function generateServiceSuggestions(keywords: string[]): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = []

  AVAILABLE_CONTENT.services.forEach((service) => {
    const matchScore = calculateMatchScore(keywords, service.keywords)
    if (matchScore > 0.3) {
      suggestions.push({
        type: "service",
        title: service.name,
        description: service.description,
        url: `/services/${service.category}`,
        confidence: matchScore,
        icon: getServiceIcon(service.category),
        metadata: { category: service.category },
      })
    }
  })

  return suggestions
}

function generateTechnicianSuggestions(keywords: string[]): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = []

  AVAILABLE_CONTENT.technicians.forEach((technician) => {
    const matchScore = calculateMatchScore(keywords, technician.keywords)
    if (matchScore > 0.2) {
      suggestions.push({
        type: "technician",
        title: technician.name,
        description: `${technician.specialty} in ${technician.location}`,
        url: `/technicians/${technician.id}`,
        confidence: matchScore,
        icon: "User",
        metadata: {
          specialty: technician.specialty,
          location: technician.location,
          rating: technician.rating,
        },
      })
    }
  })

  return suggestions
}

function generateLocationSuggestions(keywords: string[]): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = []

  Object.entries(URL_PATTERNS.locations).forEach(([location, patterns]) => {
    if (patterns.some((pattern) => keywords.some((k) => k.includes(pattern)))) {
      suggestions.push({
        type: "service",
        title: `Technicians in ${location.charAt(0).toUpperCase() + location.slice(1)}`,
        description: `Find verified technicians in ${location}`,
        url: `/technicians?location=${location}`,
        confidence: 0.7,
        icon: "MapPin",
      })
    }
  })

  return suggestions
}

function generateGeneralSuggestions(keywords: string[]): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = []

  AVAILABLE_CONTENT.pages.forEach((page) => {
    const matchScore = calculateMatchScore(keywords, page.keywords)
    if (matchScore > 0.2) {
      suggestions.push({
        type: "page",
        title: page.title,
        description: page.description,
        url: page.url,
        confidence: matchScore,
        icon: "FileText",
      })
    }
  })

  // Always include popular pages
  suggestions.push({
    type: "service",
    title: "Browse All Services",
    description: "Explore all available services and technicians",
    url: "/services",
    confidence: 0.6,
    icon: "Grid",
  })

  return suggestions
}

function calculateMatchScore(keywords: string[], targetKeywords: string[]): number {
  if (keywords.length === 0 || targetKeywords.length === 0) return 0

  let matches = 0
  let totalWeight = 0

  keywords.forEach((keyword) => {
    targetKeywords.forEach((target) => {
      const similarity = calculateStringSimilarity(keyword, target)
      if (similarity > 0.6) {
        matches += similarity
      }
      totalWeight += 1
    })
  })

  return totalWeight > 0 ? matches / totalWeight : 0
}

function calculateStringSimilarity(str1: string, str2: string): number {
  // Simple similarity calculation using Levenshtein distance
  if (str1 === str2) return 1
  if (str1.includes(str2) || str2.includes(str1)) return 0.8

  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1

  const distance = levenshteinDistance(longer, shorter)
  return (longer.length - distance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}

function getServiceIcon(category: string): string {
  const iconMap: Record<string, string> = {
    electrical: "Zap",
    plumbing: "Droplets",
    carpentry: "Hammer",
    ac: "Wind",
    general: "Wrench",
  }
  return iconMap[category] || "Tool"
}

// Hook for using AI suggestions in React components
export function useAISuggestions(url: string) {
  const analysis = analyzeURL(url)
  return {
    suggestions: analysis.suggestions,
    intent: analysis.detectedIntent,
    keywords: analysis.keywords,
    confidence: analysis.suggestions[0]?.confidence || 0,
  }
}
