"use client"

import { useEffect, useState } from "react"

export function useClientUrl() {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  return url
}
