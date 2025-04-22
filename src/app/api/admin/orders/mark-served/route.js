import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { orderId } = await req.json();
  await prisma.order.update({
    where: { id: orderId },
    data: { isHandled: true },
  });
  return NextResponse.json({ success: true });
}
