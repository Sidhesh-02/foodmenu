// src/app/api/orders/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { cart, orderType, tableNumber, totalAmount } = await req.json();

    // Create an order in your database. Customize fields as needed.
    const order = await prisma.order.create({
      data: {
        items: cart, // You may store the cart as JSON
        orderType,
        tableNumber,
        totalPrice: parseFloat(totalAmount),
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
