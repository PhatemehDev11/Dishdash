import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Star, Clock3, MapPin } from "lucide-react";
import { FaMotorcycle } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
      <Container>
        <div className="grid min-h-[85vh] items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
              <FaMotorcycle className="text-primary" />
              <span className="text-sm font-medium">
                Fast Delivery in Your City
              </span>
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-7xl">
              Delicious Food
              <br />
              delivered
              <span className="text-primary">Fast.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Order from your favorite restaurants with fast delivery and
              exclusive daily offers.
            </p>

            <div className="mt-8 flex gap-4">
              <Button size="lg" className="rounded-full px-8">
                Order Now
              </Button>

              <Button variant="outline" size="lg" className="rounded-full px-8">
                View Menu
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="flex h-[520px] w-[520px] items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-orange-300/20 shadow-2xl"></div>
            <div className="absolute left-0 top-20 rounded-2xl border bg-background px-5 py-4 shadow-xl">
  <div className="flex items-center gap-2">
    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
    <span className="font-semibold">4.9 Rating</span>
  </div>
</div>
<div className="absolute bottom-20 right-0 rounded-2xl border bg-background px-5 py-4 shadow-xl">
  <div className="flex items-center gap-2">
    <Clock3 className="h-5 w-5 text-primary" />
    <span className="font-semibold">15 min Delivery</span>
  </div>
</div>
{/* <div className="absolute right-20 top-72 rounded-2xl border bg-background px-5 py-4 shadow-xl">
  <div className="flex items-center gap-2">
    <MapPin className="h-5 w-5 text-red-500" />
    <span className="font-semibold">120+ Restaurants</span>
  </div>
</div> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
