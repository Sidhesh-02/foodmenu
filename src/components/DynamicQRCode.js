"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import Link from "next/link";

export default function DynamicQRCode() {
  const [menuURL, setMenuURL] = useState("");

  useEffect(() => {
    setMenuURL(process.env.NEXT_PUBLIC_MENU_URL);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 pt-10">
      <h2 className="text-xl p-2">Scan to Open Menu</h2>
      <QRCodeCanvas value={menuURL} size={200} /> 
    </div>
  );
}
