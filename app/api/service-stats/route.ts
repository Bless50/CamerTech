import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SERVICE_CATEGORIES = [
  "electrical",
  "plumbing",
  "carpentry",
  "ac",
  "general"
];

export async function GET(request: NextRequest) {
  try {
    const counts: Record<string, number> = {};
    for (const service of SERVICE_CATEGORIES) {
      counts[service] = await prisma.technicianProfile.count({
        where: {
          services: { has: service }
        }
      });
    }
    return NextResponse.json(counts);
  } catch (error) {
    console.error("Error fetching service stats:", error);
    return NextResponse.json({ error: "Failed to fetch service stats" }, { status: 500 });
  }
} 