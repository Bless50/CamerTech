"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Droplets,
  Hammer,
  Wind,
  Wrench,
  User,
  Calendar,
  MapPin,
  Star,
  FileText,
  Grid,
  HelpCircle,
  LogIn,
  UserPlus,
  Sparkles,
  Brain,
  Target,
} from "lucide-react"
import Link from "next/link"
import { analyzeURL, type ContentSuggestion } from "@/lib/ai-suggestions"

interface AISuggestionsProps {
  requestedUrl: string
  className?: string
}

const iconMap = {
  Zap,
  Droplets,
  Hammer,
  Wind,
  Wrench,
  User,
  Calendar,
  MapPin,
  Star,
  FileText,
  Grid,
  HelpCircle,
  LogIn,
  UserPlus,
  Tool: Wrench,
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.8) return "bg-green-100 text-green-800"
  if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800"
  return "bg-blue-100 text-blue-800"
}

const getConfidenceText = (confidence: number) => {
  if (confidence >= 0.8) return "High match"
  if (confidence >= 0.6) return "Good match"
  return "Possible match"
}

export function AISuggestions({ requestedUrl, className = "" }: AISuggestionsProps) {
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeURL> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const performAnalysis = async () => {
      setIsLoading(true)
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      try {
        const result = analyzeURL(requestedUrl)
        setAnalysis(result)
      } catch (error) {
        console.error("Error analyzing URL:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (requestedUrl) {
      performAnalysis()
    }
  }, [requestedUrl])

  if (isLoading) {
    return (
      <Card className={`border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">AI is analyzing your request...</h3>
              <p className="text-sm text-purple-700">Finding the best suggestions for you</p>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-purple-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis || analysis.suggestions.length === 0) {
    return null
  }

  return (
    <Card className={`border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-900">
          <Sparkles className="h-5 w-5" />
          <span>AI-Powered Suggestions</span>
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-purple-700">
          <Target className="h-4 w-4" />
          <span>
            Based on your request: <code className="bg-purple-100 px-2 py-1 rounded text-xs">{requestedUrl}</code>
          </span>
        </div>
        {analysis.detectedIntent !== "general_browsing" && (
          <Badge variant="secondary" className="w-fit bg-purple-100 text-purple-800">
            Detected intent: {analysis.detectedIntent.replace("_", " ")}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.suggestions.map((suggestion, index) => (
            <SuggestionCard key={index} suggestion={suggestion} />
          ))}
        </div>

        {analysis.keywords.length > 0 && (
          <div className="pt-4 border-t border-purple-200">
            <p className="text-sm text-purple-700 mb-2">Keywords detected:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.slice(0, 6).map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs border-purple-300 text-purple-700">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SuggestionCard({ suggestion }: { suggestion: ContentSuggestion }) {
  const IconComponent = iconMap[suggestion.icon as keyof typeof iconMap] || Wrench

  return (
    <Link href={suggestion.url}>
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer border-l-4 border-l-purple-400">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
              <IconComponent className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900 truncate">{suggestion.title}</h4>
                <Badge variant="secondary" className={`text-xs ml-2 ${getConfidenceColor(suggestion.confidence)}`}>
                  {Math.round(suggestion.confidence * 100)}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{suggestion.description}</p>

              {suggestion.metadata && (
                <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                  {suggestion.metadata.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{suggestion.metadata.rating}</span>
                    </div>
                  )}
                  {suggestion.metadata.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{suggestion.metadata.location}</span>
                    </div>
                  )}
                  {suggestion.metadata.category && (
                    <Badge variant="outline" className="text-xs">
                      {suggestion.metadata.category}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default AISuggestions
