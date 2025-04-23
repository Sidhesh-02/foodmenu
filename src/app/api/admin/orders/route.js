import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { cart, orderType, tableNumber, totalAmount } = await req.json();
    const order = await prisma.order.create({
      data: {
        items: cart,
        orderType,
        tableNumber,
        totalPrice: parseFloat(totalAmount),
        paymentStatus: "pending",
        isHandled: false,
      },
    });

    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch orders" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
