import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/home/Hero/Hero";
import Categories from "@/features/home/Categories";
import PopularFoods from "@/features/home/PopularFoods";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import Deals from "@/features/home/Deals";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories/>
      <PopularFoods/>
      <WhyChooseUs/>
      <Deals />
    </>
  );
}