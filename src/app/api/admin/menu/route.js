import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return Response.json(menuItems);
}

export async function POST(req) {
  const { name, price, menuImage } = await req.json();
  const menuItem = await prisma.menuItem.create({
    data: { name, price, menuImage },
  });
  return Response.json(menuItem);
}

export async function DELETE(req) {
  const { menuItemId } = await req.json();
  const menuItem = await prisma.menuItem.findUnique({
    where: { id: menuItemId },
  });
  if (!menuItem) {
    return Response.json({ error: "Menu item not found" }, { status: 404 });
  }
  // Delete toppings related to this menu item (if they exist)
  await prisma.topping.deleteMany({
    where: { menuItemId },
  });

  // Delete the menu item itself
  const deletedMenuItem = await prisma.menuItem.delete({
    where: { id: menuItemId },
  });
  return Response.json(deletedMenuItem);
}
