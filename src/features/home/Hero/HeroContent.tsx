"use client";

import { motion } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa6";
import { Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden  md:inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 shadow-md backdrop-blur-md"
      >
        <FaMotorcycle className="text-primary" />

        <span className="text-sm font-medium">Fast Delivery in Your City</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
        }}
        className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
      >
        Delicious Food
        <br />
        <span>Delivered</span>
        <span className="text-primary"> Fast.</span>
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg w-[25rem]  md:w-auto"
      >
        Order from your favorite restaurants with fast delivery and exclusive
        daily offers. Fresh food, fast delivery and an unforgettable experience.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.45,
        }}
        className="mt-10 flex   gap-4 w-auto sm:flex-row"
      >
        <Button
          size="lg"
          className="rounded-full px-8 transition-all duration-300 hover:scale-105"
          render={<Link href="/restaurants" />}
          nativeButton={false}
        >
          Order Now
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 transition-all duration-300 hover:scale-105"
          render={<a href="#popular-dishes" />}
          nativeButton={false}
        >
          View Menu
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
        className="mt-8 flex items-center gap-3"
      >
        <div className="flex">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </div>

        <span className="font-semibold">4.9</span>

        <span className="text-sm text-muted-foreground">
          from 12k+ happy customers
        </span>
      </motion.div>
    </div>
  );
}