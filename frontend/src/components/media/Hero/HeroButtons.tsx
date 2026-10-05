import MotionReveal from "../MotionReveal";

export default function HeroButtons() {
  return (
    <MotionReveal
      className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
      delay={0.12}
    >
      <a
        href="#contact"
        className="brand-button rounded-[18px] bg-primary shadow-[0_0_0_rgba(0,113,227,0)] transition-shadow hover:shadow-[0_0_28px_rgba(0,113,227,0.42)] px-6 py-3 text-center text-sm font-extrabold tracking-[-0.01em] text-white"
      >
        Solicitar orçamento
      </a>

      <a
        href="#captacoes"
        className="
rounded-[18px]
          border
            border-white/10
            px-6
            py-3
            text-center
            text-sm
            font-medium
            text-white
            hover:bg-white/5
        "
      >
        Ver trabalhos
      </a>
    </MotionReveal>
  );
}
