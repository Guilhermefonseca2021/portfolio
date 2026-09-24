import MotionReveal from "../MotionReveal";

export default function HeroContent() {
  return (
    <MotionReveal className="relative z-20 mt-8 max-w-2xl px-1">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[4px] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Mídias sociais estratégicas
      </span>

      <h1 className="mt-6 max-w-[15ch] text-pretty text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
        Conteúdo que <span className="font-light italic text-white/85">gera</span> <span className="relative whitespace-nowrap text-primary after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-2/3 after:bg-primary/60 after:content-['']">resultado.</span>
      </h1>

      <p
        className="
        mt-6
        max-w-xl
        text-base
        leading-7
        sm:text-lg
        sm:leading-8
        text-white/65
    "
      >
        Estratégias de mídias sociais, vídeos e fotografia profissional para
        empresas que querem crescer nas redes sociais.
      </p>
    </MotionReveal>
  );
}
