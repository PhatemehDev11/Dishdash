import Container from "@/components/shared/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
      <Container>
        <div className="grid min-h-[85vh] items-center gap-16 lg:grid-cols-2">
        <HeroContent/>
        <HeroImage/>
        </div>
      </Container>
    </section>
  );
}
