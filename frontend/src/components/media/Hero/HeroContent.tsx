import MotionReveal from "../MotionReveal";

export default function HeroContent() {
  return (
    <MotionReveal className="relative z-20 mt-4 max-w-3xl sm:mt-8">
      <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[4px]">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Estratégia, conteúdo e gestão
      </span>

      <h1 className="social-display mt-4 max-w-none text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:mt-6 sm:text-5xl lg:text-7xl">
        Social Media
        <span className="mt-1 block whitespace-nowrap text-[clamp(1.35rem,7.4vw,1em)] font-black leading-[1.05] tracking-[-0.06em] text-primary sm:mt-2">
          Presença que vende.
        </span>
      </h1>

      <p className="mt-4 max-w-[38rem] text-base leading-7 text-white/65 sm:mt-6 sm:text-lg sm:leading-8">
        Conteúdo e direção para marcas crescerem com intenção.
      </p>
    </MotionReveal>
  );
}
