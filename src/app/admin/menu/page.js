"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [menuImage, setMenuImage] = useState("");
  const [file, setFile] = useState(null);
  const [useUpload, setUseUpload] = useState(false);

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const handleAddMenuItem = async () => {
    let imageUrl = menuImage;

    if (useUpload && file) {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData?.url) {
        alert("Image upload failed");
        return;
      }

      imageUrl = uploadData.url;
    }

    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        menuImage: imageUrl,
      }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setMenuItems([...menuItems, newItem]);
      setName("");
      setPrice("");
      setMenuImage("");
      setFile(null);
    }
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    const res = await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ menuItemId }),
    });
    if (res.ok) {
      setMenuItems(menuItems.filter((item) => item.id !== menuItemId));
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Menu</h2>

      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <select
          value={useUpload ? "upload" : "url"}
          onChange={(e) => setUseUpload(e.target.value === "upload")}
          className="border p-2 rounded"
        >
          <option value="url">Use Image URL</option>
          <option value="upload">Upload Image</option>
        </select>

        {useUpload ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        ) : (
          <input
            type="text"
            placeholder="Image URL"
            value={menuImage}
            onChange={(e) => setMenuImage(e.target.value)}
            className="border p-2 rounded w-full"
          />
        )}

        <button onClick={handleAddMenuItem} className="bg-black text-white p-2 rounded">
          Add
        </button>
      </div>

      <ul className="border p-4 rounded bg-gray-50">
        {menuItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 border-b">
            <div className="flex items-center gap-2">
            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1} transitionSpeed={400}>
              <Image
                src={item.menuImage}
                alt={item.name}
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />
            </Tilt>
              <span>{item.name} - ₹{item.price}</span>
            </div>
            <span className="space-x-2">
              <button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-700">
                Delete
              </button>
              <button className="text-blue-700">Edit</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
