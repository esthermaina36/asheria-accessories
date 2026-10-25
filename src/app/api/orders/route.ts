
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type CheckoutItem = {
  product_id: string;
  quantity: number;
};

type OrderRequest = {
  customer_name: string;
  phone: string;
  delivery_area: string;
  delivery_address: string;
  notes?: string;
  items: CheckoutItem[];
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();

    if (
      !isNonEmptyString(body.customer_name) ||
      !isNonEmptyString(body.phone) ||
      !isNonEmptyString(body.delivery_area) ||
      !isNonEmptyString(body.delivery_address)
    ) {
      return NextResponse.json(
        { error: "Please complete all required delivery details." },
        { status: 400 },
      );
    }

    if (
      body.customer_name.trim().length > 120 ||
      body.phone.trim().length > 30 ||
      body.delivery_area.trim().length > 120 ||
      body.delivery_address.trim().length > 500 ||
      (body.notes != null &&
        (typeof body.notes !== "string" || body.notes.length > 1000))
    ) {
      return NextResponse.json(
        { error: "One or more checkout fields are too long or invalid." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      body.items.length > 50
    ) {
      return NextResponse.json(
        { error: "Your cart is empty or contains too many items." },
        { status: 400 },
      );
    }

    const seenProductIds = new Set<string>();

    for (const item of body.items) {
      if (
        !item ||
        typeof item.product_id !== "string" ||
        !uuidPattern.test(item.product_id) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return NextResponse.json(
          { error: "Your cart contains an invalid product or quantity." },
          { status: 400 },
        );
      }

      const productId = item.product_id.toLowerCase();

      if (seenProductIds.has(productId)) {
        return NextResponse.json(
          { error: "Your cart contains duplicate products. Please review it." },
          { status: 400 },
        );
      }

      seenProductIds.add(productId);
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("place_order", {
      p_customer_name: body.customer_name.trim(),
      p_phone: body.phone.trim(),
      p_delivery_area: body.delivery_area.trim(),
      p_delivery_address: body.delivery_address.trim(),
      p_notes: body.notes?.trim() || null,
      p_items: body.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    });

    if (error) {
      console.error("Order placement failed:", error.code, error.message);

      return NextResponse.json(
        {
          error:
            error.code === "P0001"
              ? error.message
              : "We could not place your order. Please check your cart and try again.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, order: data },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "The checkout request was invalid." },
        { status: 400 },
      );
    }

    console.error("Unexpected checkout error:", error);

    return NextResponse.json(
      { error: "Something went wrong while placing your order." },
      { status: 500 },
    );
  }
}
