import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

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
            images: {
              select: {
                id: true,
                url: true,
                // createdAt: true,
              },
              // take: 5,
              // orderBy: { createdAt: "desc" },
            }
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product, message: "Product fetched successfully" });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
