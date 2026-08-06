import { Button } from "@/components/ui/button";
import { FaMotorcycle } from "react-icons/fa6";

export default function HeroContent() {
  return (
    <div className="text-center lg:text-left">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
        <FaMotorcycle className="text-primary" />

        <span className="text-sm font-medium">Fast Delivery in Your City</span>
      </div>

      <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
        Delicious Food
        <br />
        Delivered
        <span className="text-primary"> Fast.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0 lg:text-lg">
        Order from your favorite restaurants with fast delivery and exclusive
        daily offers.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
        <Button
          size="lg"
          className="rounded-full px-8  hover:scale-105 transition-all duration-300"
        >
          Order Now
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8  hover:scale-105 transition-all duration-300"
        >
          View Menu
        </Button>
      </div>
    </div>
  );
}
