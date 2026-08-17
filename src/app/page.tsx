import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/home/Hero/Hero";
import Categories from "@/features/home/Categories";
import PopularFoods from "@/features/home/PopularFoods";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import Deals from "@/features/home/Deals";
import { HowItWorks } from "@/features/home/HowItWorks";
import { Testimonials } from "@/features/home/Testimonials";
import { AppDownload } from "@/features/home/AppDownload";
import { Newsletter } from "@/features/home/NewsLetter";
import { Footer } from "@/components/layout/Footer";
import FeaturedRestaurants from "@/features/home/FeaturedRestaurants";

export default function Home() {
  return (
    <>
      <Navbar />
      <main> 
        <Hero />
      <Categories/>
      <FeaturedRestaurants/>
      <PopularFoods/>
      <WhyChooseUs/>
      <Deals />
      <HowItWorks/>
      <Testimonials/>
      <AppDownload/>
      <Newsletter/>
      </main>
     <Footer/>
    </>
  );
}