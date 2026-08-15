"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/shared/Reveal";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <section id="newsletter-section" className="py-20 md:py-[100px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <Reveal>
          <div className="bg-white border border-[#EEF0F2] rounded-3xl px-8 py-12 md:px-[60px] md:py-14 flex flex-wrap items-center justify-between gap-7">
            <div>
              <h3 className="text-2xl font-bold mb-2">Never miss a deal.</h3>
              <p className="text-muted-foreground text-[14.5px]">
                Weekly offers and new restaurant drops, straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2.5 sm:flex-row sm:w-auto">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full sm:w-[260px] rounded-full border-[1.5px] border-[#EEF0F2] 
                px-5 py-3.5 text-sm outline-none transition-colors focus:border-primary
              "
              />
              <button
                type="submit"
                className=" w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-7 py-[15px] 
                text-[14.5px] font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.35)] transition-all hover:-translate-y-0.5  hover:bg-primary-dark active:scale-[0.97]
              "
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
