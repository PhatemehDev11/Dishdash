"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3, MapPin, Star } from "lucide-react";

import FloatCard from "./FloatCard";

import HeroImg from "../../../../public/Hero.png";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[280px] w-[280px] rounded-full bg-primary/30 blur-[70px] sm:h-[400px] sm:w-[400px] lg:h-[520px] lg:w-[520px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: {
            duration: 0.8,
          },
          scale: {
            duration: 0.8,
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10 flex aspect-square w-[280px] items-center  justify-center  rounded-full bg-gradient-to-br from-primary/20 via-green-100
          to-orange-200/40 shadow-2xl sm:w-[400px] lg:w-[520px]"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          animate={{
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src={HeroImg}
            alt="Delicious food"
            priority
            className="relative z-20 w-[260px] sm:w-[360px] lg:w-[520px] drop-shadow-[0_35px_50px_rgba(0,0,0,.25)] "
          />
        </motion.div>

        <FloatCard
          delay={1}
          className="left-0 top-10 px-4 py-3 sm:left-4 lg:left-0 lg:top-20"
        >
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400  text-yellow-400" />

            <span className="font-semibold">4.9 Rating</span>
          </div>
        </FloatCard>

        <FloatCard
          delay={1.2}
          className=" bottom-10 right-0 px-4 py-3 lg:bottom-20"
        >
          <div className="flex items-center gap-2">
            <Clock3 className=" h-5 w-5 text-primary" />

            <span className="font-semibold">15 min</span>
          </div>
        </FloatCard>

        {/* Restaurant Card */}
        <FloatCard
          delay={1.4}
          className=" hidden lg:flex right-0 top-1/2 -translate-y-1/2 px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <MapPin className=" h-5  w-5 text-red-500  " />

            <span className="font-semibold">1500+ Restaurants</span>
          </div>
        </FloatCard>
      </motion.div>
    </div>
  );
}
