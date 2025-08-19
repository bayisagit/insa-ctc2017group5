import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Helper function to get all products with important info
async function getAllProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      isAvailable: true,
      isFeatured: true,
      productType: true,
      store: {
        select: {
          id: true,
          name: true,
          logo: true,
          phone: true,
          email: true,
          isApproved: true,
          rating: {
            select: {
              storeScore: true,
              createdAt: true,
            },
            take: 5, // latest 5 ratings
            orderBy: { createdAt: "desc" },
          },
        },
      },
      variants: {
        select: {
          id: true,
          name: true,
          price: true,
          isAvailable: true,
          colors: true,
        },
      },
    },
  });

  return products;
}

// Helper function to get a single product by ID
async function getProductById(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      isAvailable: true,
      isFeatured: true,
      productType: true,
      store: {
        select: {
          id: true,
          name: true,
          logo: true,
          phone: true,
          email: true,
          organization :{
            select:{
              type:true
            }
          },
       
          isApproved: true,
          rating: {
            select: {
              storeScore: true,
              createdAt: true,
            },
            take: 5,
            orderBy: { createdAt: "desc" },
          },
        },
      },
      variants: {
        select: {
          id: true,
          name: true,
          price: true,
          isAvailable: true,
          colors: true,
        },
      },
    },
  });

  return product;
}

// Route handler
export async function GET(req: NextRequest) {
  try {
    // If no ID, return all products
    const products = await getAllProducts();
    return NextResponse.json({ data: products, message: "Products fetched successfully" });
  } catch (error) {
    console.error("Error fetching product(s):", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
