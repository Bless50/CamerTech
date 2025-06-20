 import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.booking.count({
      where: {
        status: "COMPLETED",
      },
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching jobs completed count:", error);
    return NextResponse.json({ error: "Failed to fetch jobs completed count" }, { status: 500 });
  }
} 