import MotionReveal from "../MotionReveal";

export default function HeroContent() {
  return (
    <MotionReveal className="relative z-20 mt-8 max-w-2xl">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[4px] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Social media estratégico
      </span>

      <h1 className="mt-6 max-w-[11ch] text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        Conteúdo que
        <br />
        <span className="text-primary">gera resultado.</span>
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
