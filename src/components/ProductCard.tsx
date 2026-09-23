type ProductCardProps = {
  name: string;
  price: string;
  image?: string;
};

export default function ProductCard({
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="group">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#f1e4dc]">
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
        <h3 className="font-semibold text-[#2d2522]">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          {price}
        </p>

        <button className="mt-3 rounded-full border border-[#9b6b52] px-5 py-2 text-sm font-medium text-[#9b6b52] transition hover:bg-[#9b6b52] hover:text-white">
          View Product
        </button>
      </div>
    </div>
  );
}