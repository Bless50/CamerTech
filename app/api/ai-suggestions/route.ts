import { type NextRequest, NextResponse } from "next/server"
import { analyzeURL } from "@/lib/ai-suggestions"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Perform AI analysis
    const analysis = analyzeURL(url)

    // Log for analytics (in production, you'd send this to your analytics service)
    console.log("404 Analysis:", {
      url,
      intent: analysis.detectedIntent,
      keywords: analysis.keywords,
      suggestionsCount: analysis.suggestions.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Error in AI suggestions API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const analysis = analyzeURL(url)
    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Error in AI suggestions API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
