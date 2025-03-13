import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  const menuItem = await prisma.menuItem.findUnique({
    where: { id },
    include: { toppings: true },
  });
  if (!menuItem) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(menuItem), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
