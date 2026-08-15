import { Clock3, Leaf, CreditCard, Star } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants/home";
import Container from "@/components/shared/Container";
import { SectionHead } from "@/components/shared/SectionHead";

const ICONS = {
  delivery: Clock3,
  fresh: Leaf,
  payment: CreditCard,
  rating: Star,
};

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <Container>
        <SectionHead
          eyebrow=" Why DishDash"
          title=" Why Choose Us"
          description=" Everything you need for a smooth, reliable food ordering experience."
          />
        <div
          className="
           mt-12 flex gap-5 overflow-x-auto pb-4
            snap-x snap-mandatory scrollbar-hide
            sm:grid sm:grid-cols-2 sm:overflow-visible
            lg:grid-cols-4
          "
        >
          {WHY_CHOOSE_US.map((feature) => {
            const Icon = ICONS[feature.icon];

            return (
              <article
                key={feature.title}
                className="
                  min-w-[280px] snap-start
                  rounded-3xl border bg-background
                  p-8 shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  sm:min-w-0
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
