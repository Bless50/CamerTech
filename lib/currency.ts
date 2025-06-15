// Currency utilities for CFA Franc support
export interface CurrencyConfig {
  code: string
  symbol: string
  name: string
  locale: string
  exchangeRate: number // Rate to USD for conversion
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  CFA: {
    code: "XOF",
    symbol: "CFA",
    name: "West African CFA Franc",
    locale: "fr-SN", // Senegal locale for proper formatting
    exchangeRate: 0.0017, // 1 CFA = 0.0017 USD (approximate)
  },
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    locale: "en-NG",
    exchangeRate: 0.0013, // 1 NGN = 0.0013 USD (approximate)
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    locale: "en-US",
    exchangeRate: 1,
  },
}

export const DEFAULT_CURRENCY = "CFA"

export function formatCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  options: Intl.NumberFormatOptions = {},
): string {
  const currency = CURRENCIES[currencyCode]
  if (!currency) {
    throw new Error(`Unsupported currency: ${currencyCode}`)
  }

  // For CFA, we'll use a custom format since it's typically written as "1,000 CFA"
  if (currencyCode === "CFA") {
    const formatted = new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options,
    }).format(amount)
    return `${formatted} ${currency.symbol}`
  }

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    ...options,
  }).format(amount)
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  const from = CURRENCIES[fromCurrency]
  const to = CURRENCIES[toCurrency]

  if (!from || !to) {
    throw new Error("Invalid currency codes")
  }

  // Convert to USD first, then to target currency
  const usdAmount = amount * from.exchangeRate
  return usdAmount / to.exchangeRate
}

export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCIES[currencyCode]?.symbol || currencyCode
}

export function parseCurrencyInput(input: string, currencyCode: string = DEFAULT_CURRENCY): number {
  // Remove currency symbols and spaces, then parse
  const cleaned = input.replace(/[^\d.,]/g, "").replace(",", ".")
  return Number.parseFloat(cleaned) || 0
}
