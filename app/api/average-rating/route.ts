import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const ratings = await prisma.booking.findMany({
      where: {
        status: "COMPLETED",
        rating: { not: null },
      },
      select: { rating: true },
    });
    const total = ratings.reduce((sum, b) => sum + (b.rating ?? 0), 0);
    const average = ratings.length ? total / ratings.length : 0;
    return NextResponse.json({ average });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return NextResponse.json({ error: "Failed to fetch average rating" }, { status: 500 });
  }
} 