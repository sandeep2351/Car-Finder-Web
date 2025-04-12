import { NextResponse } from "next/server";
import { cars } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const brand = searchParams.get("brand") ?? "all";
  const minPrice = Number(searchParams.get("minPrice")) || undefined;
  const maxPrice = Number(searchParams.get("maxPrice")) || undefined;
  const fuelType = searchParams.get("fuelType") ?? "all";
  const seatingCapacity = Number(searchParams.get("seatingCapacity")) || undefined;
  const sortBy = searchParams.get("sortBy");
  const page = Number(searchParams.get("page")) || 1;
  const limit = 9;

  let filteredCars = [...cars];

  // Apply filters
  if (brand !== "all") {
    filteredCars = filteredCars.filter((car) =>
      car.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (minPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price <= maxPrice);
  }

  if (fuelType !== "all") {
    filteredCars = filteredCars.filter((car) =>
      car.fuelType.toLowerCase() === fuelType.toLowerCase()
    );
  }

  if (seatingCapacity && seatingCapacity !== 0) {
    filteredCars = filteredCars.filter(
      (car) => car.seatingCapacity === seatingCapacity
    );
  }

  // Apply sorting
  switch (sortBy) {
    case "price-asc":
      filteredCars.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredCars.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      filteredCars.sort((a, b) => b.year - a.year);
      break;
    case "name-asc":
      filteredCars.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  // Pagination
  const totalCars = filteredCars.length;
  const totalPages = Math.ceil(totalCars / limit);
  const offset = (page - 1) * limit;
  const paginatedCars = filteredCars.slice(offset, offset + limit);

  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    cars: paginatedCars,
    pagination: {
      total: totalCars,
      page,
      limit,
      totalPages,
    },
  });
}
