"use client";

import { useState, useEffect } from "react";
import ThreeDViewer from "@/components/ThreeDViewer";
import Image from "next/image";

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [menuImage, setMenuImage] = useState("");
  const [file, setFile] = useState(null);
  const [useUpload, setUseUpload] = useState(false);

  // Fetch menu items on mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/admin/menu");
        if (!res.ok) throw new Error("Failed to fetch menu items");
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load menu items.");
      }
    };
    fetchMenuItems();
  }, []);

  // Add a new menu item
  const handleAddMenuItem = async () => {
    try {
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
          throw new Error("Image upload failed");
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

      if (!res.ok) {
        throw new Error("Failed to add menu item");
      }

      const newItem = await res.json();
      setMenuItems((prevItems) => [...prevItems, newItem]);

      // Reset form
      setName("");
      setPrice("");
      setMenuImage("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert(error.message || "An error occurred while adding menu item.");
    }
  };

  // Delete a menu item
  const handleDeleteMenuItem = async (menuItemId) => {
    try {
      const res = await fetch("/api/admin/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId }),
      });

      if (!res.ok) throw new Error("Failed to delete menu item");

      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== menuItemId));
    } catch (error) {
      console.error(error);
      alert(error.message || "An error occurred while deleting menu item.");
    }
  };

  // Render either a 3D model or an image
  const renderMedia = (url, alt) => {
    const isGlb = url?.toLowerCase().endsWith(".glb");

    return (
      <div className="w-24 h-24 flex items-center justify-center bg-white rounded overflow-hidden">
        {isGlb ? (
          <ThreeDViewer modelUrl={url} />
        ) : (
          <Image
            src={url}
            alt={alt}
            width={96}
            height={96}
            className="object-contain"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Manage Menu</h2>

      {/* Form Inputs */}
      <div className="flex flex-col md:flex-row gap-4">
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

      {/* Image Upload / URL Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
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

        <button
          onClick={handleAddMenuItem}
          className="bg-black text-white p-2 rounded w-32"
        >
          Add Item
        </button>
      </div>

      {/* Menu Items List */}
      <ul className="border p-4 rounded bg-gray-50 space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 border rounded bg-white shadow"
          >
            <div className="flex items-center gap-6">
              {renderMedia(item.menuImage, item.name)}
              <div className="text-lg font-medium">
                {item.name} - ₹{item.price}
              </div>
            </div>
            <button
              onClick={() => handleDeleteMenuItem(item.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
