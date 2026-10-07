
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("Error loading product:", error);
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">
      {/* Header */}
      <header className="border-b border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-lg font-bold tracking-wide text-[#2d2522]"
          >
            Asheria Accessories
          </a>

          <a
            href="/"
            className="rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
          >
            Back to Store
          </a>
        </div>
      </header>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-3xl bg-[#f1e4dc]">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full max-h-[650px] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-7xl">
                ✨
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b52]">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-semibold text-[#9b6b52]">
              KSh {Number(product.price).toLocaleString()}
            </p>

            {product.description && (
              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>
            )}

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Availability
              </p>

              {product.stock > 0 ? (
                <p className="mt-1 font-semibold text-green-700">
                  In stock ({product.stock} available)
                </p>
              ) : (
                <p className="mt-1 font-semibold text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            <AddToCartButton
  id={product.id}
  name={product.name}
  price={Number(product.price)}
  image={product.image_url}
  stock={product.stock}
/>

            <a
              href="/"
              className="mt-4 text-center text-sm font-medium text-[#9b6b52] hover:underline"
            >
              ← Continue Shopping
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}