
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const formatPrice = (price: number) =>
    `KSh ${price.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formIsValid =
    fullName.trim().length >= 2 &&
    phone.trim().length >= 9 &&
    deliveryAddress.trim().length >= 5 &&
    area.trim().length >= 2 &&
    cart.length > 0;

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12 text-[#2d2522] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="text-sm text-[#9b6b52] hover:underline"
        >
          ← Back to cart
        </Link>

        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-[#76503e]">
          Enter your details so we can prepare your order.
        </p>

        {cart.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-[#eadbd1] bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Add products before proceeding to checkout.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#9b6b52] px-6 py-3 text-white hover:bg-[#76503e]"
            >
              Explore products
            </Link>
          </section>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <form
              className="space-y-6 rounded-2xl border border-[#eadbd1] bg-white p-6 sm:p-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <h2 className="text-xl font-semibold">
                Delivery Information
              </h2>

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={9}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="e.g. 0712345678"
                  className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                />
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium"
                >
                  Town or area
                </label>
                <input
                  id="area"
                  name="area"
                  required
                  minLength={2}
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  placeholder="e.g. Nairobi, Westlands"
                  className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                />
              </div>

              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="mb-2 block text-sm font-medium"
                >
                  Delivery address
                </label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  required
                  minLength={5}
                  rows={3}
                  value={deliveryAddress}
                  onChange={(event) =>
                    setDeliveryAddress(event.target.value)
                  }
                  placeholder="Estate, building, street, or delivery directions"
                  className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Order notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Any additional delivery instructions?"
                  className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                />
              </div>

              <button
                type="submit"
                disabled={!formIsValid}
                title="Order placement will be enabled after secure order processing is implemented"
                className="w-full cursor-not-allowed rounded-full bg-gray-300 px-6 py-4 font-medium text-gray-600"
              >
                Place Order — Coming Soon
              </button>

              <p className="text-xs leading-5 text-gray-500">
                Your order will not be submitted yet. Secure order
                processing will be added next.
              </p>
            </form>

            <aside className="h-fit rounded-2xl border border-[#eadbd1] bg-white p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="flex-1">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="whitespace-nowrap font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between border-t border-[#eadbd1] pt-5 font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                Delivery charges, if applicable, will be confirmed before
                the order is completed.
              </p>

              <Link
                href="/cart"
                className="mt-6 block text-center text-sm text-[#9b6b52] hover:underline"
              >
                Edit your cart
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
