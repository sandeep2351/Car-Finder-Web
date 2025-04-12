import { NextResponse } from "next/server"
import { cars } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const car = cars.find((car) => car.id === id)

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 })
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(car)
}
