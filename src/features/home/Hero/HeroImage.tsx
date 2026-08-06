import Image from "next/image";

import HeroImg from "../../../../public/Hero.png";

import { Clock3, Star } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative order-first flex justify-center lg:order-last">
      <div className="absolute flex h-[280px] w-[280px] items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-orange-300/20 shadow-2xl sm:h-[400px] sm:w-[400px] lg:h-[480px]  lg:w-[480px]" />

      <Image
        src={HeroImg}
        alt="Hero Food"
        className="relative z-10 w-full max-w-[320px] sm:max-w-[430px] lg:max-w-[620px]  drop-shadow-[0_40px_60px_rgba(0,0,0,.25)]"
        priority
      />

      <div className="absolute left-0 top-8 rounded-2xl border bg-background px-4 py-3 shadow-xl sm:top-12 left-6 lg:left-0  top-16 lg:top-20">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

          <span className="font-semibold">4.9 Rating</span>
        </div>
      </div>

      <div className="absolute right-4 lg:right-0  bottom-8 lg:bottom-20 rounded-2xl border bg-background px-4 py-3 shadow-xl sm:bottom-12 lg:bottom-20">
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-primary" />

          <span className="font-semibold">15 min Delivery</span>
        </div>
      </div>
    </div>
  );
}