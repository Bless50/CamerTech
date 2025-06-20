import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // @ts-expect-error: getServerSession signature mismatch in App Router
    const session = await getServerSession(request, authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { customerId: session.user.id },
          { technicianId: session.user.id },
        ],
      },
      include: {
        customer: true,
        technician: true,
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // @ts-expect-error: getServerSession signature mismatch in App Router
    const session = await getServerSession(request, authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { technicianId, date, notes, service } = body

    if (!technicianId || !date || !service) {
      return NextResponse.json(
        { error: "technicianId, date, and service are required" },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: session.user.id,
        technicianId,
        date: new Date(date),
        notes,
        service,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}
