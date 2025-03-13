import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return Response.json(menuItems);
}

export async function POST(req) {
  const { name, price } = await req.json();
  const menuItem = await prisma.menuItem.create({
    data: { name, price },
  });
  return Response.json(menuItem);
}
