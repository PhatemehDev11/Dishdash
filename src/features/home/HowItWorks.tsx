import { STEP } from "@/lib/constants/home";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

export function HowItWorks() {
  return (
    <section id="how" className="py-20 md:py-[100px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <SectionHead
          eyebrow="Simple Process"
          title="How It Works"
          description="From craving to doorstep in four easy steps."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {STEP.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.1}>
              <div className="text-center relative px-3.5">
                <div
                  className={`w-16 h-16 rounded-full ${step.color} text-white text-2xl flex items-center justify-center mx-auto mb-4.5 relative z-10`}
                >
                  {step.number}
                </div>
                <h4 className="text-[15.5px] font-semibold mb-1.5">{step.title}</h4>
                <p className="text-[12.5px] text-muted-foreground">{step.description}</p>
                {i < STEP.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 z-0"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #EEF0F2 0 8px, transparent 8px 14px)",
                    }}
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
