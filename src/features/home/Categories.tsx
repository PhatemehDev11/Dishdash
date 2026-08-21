"use client";
 
import { motion } from "framer-motion";
import Link from "next/link";
 
import { CATEGORIES } from "@/lib/constants/home";
import { SectionHead } from "@/components/shared/SectionHead";
 
export default function Categories() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Categories"
          title=" What are you craving?"
          description=" Explore your favorite food categories and discover something
            delicious."
        />
 
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
 
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href="/restaurants"
                  className="group flex flex-col items-center rounded-3xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
 
                  <span className="mt-4 text-sm font-semibold">
                    {category.title}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
 