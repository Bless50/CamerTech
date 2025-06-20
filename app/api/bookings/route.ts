import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token?.sub) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { customerId: token.sub },
          { technicianId: token.sub },
        ],
      },
      include: {
        customer: true,
        technician: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token?.sub) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { technicianId, date, notes, service } = body;
    if (!technicianId || !date || !service) {
      return NextResponse.json(
        { error: "technicianId, date, and service are required" },
        { status: 400 }
      );
    }
    const booking = await prisma.booking.create({
      data: {
        customerId: token.sub,
        technicianId,
        date: new Date(date),
        notes,
        service,
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
