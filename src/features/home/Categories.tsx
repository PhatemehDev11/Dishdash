"use client";

import { motion } from "framer-motion";

import { CATEGORIES } from "@/lib/constants/home";

export default function Categories() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Explore Categories
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What are you craving?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Explore your favorite food categories and discover something
            delicious.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.button
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center rounded-3xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>

                <span className="mt-4 text-sm font-semibold">
                  {category.title}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}