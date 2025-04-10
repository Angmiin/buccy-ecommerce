import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"

// GET all products with optional filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const collection = searchParams.get("collection")
    const gender = searchParams.get("gender")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sort = searchParams.get("sort") || "featured"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    // Build query
    const query: any = {}

    if (category) query.category = category
    if (collection) query.collection = collection
    if (gender) query.gender = gender

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.price.$lte = Number.parseInt(maxPrice)
    }

    // Build sort
    const sortOptions: any = {}
    switch (sort) {
      case "newest":
        sortOptions.createdAt = -1
        break
      case "price-asc":
        sortOptions.price = 1
        break
      case "price-desc":
        sortOptions.price = -1
        break
      case "featured":
      default:
        sortOptions.featured = -1
        break
    }

    const client = await clientPromise
    const db = client.db("bucci")

    // Get total count for pagination
    const total = await db.collection("products").countDocuments(query)

    // Get products
    const products = await db
      .collection("products")
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

// POST a new product (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productData = await req.json()

    // Validate required fields
    const requiredFields = ["name", "price", "category"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db("bucci")

    // Add timestamps
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("products").insertOne(newProduct)

    return NextResponse.json(
      {
        message: "Product created successfully",
        productId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

