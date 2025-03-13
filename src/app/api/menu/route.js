import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const menuItems = await prisma.menuItem.findMany({
    include: { toppings: true },
  });
  return Response.json(menuItems);
}
