import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  // Connect to Supabase
  const supabase = await createClient();

  // Get active products from the database
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  // Show database errors in the terminal
  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">
      {/* =========================
          NAVIGATION
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-[#eaded7] bg-[#fffaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight text-[#9b6b52]"
          >
            Asheria
            <span className="text-[#2d2522]"> Accessories</span>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium transition hover:text-[#9b6b52]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="text-sm font-medium transition hover:text-[#9b6b52]"
            >
              Shop
            </a>

            <a
              href="#categories"
              className="text-sm font-medium transition hover:text-[#9b6b52]"
            >
              Categories
            </a>

            <a
              href="#about"
              className="text-sm font-medium transition hover:text-[#9b6b52]"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-sm font-medium transition hover:text-[#9b6b52]"
            >
              Contact
            </a>
          </nav>

          {/* Cart */}
          <button
            type="button"
            className="rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
          >
            Cart (0)
          </button>
        </div>
      </header>

      {/* =========================
          HERO SECTION
      ========================== */}
      <section
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28"
      >
        {/* Hero Text */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
            Accessories made for you
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Simple pieces.
            <br />
            Beautiful moments.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Discover beautiful and affordable accessories carefully selected
            to add a little more style, confidence, and personality to your
            everyday look.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="rounded-full bg-[#9b6b52] px-7 py-3 font-medium text-white transition hover:bg-[#76503e]"
            >
              Shop Now
            </a>

            <a
              href="#categories"
              className="rounded-full border border-[#9b6b52] px-7 py-3 font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] bg-[#f6eee8] p-10">
          <div className="text-center">
            <div className="text-8xl">✨</div>

            <p className="mt-6 text-2xl font-semibold text-[#76503e]">
              Asheria Accessories
            </p>

            <p className="mt-2 text-gray-600">
              Your style, your story.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================== */}
      <section id="categories" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Shop by Category
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Find something beautiful for every style and occasion.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Jewellery */}
            <a
              href="#shop"
              className="group rounded-3xl bg-[#f6eee8] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">💎</div>

              <h3 className="mt-5 text-xl font-semibold">
                Jewellery
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Elegant pieces for every occasion.
              </p>
            </a>

            {/* Watches */}
            <a
              href="#shop"
              className="group rounded-3xl bg-[#f6eee8] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">⌚</div>

              <h3 className="mt-5 text-xl font-semibold">
                Watches
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Stylish watches for everyday wear.
              </p>
            </a>

            {/* Hair Accessories */}
            <a
              href="#shop"
              className="group rounded-3xl bg-[#f6eee8] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">🎀</div>

              <h3 className="mt-5 text-xl font-semibold">
                Hair Accessories
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Add a beautiful finishing touch.
              </p>
            </a>

            {/* Necklaces */}
            <a
              href="#shop"
              className="group rounded-3xl bg-[#f6eee8] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">📿</div>

              <h3 className="mt-5 text-xl font-semibold">
                Necklaces
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Pieces designed to stand out.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCTS
      ========================== */}
      <section id="shop" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Heading */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
                Our collection
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                New Arrivals
              </h2>

              <p className="mt-3 max-w-xl text-gray-600">
                Discover the latest pieces added to the Asheria collection.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {products?.length ?? 0} product
              {(products?.length ?? 0) === 1 ? "" : "s"}
            </span>
          </div>

          {/* Product Grid */}
          {products && products.length > 0 ? (
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.image_url ?? undefined}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-[#f6eee8] px-6 py-16 text-center">
              <div className="text-5xl">🛍️</div>

              <h3 className="mt-5 text-xl font-semibold">
                No products available yet
              </h3>

              <p className="mt-2 text-gray-600">
                We&apos;re preparing something beautiful for you.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          ABOUT SECTION
      ========================== */}
      <section id="about" className="bg-[#f6eee8] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Visual */}
            <div className="flex min-h-[380px] items-center justify-center rounded-[2rem] bg-[#fffaf7]">
              <div className="text-center">
                <div className="text-8xl">🤎</div>

                <p className="mt-6 text-2xl font-semibold text-[#76503e]">
                  Made with love
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
                About Asheria
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Accessories that tell your story.
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                At Asheria Accessories, we believe the little details can
                make a big difference. Our collection brings together
                beautiful, stylish, and affordable accessories designed to
                complement your everyday look.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Whether you are treating yourself or looking for something
                special for someone you love, we want every Asheria purchase
                to feel personal and memorable.
              </p>

              <a
                href="#shop"
                className="mt-8 inline-block rounded-full bg-[#9b6b52] px-7 py-3 font-medium text-white transition hover:bg-[#76503e]"
              >
                Explore Our Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHY ASHERIA
      ========================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
              Why Asheria
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              More than just accessories
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-[#fffaf7] p-8 text-center">
              <div className="text-5xl">✨</div>

              <h3 className="mt-5 text-xl font-semibold">
                Beautiful Designs
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Carefully selected accessories to help you express your
                personal style.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fffaf7] p-8 text-center">
              <div className="text-5xl">💰</div>

              <h3 className="mt-5 text-xl font-semibold">
                Affordable Style
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Stylish pieces at prices that make it easy to treat yourself.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fffaf7] p-8 text-center">
              <div className="text-5xl">💝</div>

              <h3 className="mt-5 text-xl font-semibold">
                Made for You
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Accessories for everyday moments, special occasions, and
                thoughtful gifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT / CTA
      ========================== */}
      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#9b6b52] px-8 py-16 text-center text-white md:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Stay connected
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Find your next favourite accessory.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/80">
            Browse our collection and discover pieces that bring a little
            more beauty to your everyday style.
          </p>

          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-medium text-[#9b6b52] transition hover:bg-[#f6eee8]"
          >
            Shop Asheria
          </a>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="border-t border-[#eaded7] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-bold text-[#9b6b52]">
              Asheria Accessories
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your style, your story.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <a
              href="#home"
              className="transition hover:text-[#9b6b52]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="transition hover:text-[#9b6b52]"
            >
              Shop
            </a>

            <a
              href="#about"
              className="transition hover:text-[#9b6b52]"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition hover:text-[#9b6b52]"
            >
              Contact
            </a>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Asheria Accessories
          </p>
        </div>
      </footer>
    </main>
  );
}