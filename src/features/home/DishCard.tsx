import { Heart, Plus } from "lucide-react";


type DishCardProps = {
  category: string;
  name: string;
  price: string;
  image: string;
  color: string;
};

export default function DishCard({
  category,
  name,
  price,
  image,
  color,
}: DishCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    
      <div
        className={`relative flex h-40 items-center justify-center ${color}`}
      >
        <button
          type="button"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          aria-label={`Add ${name} to favorites`}
        >
          <Heart className="h-4 w-4 text-slate-300" />
        </button>

        <img
          src={image}
          alt={name}
          className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110"/>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground">
          {category}
        </p>

        <h3 className="mt-2 text-base font-bold">
          {name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-red-500">
            {price}
          </span>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
            aria-label={`Add ${name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}