"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp } from "lucide-react"

interface SmartSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SmartSearch({ onSearch, placeholder = "Search...", className = "" }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Smart suggestions based on common 404 patterns
  const smartSuggestions = [
    "electrical repair near me",
    "plumbing services Lagos",
    "AC technician booking",
    "carpenter for furniture",
    "emergency electrician",
    "water leak repair",
    "door installation service",
  ]

  // Popular searches (would come from analytics in production)
  const popularSearches = ["electrical repair", "plumbing service", "AC maintenance", "carpentry work"]

  useEffect(() => {
    if (query.length > 2) {
      setIsAnalyzing(true)
      // Simulate AI analysis delay
      const timer = setTimeout(() => {
        const filtered = smartSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
        setSuggestions(filtered.slice(0, 5))
        setIsAnalyzing(false)
        setShowSuggestions(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setIsAnalyzing(false)
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="h-12 text-lg pr-10"
          />
          {isAnalyzing && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            </div>
          )}
        </div>
        <Button type="submit" size="lg" className="h-12 px-8">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </form>

      {/* Smart Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || query.length <= 2) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-purple-200 shadow-lg">
          <CardContent className="p-4">
            {suggestions.length > 0 ? (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-2 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 border-blue-200"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
