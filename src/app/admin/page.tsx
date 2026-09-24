import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error);
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">
      {/* Header */}
      <header className="border-b border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b52]">
              Asheria Accessories
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Admin Dashboard
            </h1>
          </div>

          <a
            href="/"
            className="rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
          >
            View Store
          </a>
        </div>
      </header>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <div className="rounded-3xl bg-[#9b6b52] p-8 text-white">
          <p className="text-sm font-medium text-white/80">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Manage your Asheria store
          </h2>

          <p className="mt-3 max-w-2xl text-white/80">
            Add products, update prices and stock, manage your collection,
            and keep your store up to date.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-bold">
              {products?.length ?? 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Products
            </p>

            <p className="mt-2 text-3xl font-bold">
              {products?.filter((product) => product.active).length ?? 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              New Arrivals
            </p>

            <p className="mt-2 text-3xl font-bold">
              {products?.filter((product) => product.new_arrival).length ?? 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Featured
            </p>

            <p className="mt-2 text-3xl font-bold">
              {products?.filter((product) => product.featured).length ?? 0}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage the products displayed in your store.
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-[#9b6b52] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#76503e]"
            >
              + Add Product
            </button>
          </div>

          {/* Product list */}
          <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            {products && products.length > 0 ? (
              <div className="divide-y divide-[#eee4de]">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f1e4dc] text-3xl">
                          ✨
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#9b6b52]">
                          KSh {Number(product.price).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500">
                          Stock:
                        </span>{" "}
                        <span className="font-semibold">
                          {product.stock}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="rounded-full border border-[#9b6b52] px-4 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="text-5xl">🛍️</div>

                <h3 className="mt-4 text-xl font-semibold">
                  No products yet
                </h3>

                <p className="mt-2 text-gray-500">
                  Add your first product to your store.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}