import ProductCard from "@/components/ProductCard";
import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d2522]">

      {/* Navigation */}
      <header className="border-b border-[#eadfd8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <h1 className="text-2xl font-bold tracking-[0.2em]">
            ASHERIA
          </h1>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#" className="hover:text-[#9b6b52]">
              Home
            </a>

            <a href="#shop" className="hover:text-[#9b6b52]">
              Shop
            </a>

            <a href="#categories" className="hover:text-[#9b6b52]">
              Collections
            </a>

            <a href="#about" className="hover:text-[#9b6b52]">
              About
            </a>
          </nav>

          <button className="text-xl" aria-label="Shopping cart">
            🛒
          </button>

        </div>
      </header>


      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#9b6b52]">
            Asheria Accessories
          </p>

          <h2 className="max-w-xl text-5xl font-bold leading-tight md:text-7xl">
            Elevate your everyday style.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Discover beautiful accessories carefully selected to
            complement your style, wherever you go.
          </p>

          <div className="mt-8">
            <a
              href="#shop"
              className="inline-block rounded-full bg-[#9b6b52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#76503e]"
            >
              SHOP NOW
            </a>
          </div>
        </div>


        {/* Temporary hero image area */}
        <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-[#f1e4dc]">
          <div className="text-center">
            <div className="text-7xl">👜</div>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[#76503e]">
              Your style. Your statement.
            </p>
          </div>
        </div>

      </section>


      {/* Categories */}
      <section id="categories" className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9b6b52]">
              Explore
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Shop by Category
            </h2>
          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Jewellery",
              "Handbags",
              "Sunglasses",
              "Watches",
            ].map((category) => (
              <div
                key={category}
                className="group cursor-pointer rounded-2xl bg-[#f6eee8] p-10 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="text-5xl">
                  {category === "Jewellery" && "💎"}
                  {category === "Handbags" && "👜"}
                  {category === "Sunglasses" && "🕶️"}
                  {category === "Watches" && "⌚"}
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {category}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Explore collection
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* Shop */}
      <section id="shop" className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9b6b52]">
                Fresh arrivals
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                New Arrivals
              </h2>
            </div>

            <a
              href="#"
              className="hidden text-sm font-semibold underline md:block"
            >
              View all
            </a>

          </div>


          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
  {[
    {
      name: "Elegant Necklace",
      price: "ksh.250",
      image:"/product/butterflynecklace.jpeg"
    },
    {
      name: "Classic Handbag",
      price: "KSh 3,500",
    },
    {
      name: "Crystal Bracelet",
      price: "KSh 250",
      image:"/product/bracelets.jpeg"
    },
    {
      name: "Classic Sunglasses",
      price: "ksh.300",
      image:"/product/sunglasses.jpeg"
    },
  ].map((product) => (
    <ProductCard
      key={product.name}
      name={product.name}
      price={product.price}
      image={product.image}
    />
  ))}
</div>       
       

        </div>

      </section>


      {/* About */}
      <section id="about" className="bg-[#2d2522] px-6 py-20 text-white">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-[#d8b9a5]">
            About Asheria
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Accessories that tell your story.
          </h2>

          <p className="mt-6 leading-8 text-gray-300">
            At Asheria Accessories, we believe the right accessory
            can transform an outfit and express your individuality.
            Discover pieces selected with style and elegance in mind.
          </p>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-[#211b18] px-6 py-10 text-center text-sm text-gray-400">

        <p>
          © {new Date().getFullYear()} Asheria Accessories.
          All rights reserved.
        </p>

      </footer>

    </main>
  );
}