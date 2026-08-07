import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/home/Hero/Hero";
import Categories from "@/features/home/Categories";
import PopularFoods from "@/features/home/PopularFoods";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories/>
      <PopularFoods/>
    </>
  );
}