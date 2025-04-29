import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("image");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
