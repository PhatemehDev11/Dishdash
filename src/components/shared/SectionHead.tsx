import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function SectionHead({ eyebrow, title, description, dark = false }: SectionHeadProps) {
  return (
    <Reveal className="max-w-[560px] mx-auto mb-12 md:mb-14 text-center">
      <span
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full ${
          dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-[30px] md:text-[44px] font-extrabold tracking-tight leading-[1.15] mt-3.5 mb-3 ${
          dark ? " text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      <p className={`text-base leading-relaxed ${dark ? "text-white/65" : "text-muted-foreground"}`}>
        {description}
      </p>

      
    </Reveal>
  );
}
