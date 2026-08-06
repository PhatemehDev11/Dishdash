import { FaMotorcycle } from "react-icons/fa6";
import { Button } from "@/components/ui/button";


export default function HeroContent(){
    return(
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
    );
}