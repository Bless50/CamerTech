import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const technicians = await prisma.user.findMany({
      where: {
        role: "TECHNICIAN",
      },
      include: {
        technicianProfile: true,
      },
    })

    return NextResponse.json(technicians)
  } catch (error) {
    console.error("Error fetching technicians:", error)
    return NextResponse.json(
      { error: "Failed to fetch technicians" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, specialty, experience, location, bio, password, services } = body

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        role: "TECHNICIAN",
      },
    })

    // Create technician profile
    const technicianProfile = await prisma.technicianProfile.create({
      data: {
        userId: user.id,
        bio,
        phone,
        location,
        services: services || (specialty ? [specialty] : []),
        // Optionally add experience, etc.
      },
    })

    return NextResponse.json({ user, technicianProfile })
  } catch (error) {
    console.error("Error creating technician:", error)
    return NextResponse.json(
      { error: "Failed to create technician account" },
      { status: 500 }
    )
  }
}
