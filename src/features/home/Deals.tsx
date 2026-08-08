import { ArrowRight } from "lucide-react";

import Container from "@/components/shared/Container";

export default function Deals() {
  return (
    <section className="py-20">
      <Container>
        <button
          type="button"
          className="
            group relative w-full overflow-hidden rounded-[32px]
            bg-gradient-to-r from-green-600 via-primary to-green-400
            px-8 py-10 text-left text-white
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            sm:px-12 sm:py-14
            lg:px-16 lg:py-16
          "
        >
         
          <div
            className="
              absolute -right-20 -top-20
              h-64 w-64 rounded-full
              border border-dashed border-white/40
              sm:h-72 sm:w-72
            "
          />

          <div
            className="
              absolute -right-12 -top-12
              h-48 w-48 rounded-full
              bg-white/5
              blur-2xl
            "
          />

       
          <div className="relative z-10 max-w-2xl">
            <span
              className="
                inline-flex rounded-full
                bg-white/15 px-4 py-2
                text-xs font-bold uppercase
                tracking-wider backdrop-blur-sm
              "
            >
              Limited Time
            </span>

            <h2
              className="
                mt-5 text-4xl font-extrabold
                leading-tight tracking-tight
                sm:text-5xl lg:text-6xl
              "
            >
              50% OFF{" "}
              <span className="block sm:inline">
                Summer Deals
              </span>
            </h2>

            <p
              className="
                mt-4 max-w-lg
                text-base leading-7
                text-white/90
                sm:text-lg
              "
            >
              Grab your favorite meals at half price.
              Ends this weekend, don&apos;t miss out.
            </p>

            <div
              className="
                mt-7 inline-flex items-center gap-2
                rounded-full bg-white
                px-6 py-3.5
                font-semibold text-primary
                transition-all duration-300
                group-hover:gap-3
              "
            >
              Claim Offer

              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

        
          <div
            className="
              absolute right-8 top-1/2
              hidden -translate-y-1/2
              sm:flex
              h-40 w-40
              items-center justify-center
              rounded-full
              border border-dashed border-white/50
              bg-white/10
              backdrop-blur-sm
              lg:right-16
              lg:h-48 lg:w-48
            "
          >
            <div className="text-center">
              <span className="block text-5xl font-extrabold">
                50%
              </span>

              <span className="text-sm font-bold uppercase tracking-wider">
                OFF
              </span>
            </div>
          </div>
        </button>
      </Container>
    </section>
  );
}