"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, X, Filter, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FAQItem {
  id: string
  category: "customer" | "provider" | "general"
  question: string
  answer: string
  keywords: string[]
}

const faqData: FAQItem[] = [
  // Customer FAQs
  {
    id: "customer-1",
    category: "customer",
    question: "How do I know if a technician is qualified?",
    answer:
      "All technicians on our platform undergo thorough verification including background checks, skill assessments, and identity confirmation. You can view their certifications, ratings from previous customers, and detailed reviews on their profile page.",
    keywords: ["qualified", "verification", "background check", "certified", "skills", "ratings", "reviews", "trust"],
  },
  {
    id: "customer-2",
    category: "customer",
    question: "What if I'm not satisfied with the service?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours. We'll work with the technician to resolve the issue or provide a full refund if necessary.",
    keywords: ["satisfaction", "guarantee", "refund", "unhappy", "complaint", "support", "resolve", "money back"],
  },
  {
    id: "customer-3",
    category: "customer",
    question: "How much does it cost to use TechConnect?",
    answer:
      "There are no fees for customers to use TechConnect. You only pay the service price quoted by the technician. There are no booking fees, platform fees, or hidden charges. Cancellations are free with 24 hours notice.",
    keywords: ["cost", "price", "fees", "free", "booking fee", "hidden charges", "cancellation", "payment"],
  },
  {
    id: "customer-4",
    category: "customer",
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking free of charge up to 24 hours before the scheduled time. For cancellations within 24 hours, a small fee may apply depending on the technician's policy.",
    keywords: ["cancel", "reschedule", "change", "booking", "appointment", "free", "24 hours", "policy"],
  },
  {
    id: "customer-5",
    category: "customer",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, mobile money (M-Pesa, Orange Money), and bank transfers. All payments are processed securely through our encrypted platform with PCI compliance.",
    keywords: [
      "payment",
      "credit card",
      "debit card",
      "mobile money",
      "mpesa",
      "orange money",
      "bank transfer",
      "secure",
      "encrypted",
    ],
  },
  {
    id: "customer-6",
    category: "customer",
    question: "How quickly can I get a technician?",
    answer:
      "Response times vary by location and service type. For urgent repairs, many technicians can respond within 2-4 hours. For scheduled maintenance, you can book up to 30 days in advance. Emergency services are available 24/7 in major cities.",
    keywords: ["quick", "fast", "urgent", "emergency", "response time", "availability", "schedule", "same day"],
  },
  {
    id: "customer-7",
    category: "customer",
    question: "Is my personal information safe?",
    answer:
      "Absolutely. We use bank-level encryption to protect your personal and payment information. Your data is never shared with third parties without your consent, and all technicians sign confidentiality agreements.",
    keywords: [
      "safe",
      "secure",
      "privacy",
      "personal information",
      "data protection",
      "encryption",
      "confidential",
      "third party",
    ],
  },

  // Provider FAQs
  {
    id: "provider-1",
    category: "provider",
    question: "How do I get started as a service provider?",
    answer:
      "Sign up with your professional details, upload your certifications and ID documents, complete our skills assessment, and wait for verification (usually 2-3 business days). Once approved, you can start receiving booking requests immediately.",
    keywords: [
      "get started",
      "sign up",
      "registration",
      "certification",
      "verification",
      "skills assessment",
      "approval",
      "provider",
    ],
  },
  {
    id: "provider-2",
    category: "provider",
    question: "How much can I earn on TechConnect?",
    answer:
      "Earnings vary by skill level, location, and demand. Our top technicians earn 50,000-200,000 CFA per month. You keep 90% of your service fees, with only a 10% platform fee. There are no monthly fees or hidden charges.",
    keywords: ["earn", "income", "salary", "money", "CFA", "commission", "platform fee", "90%", "monthly", "earnings"],
  },
  {
    id: "provider-3",
    category: "provider",
    question: "When and how do I get paid?",
    answer:
      "Payments are released within 24 hours of job completion and customer confirmation. You can withdraw earnings to your bank account or mobile money wallet. There's no minimum withdrawal amount, and transfers are free.",
    keywords: [
      "payment",
      "paid",
      "withdraw",
      "bank account",
      "mobile money",
      "transfer",
      "24 hours",
      "minimum",
      "free",
    ],
  },
  {
    id: "provider-4",
    category: "provider",
    question: "Can I set my own prices and schedule?",
    answer:
      "Yes, you have complete control over your pricing and availability. Set your hourly rates, define your service areas, and choose when you're available to work. You can also offer package deals and seasonal pricing.",
    keywords: [
      "prices",
      "pricing",
      "schedule",
      "availability",
      "hourly rates",
      "control",
      "flexible",
      "package deals",
      "seasonal",
    ],
  },
  {
    id: "provider-5",
    category: "provider",
    question: "What if a customer doesn't pay or disputes the service?",
    answer:
      "All payments are held securely until job completion. If there's a dispute, our support team mediates fairly. We have a comprehensive dispute resolution process and provider protection policies to ensure you're paid for legitimate work.",
    keywords: [
      "dispute",
      "payment protection",
      "customer dispute",
      "mediation",
      "resolution",
      "support",
      "legitimate work",
      "secure payment",
    ],
  },
  {
    id: "provider-6",
    category: "provider",
    question: "Do I need insurance to work on TechConnect?",
    answer:
      "While not mandatory, we strongly recommend having professional liability insurance. We provide basic coverage for all verified technicians, but additional insurance protects you better. We can help connect you with affordable insurance providers.",
    keywords: [
      "insurance",
      "liability",
      "coverage",
      "protection",
      "mandatory",
      "recommended",
      "affordable",
      "professional",
    ],
  },
  {
    id: "provider-7",
    category: "provider",
    question: "How do I improve my ranking and get more bookings?",
    answer:
      "Maintain high ratings by providing excellent service, respond quickly to booking requests, keep your profile updated with recent work photos, and complete our skills certifications. Active, highly-rated providers get priority in search results.",
    keywords: [
      "ranking",
      "more bookings",
      "ratings",
      "excellent service",
      "respond quickly",
      "profile",
      "certifications",
      "priority",
      "search results",
    ],
  },

  // General FAQs
  {
    id: "general-1",
    category: "general",
    question: "Is TechConnect available in my area?",
    answer:
      "TechConnect is currently available in major cities across West Africa including Lagos, Accra, Abidjan, and Dakar. We're rapidly expanding to new cities. Check our coverage map or enter your location to see available services in your area.",
    keywords: [
      "available",
      "area",
      "location",
      "coverage",
      "Lagos",
      "Accra",
      "Abidjan",
      "Dakar",
      "West Africa",
      "expanding",
      "cities",
    ],
  },
  {
    id: "general-2",
    category: "general",
    question: "What safety measures are in place?",
    answer:
      "All technicians undergo background checks and identity verification. We provide real-time tracking, secure messaging, and 24/7 support. Emergency contacts are notified for high-risk jobs, and we maintain comprehensive insurance coverage for all platform activities.",
    keywords: [
      "safety",
      "security",
      "background checks",
      "tracking",
      "messaging",
      "24/7 support",
      "emergency",
      "insurance",
      "protection",
    ],
  },
  {
    id: "general-3",
    category: "general",
    question: "How do I contact customer support?",
    answer:
      "Our support team is available 24/7 through live chat, phone (+234-XXX-XXXX), email (support@techconnect.com), or WhatsApp. For urgent issues during active bookings, use the emergency contact feature in the app for immediate assistance.",
    keywords: ["contact", "support", "help", "chat", "phone", "email", "whatsapp", "24/7", "emergency", "assistance"],
  },
  {
    id: "general-4",
    category: "general",
    question: "Can I use TechConnect for business or commercial services?",
    answer:
      "Yes! We offer TechConnect Business with features like bulk booking, priority support, invoicing, and dedicated account management. Many businesses use our platform for office maintenance, equipment repairs, and facility management.",
    keywords: [
      "business",
      "commercial",
      "bulk booking",
      "priority support",
      "invoicing",
      "account management",
      "office",
      "equipment",
      "facility",
    ],
  },
]

const categoryLabels = {
  customer: "For Customers",
  provider: "For Service Providers",
  general: "General Questions",
}

const categoryColors = {
  customer: "bg-blue-100 text-blue-800",
  provider: "bg-green-100 text-green-800",
  general: "bg-purple-100 text-purple-800",
}

interface FAQSearchProps {
  className?: string
}

export default function FAQSearch({ className }: FAQSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["customer", "provider", "general"])
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Filter and search FAQs
  const filteredFAQs = useMemo(() => {
    let filtered = faqData.filter((faq) => selectedCategories.includes(faq.category))

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((faq) => {
        const searchableText = `${faq.question} ${faq.answer} ${faq.keywords.join(" ")}`.toLowerCase()
        return searchableText.includes(query)
      })
    }

    return filtered
  }, [searchQuery, selectedCategories])

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearSearch = () => {
    setSearchQuery("")
    setExpandedItems([])
  }

  const clearFilters = () => {
    setSelectedCategories(["customer", "provider", "general"])
    setSearchQuery("")
    setExpandedItems([])
  }

  // Auto-expand items when searching
  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      // Auto-expand first few results
      const matchingIds = filteredFAQs.slice(0, 3).map((faq) => faq.id)
      setExpandedItems(matchingIds)
    } else {
      setExpandedItems([])
    }
  }

  return (
    <div className={className}>
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FAQs... (e.g., 'payment methods', 'cancel booking', 'get paid')"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Categories ({selectedCategories.length})
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={selectedCategories.includes(key)}
                  onCheckedChange={() => handleCategoryToggle(key)}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategories.length < 3) && (
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{searchQuery}"
                <Button variant="ghost" size="sm" onClick={clearSearch} className="h-4 w-4 p-0 hover:bg-transparent">
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCategories.length < 3 && (
              <Badge variant="outline" className="flex items-center gap-1">
                Filtered Categories ({selectedCategories.length}/3)
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {searchQuery ? (
            <span>
              Found <strong>{filteredFAQs.length}</strong> result{filteredFAQs.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          ) : (
            <span>
              Showing <strong>{filteredFAQs.length}</strong> frequently asked questions
            </span>
          )}
        </div>
      </div>

      {/* Search Results */}
      {filteredFAQs.length > 0 ? (
        <div className="space-y-6">
          {/* Group by category */}
          {Object.entries(categoryLabels).map(([categoryKey, categoryLabel]) => {
            const categoryFAQs = filteredFAQs.filter((faq) => faq.category === categoryKey)

            if (categoryFAQs.length === 0) return null

            return (
              <div key={categoryKey}>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={categoryColors[categoryKey as keyof typeof categoryColors]}>{categoryLabel}</Badge>
                  <span className="text-sm text-gray-500">
                    ({categoryFAQs.length} question{categoryFAQs.length !== 1 ? "s" : ""})
                  </span>
                </div>

                <Accordion
                  type="multiple"
                  value={expandedItems.filter((id) => categoryFAQs.some((faq) => faq.id === id))}
                  onValueChange={setExpandedItems}
                  className="space-y-2"
                >
                  {categoryFAQs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border rounded-lg px-4 hover:border-blue-200 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {highlightText(faq.question, searchQuery)}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {highlightText(faq.answer, searchQuery)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
          })}
        </div>
      ) : (
        /* No Results */
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery
              ? `We couldn't find any FAQs matching "${searchQuery}". Try different keywords or check your spelling.`
              : "No FAQs match your current filters."}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!searchQuery && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Search Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Try keywords like "payment", "cancel", "qualified", "earn money"</li>
            <li>• Use specific terms like "M-Pesa", "background check", "24 hours"</li>
            <li>• Search works on both questions and answers</li>
            <li>• Filter by category to narrow down results</li>
          </ul>
        </div>
      )}
    </div>
  )
}
