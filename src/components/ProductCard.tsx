
type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="group">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#171717]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl">✨</span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-[#F5F0E5]">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-300">
          KSh {price.toLocaleString("en-KE")}
        </p>

        <a
          href={`/products/${id}`}
          className="mt-3 inline-block rounded-full border border-[#D4AF37] px-5 py-2 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
        >
          View Product
        </a>
      </div>
    </div>
  );
}
