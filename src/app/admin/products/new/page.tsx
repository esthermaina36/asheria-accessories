"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Jewellery");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const supabase = createClient();

      let imageUrl = "";

      
      if (image) {
        const fileExtension = image.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExtension}`;

        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("Products")
          .upload(filePath, image);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("Products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      
      const { error: insertError } = await supabase
        .from("products")
        .insert({
          name,
          description,
          price: Number(price),
          category,
          image_url: imageUrl || null,
          stock: Number(stock),
          featured,
          new_arrival: newArrival,
          active: true,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      setMessage("Product added successfully!");

      
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Jewellery");
      setStock("");
      setFeatured(false);
      setNewArrival(true);
      setImage(null);

      const fileInput = document.getElementById(
        "product-image",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while adding the product.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">
      {/* Header */}
      <header className="border-b border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b52]">
              Asheria Accessories
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Add Product
            </h1>
          </div>

          <a
            href="/admin"
            className="rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      {}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              Product Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add the details of the product you want to sell.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {}
            <div className="md:col-span-2">
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-medium"
              >
                Product Name
              </label>

              <input
                id="product-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Floral Pearl Earrings"
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

            {}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the product..."
                rows={4}
                className="w-full resize-none rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

            {}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium"
              >
                Price (KSh)
              </label>

              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="250"
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

            {}
            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium"
              >
                Stock
              </label>

              <input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                placeholder="10"
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-[#ded2cb] bg-white px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              >
                <option value="Jewellery">Jewellery</option>
                <option value="Watches">Watches</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Hair Accessories">
                  Hair Accessories
                </option>
                <option value="Bracelets">Bracelets</option>
                <option value="Rings">Rings</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="product-image"
                className="mb-2 block text-sm font-medium"
              >
                Product Image
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImage(event.target.files?.[0] ?? null)
                }
                className="w-full rounded-xl border border-[#ded2cb] bg-white px-4 py-3 text-sm"
              />

              <p className="mt-2 text-xs text-gray-500">
                Select a product image from your computer.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-8 rounded-2xl bg-[#f6eee8] p-5">
            <h3 className="font-semibold">
              Product Options
            </h3>

            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(event.target.checked)
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Featured product
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newArrival}
                  onChange={(event) =>
                    setNewArrival(event.target.checked)
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  New arrival
                </span>
              </label>
            </div>
          </div>

          {/* Success message */}
          {message && (
            <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              href="/admin"
              className="rounded-full border border-[#ded2cb] px-6 py-3 text-center text-sm font-medium transition hover:bg-[#f6eee8]"
            >
              Cancel
            </a>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#9b6b52] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}