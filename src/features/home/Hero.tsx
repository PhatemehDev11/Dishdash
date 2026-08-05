import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-between">
     
        <div className="max-w-xl">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
             Fast Delivery
          </span>

          <h1 className="mt-6 text-6xl font-bold leading-tight">
            Delicious Food
            <br />
            Delivered
            <span className="text-primary"> Fast.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Discover the best restaurants near you and order your favorite meals
            in minutes.
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

       
        <div className="flex h-[550px] w-[550px] items-center justify-center rounded-full bg-primary/10">
         image 
        </div>
      </div>
    </section>
  );
}