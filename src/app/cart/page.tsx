
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const formatPrice = (price: number) =>
    `KSh ${price.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12 text-[#2d2522] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-[#9b6b52] hover:underline"
        >
          Continue shopping
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Your Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-[#76503e]">
              Review your beautiful finds before checkout.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-red-700 underline"
            >
              Clear cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-[#eadbd1] bg-white px-6 py-16 text-center">
            <div className="text-5xl">🛍️</div>
            <h2 className="mt-5 text-xl font-semibold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You haven't added any products yet.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#9b6b52] px-7 py-3 font-medium text-white transition hover:bg-[#76503e]"
            >
              Explore our collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
            <section className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#eadbd1] bg-white p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#f6eee8] sm:h-28 sm:w-28">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">
                        🛍️
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#9b6b52]">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border border-[#eadbd1]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="px-3 py-1.5 hover:bg-[#f6eee8]"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="px-3 py-1.5 hover:bg-[#f6eee8]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-semibold sm:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-[#eadbd1] bg-white p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="mt-6 flex justify-between gap-4 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="mt-4 flex justify-between gap-4 border-t border-[#eadbd1] pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                Delivery charges, if applicable, will be confirmed before
                your order is completed.
              </p>

              <Link
  href="/checkout"
  className="block w-full rounded-full bg-[#9b6b52] px-6 py-4 text-center font-medium text-white transition hover:bg-[#76503e]"
>
  Proceed to Checkout
</Link>

              <Link
                href="/"
                className="mt-4 block text-center text-sm text-[#9b6b52] hover:underline"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
