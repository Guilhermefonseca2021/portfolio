import MotionReveal from "../MotionReveal";

export default function HeroContent() {
  return (
    <MotionReveal className="relative z-20 mt-8 max-w-2xl">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[4px] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Social media estratégico
      </span>

      <h1 className="mt-6 max-w-[11ch] text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
        Conteúdo que
        <br />
        <span className="relative inline-block font-black text-primary drop-shadow-[0_0_12px_rgba(0,113,227,0.45)] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-primary after:shadow-[0_0_10px_rgba(0,113,227,0.75)] after:content-[''] sm:after:-bottom-3 sm:after:h-1.5">gera resultado.</span>
      </h1>

      <p
        className="
        mt-6
        max-w-xl
        text-lg
        leading-8
        text-white/65
    "
      >
        Estratégias de social media, vídeos e fotografia profissional para
        empresas que querem crescer nas redes sociais.
      </p>
    </MotionReveal>
  );
}
