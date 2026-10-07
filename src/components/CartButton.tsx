"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <button
      type="button"
      className="rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
    >
      Cart ({cartCount})
    </button>
  );
}