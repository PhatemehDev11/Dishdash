import {TESTIMONIAL} from "@/lib/constants/home";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-[100px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <Reveal>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(150deg, #111827, #1F2937 60%, #111827)",
            }}
          >
            <div className="absolute w-[420px] h-[420px] rounded-full bg-primary opacity-25 blur-[60px] -top-[120px] -right-20" />
            <div className="absolute w-[320px] h-[320px] rounded-full bg-accent opacity-15 blur-[60px] -bottom-[100px] -left-[100px]" />

            <div className="relative z-10 px-6 py-16 md:px-[60px] md:py-20">
              <SectionHead
                dark
                eyebrow="Testimonials"
                title="What Our Customers Say"
                description="Real feedback from people who order on DishDash every week."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5.5">
                {TESTIMONIAL.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white/[0.08] backdrop-blur-md border border-white/[0.14] rounded-3xl p-7 text-white transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    <span className="text-accent block mb-3.5">
                      {"★".repeat(t.rating)}
                      {"☆".repeat(5 - t.rating)}
                    </span>
                    <p className="text-[14.5px] leading-[1.7] text-white/85 mb-5">{t.comment}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-bold text-sm text-white"
                        style={{ background: t.avatarColor }}
                      >
                        {t.avatarInitial}
                      </div>
                      <div>
                        <b className="text-[13.5px] block">{t.name}</b>
                        <span className="text-[11.5px] text-white/55">Verified Order</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
