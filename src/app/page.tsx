import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";
import CartButton from "@/components/CartButton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  
const supabase = await createClient();

let query = supabase
  .from("products")
  .select("*")
  .eq("active", true);

if (category) {
  query = query.eq("category", category);
}

const { data: products, error } = await query.order("created_at", {
  ascending: false,
});
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F0E5]">
    
      <header className="sticky top-0 z-50 border-b border-[#333333] bg-[#0B0B0B]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight text-[	#D4AF37]"
          >
            Asheria
            <span className="text-[#F5F0E5]"> Accessories</span>
          </a>

        
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium transition hover:text-[	#D4AF37]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="text-sm font-medium transition hover:text-[	#D4AF37]"
            >
              Shop
            </a>

            <a
              href="#categories"
              className="text-sm font-medium transition hover:text-[	#D4AF37]"
            >
              Categories
            </a>

            <a
              href="#about"
              className="text-sm font-medium transition hover:text-[	#D4AF37]"
            >
              About
            </a>


            <a
  href="https://wa.me/254706031280?text=Hello%20Asheria%20Accessories!%20I%27d%20like%20to%20make%20an%20enquiry%20about%20your%20products."
  target="_blank"
  rel="noopener noreferrer"
>
  Contact
</a>
          </nav>

         
         <CartButton />
        </div>
      </header>

     
      <section
        id="home"
       className="flex min-h-[580px] w-full items-center justify-center px-6 py-20 md:py-28"
      >
      
        
<div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
  

  <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
     Simple Accessories <br /> Made for you.
    
  </h1>

  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
    Discover beautiful and affordable accessories carefully selected
    to add a little more style, confidence, and personality to your
    everyday look.
  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-4">
    <a
      href="#shop"
      className="rounded-full bg-[	#D4AF37] px-7 py-3 font-medium text-white transition hover:bg-[#B8962E]"
    >
      Shop Now
    </a>

    <a
      href="#categories"
      className="rounded-full border border-[	#D4AF37] px-7 py-3 font-medium text-[	#D4AF37] transition hover:bg-[	#D4AF37] hover:text-white"
    >
      Explore Categories
    </a>
  </div>
</div>


       
      </section>

      
      <section id="categories" className="bg-[#171717] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[	#D4AF37]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Shop by Category
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Find something beautiful for every style and occasion.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            
           <a
  href="/?category=Jewellery#shop"
  className="group rounded-3xl bg-[#171717] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
>
              <div className="text-5xl">💎</div>

              <h3 className="mt-5 text-xl font-semibold">
                Jewellery
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Elegant pieces for every occasion.
              </p>
            </a>

           
           <a
  href="/?category=Watches#shop"
  className="group rounded-3xl bg-[#171717] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
>
              <div className="text-5xl">⌚</div>

              <h3 className="mt-5 text-xl font-semibold">
                Watches
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Stylish watches for everyday wear.
              </p>
            </a>

          
           <a
  href="/?category=Hair%20Accessories#shop"
  className="group rounded-3xl bg-[#171717] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
>
              <div className="text-5xl">🎀</div>

              <h3 className="mt-5 text-xl font-semibold">
                Hair Accessories
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Add a beautiful finishing touch.
              </p>
            </a>

            <a
  href="/?category=Necklaces#shop"
  className="group rounded-3xl bg-[#171717] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
>
              <div className="text-5xl">📿</div>

              <h3 className="mt-5 text-xl font-semibold">
                Necklaces
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Pieces designed to stand out.
              </p>
            </a>

<a
  href="/?category=For%20Him#shop"
  className="group rounded-3xl bg-[#171717] p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
>
  <div className="text-5xl">👔</div>

  <h3 className="mt-5 text-xl font-semibold">
    For Him
  </h3>

  <p className="mt-2 text-sm text-gray-300">
    Stylish accessories for him.
  </p>
</a>
          </div>
          <div className="mt-10 text-center">
  <a
    href="/#shop"className="inline-block rounded-full bg-[#D4AF37] px-8 py-3 font-semibold !text-black transition hover:bg-[#B8962E]"
  >
    Shop All Products
  </a>
</div>
        </div>
      </section>

      
<section id="shop" className="bg-[#0B0B0B] py-20">
  <div className="mx-auto max-w-7xl px-6">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
        Our Collection
      </p>

      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        Shop All Products
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-gray-300">
        Explore our collection of beautiful accessories.
      </p>
    </div>

    {products && products.length > 0 ? (
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={Number(product.price)}
            image={product.image_url}
          />
        ))}
      </div>
    ) : (
      <p className="mt-12 text-center text-gray-400">
        No products are currently available.
      </p>
    )}
  </div>
</section>


     
    
      <section id="about" className="bg-[#171717] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
         
            
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[	#D4AF37]">
                About Asheria
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Accessories that tell your story.
              </h2>

              <p className="mt-6 leading-8 text-gray-300">
                At Asheria Accessories, we believe the little details can
                make a big difference. Our collection brings together
                beautiful, stylish, and affordable accessories designed to
                complement your everyday look.
              </p>

              <p className="mt-4 leading-8 text-gray-300">
                Whether you are treating yourself or looking for something
                special for someone you love, we want every Asheria purchase
                to feel personal and memorable.
              </p>

              <a
                href="#shop"
                className="mt-8 inline-block rounded-full bg-[	#D4AF37] px-7 py-3 font-medium text-white transition hover:bg-[#B8962E]"
              >
                Explore Our Collection
              </a>
            </div>
          </div>
        </div>
      </section>
            

      

      
      <footer className="border-t border-[#333333] bg-[#171717]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-bold text-[	#D4AF37]">
              Asheria Accessories
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Your style, your story.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <a
              href="#home"
              className="transition hover:text-[	#D4AF37]"
            >
              Home
            </a>

            <a
              href="#shop"
              className="transition hover:text-[	#D4AF37]"
            >
              Shop
            </a>

            <a
              href="#about"
              className="transition hover:text-[	#D4AF37]"
            >
              About
            </a>

            <a
  href="https://wa.me/254706031280?text=Hello%20Asheria%20Accessories!%20I%27d%20like%20to%20make%20an%20enquiry%20about%20your%20products."
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block rounded-full bg-black px-7 py-3 font-medium text-[#D4AF37] transition hover:bg-[#171717]"
>
  Contact Us on WhatsApp
</a>

           
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Asheria Accessories
          </p>
        </div>
      </footer>
    </main>
  );
}