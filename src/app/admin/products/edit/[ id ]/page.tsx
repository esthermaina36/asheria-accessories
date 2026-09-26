"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
  featured: boolean;
  new_arrival: boolean;
  active: boolean;
};

export default function EditProductPage() {
const productId =
  typeof window !== "undefined"
    ? window.location.pathname.split("/").filter(Boolean).pop()
    : undefined;
 

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Jewellery");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [active, setActive] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadProduct() {
    if (!productId) {
      setError("No product ID was provided.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setError("Product could not be found.");
      setLoading(false);
      return;
    }

    setProduct(data);

    setName(data.name);
    setDescription(data.description ?? "");
    setPrice(String(data.price));
    setCategory(data.category);
    setStock(String(data.stock));
    setFeatured(data.featured);
    setNewArrival(data.new_arrival);
    setActive(data.active);

    setLoading(false);
  }

  loadProduct();
}, [productId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const supabase = createClient();

      let imageUrl = product?.image_url ?? null;

      
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

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: Number(price),
          category,
          image_url: imageUrl,
          stock: Number(stock),
          featured,
          new_arrival: newArrival,
          active,
        })
        .eq("id", productId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setMessage("Product updated successfully!");

      setProduct((current) =>
        current
          ? {
              ...current,
              name,
              description,
              price: Number(price),
              category,
              image_url: imageUrl,
              stock: Number(stock),
              featured,
              new_arrival: newArrival,
              active,
            }
          : current,
      );

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
          : "Something went wrong while updating the product.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <p className="text-[#9b6b52]">Loading product...</p>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2d2522]">
            Product not found
          </h1>

          <p className="mt-3 text-sm text-red-600">{error}</p>

          <a
            href="/admin"
            className="mt-6 inline-block rounded-full bg-[#9b6b52] px-6 py-3 text-sm font-medium text-white"
          >
            Back to Dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">
      <header className="border-b border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b52]">
              Asheria Accessories
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Edit Product
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
              Update the information for this product.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

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
                rows={4}
                className="w-full resize-none rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

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
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

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
                required
                className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
              />
            </div>

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

            <div>
              <label
                htmlFor="product-image"
                className="mb-2 block text-sm font-medium"
              >
                Replace Product Image
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
                Leave this empty if you want to keep the current image.
              </p>
            </div>
          </div>

          {product?.image_url && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium">
                Current Product Image
              </p>

              <img
                src={product.image_url}
                alt={product.name}
                className="h-48 w-48 rounded-2xl object-cover"
              />
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-[#f6eee8] p-5">
            <h3 className="font-semibold">Product Options</h3>

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

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) =>
                    setActive(event.target.checked)
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Product is active on the website
                </span>
              </label>
            </div>
          </div>

          {message && (
            <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              href="/admin"
              className="rounded-full border border-[#ded2cb] px-6 py-3 text-center text-sm font-medium transition hover:bg-[#f6eee8]"
            >
              Cancel
            </a>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#9b6b52] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}