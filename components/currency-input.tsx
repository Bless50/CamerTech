"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { parseCurrencyInput, getCurrencySymbol } from "@/lib/currency"

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  currency: string
  label?: string
  placeholder?: string
  className?: string
  error?: string
}

export function CurrencyInput({ value, onChange, currency, label, placeholder, className, error }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("")

  useEffect(() => {
    if (value > 0) {
      setDisplayValue(value.toString())
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)

    const numericValue = parseCurrencyInput(inputValue, currency)
    onChange(numericValue)
  }

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(value.toString())
    }
  }

  return (
    <div className={className}>
      {label && <Label className="text-sm font-medium mb-1 block">{label}</Label>}
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder || `0 ${getCurrencySymbol(currency)}`}
          className={`pr-16 ${error ? "border-red-500" : ""}`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {getCurrencySymbol(currency)}
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
