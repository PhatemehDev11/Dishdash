import { Reveal } from "@/components/shared/Reveal";
import {  Apple, UtensilsCrossed } from "lucide-react";
import { Play } from "lucide-react";



export function AppDownload() {
  return (
    <section id="app" className="py-20 md:py-[100px]">
      <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="w-[240px] h-[480px] mx-auto bg-secondary rounded-[36px] p-3 shadow-[0_24px_60px_rgba(17,24,39,0.14)] relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-xl z-10" />
            <div
              className="w-full h-full rounded-[26px] flex items-center justify-center text-7xl"
              style={{ background: "linear-gradient(160deg, #DCFCE7, #FFFFFF 60%)" }}
            >
            <UtensilsCrossed className="h-10 w-10 text-primary" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-primary/10 text-primary ">
            Mobile App
          </span>
          <h2 className="text-[30px] md:text-[42px] font-extrabold leading-[1.15] mt-3.5 mb-4">
            Download Our App For A Faster Experience
          </h2>
          <p className="text-muted-foreground text-base leading-[1.7] mb-7 max-w-[42ch]">
            Track your order live, save your favorite spots, and get app-only deals you won&apos;t
            find on the web.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2.5 bg-secondary text-white px-5 py-3 rounded-2xl text-[13px] transition-transform hover:-translate-y-1"
            >
              <span className="text-xl">
                <Apple/>
              </span>
              <span>
                <small className="block text-[9.5px] text-white/60">Download on the</small>
                <b className="text-sm">App Store</b>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 bg-secondary text-white px-5 py-3 rounded-2xl text-[13px] transition-transform hover:-translate-y-1"
            >
             <Play className="h-6 w-6 fill-current" />
              <span>
                <small className="block text-[9.5px] text-white/60">Get it on</small>
                <b className="text-sm">Google Play</b>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
