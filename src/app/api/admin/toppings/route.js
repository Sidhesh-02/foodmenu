import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const menuItemId = searchParams.get("menuItemId");

  if (!menuItemId) {
    return Response.json({ error: "menuItemId is required" }, { status: 400 });
  }

  const toppings = await prisma.topping.findMany({
    where: { menuItemId },
  });

  return Response.json(toppings);
}

export async function POST(req) {
  const { name, price, menuItemId } = await req.json();
  const topping = await prisma.topping.create({
    data: { name, price, menuItemId },
  });
  return Response.json(topping);
}
