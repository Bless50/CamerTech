import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.user.count({
      where: {
        role: "TECHNICIAN",
        NOT: { technicianProfile: null },
      },
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching technician count:", error);
    return NextResponse.json({ error: "Failed to fetch technician count" }, { status: 500 });
  }
} 