
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!formIsValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          phone: phone.trim(),
          delivery_area: area.trim(),
          delivery_address: deliveryAddress.trim(),
          notes: notes.trim(),
          items: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "We could not place your order. Please try again."
        );
      }

      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-12 text-[#2d2522] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href={orderPlaced ? "/" : "/cart"}
          className="text-sm text-[#9b6b52] hover:underline"
        >
          {orderPlaced ? "← Continue shopping" : "← Back to cart"}
        </Link>

        {orderPlaced ? (
          <section className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#eadbd1] bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6eee8] text-3xl text-[#9b6b52]">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Your order has been submitted successfully. Asheria
              Accessories will contact you using the phone number you
              provided to confirm the order and delivery arrangements.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Please keep your phone available.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-[#9b6b52] px-8 py-3 font-medium text-white hover:bg-[#76503e]"
            >
              Continue shopping
            </Link>
          </section>
        ) : (
          <>
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
                  onSubmit={handleSubmit}
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
                      maxLength={120}
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
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
                      maxLength={30}
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
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
                      maxLength={120}
                      value={area}
                      onChange={(event) =>
                        setArea(event.target.value)
                      }
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
                      maxLength={500}
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
                      maxLength={1000}
                      rows={3}
                      value={notes}
                      onChange={(event) =>
                        setNotes(event.target.value)
                      }
                      placeholder="Any additional delivery instructions?"
                      className="w-full rounded-xl border border-[#eadbd1] px-4 py-3 outline-none focus:border-[#9b6b52]"
                    />
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!formIsValid || isSubmitting}
                    className="w-full rounded-full bg-[#9b6b52] px-6 py-4 font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                  >
                    {isSubmitting
                      ? "Placing your order..."
                      : "Place Order"}
                  </button>

                  <p className="text-xs leading-5 text-gray-500">
                    Your order details will be submitted securely for
                    processing. Delivery charges, if applicable, will be
                    confirmed before delivery.
                  </p>
                </form>

                <aside className="h-fit rounded-2xl border border-[#eadbd1] bg-white p-6">
                  <h2 className="text-xl font-semibold">
                    Order Summary
                  </h2>

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
                    The final order total is calculated by the database
                    using current product prices. Delivery charges, if
                    applicable, are confirmed separately.
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
          </>
        )}
      </div>
    </main>
  );
}
