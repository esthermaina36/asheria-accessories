"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  stock: number;
};

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  stock,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({id, name, price, image, stock});

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={stock === 0}
      className="mt-8 w-full rounded-full bg-[#9b6b52] px-6 py-4 font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {stock > 0
        ? added
          ? "✓ Added to Cart"
          : "Add to Cart"
        : "Out of Stock"}
    </button>
  );
}