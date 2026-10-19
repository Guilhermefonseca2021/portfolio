import MotionReveal from "../MotionReveal";

export default function HeroButtons() {
  return (
    <MotionReveal
      className="mt-5 flex w-full flex-col gap-2.5 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
      delay={0.12}
    >
      <a
        href="#contact"
        className="brand-button rounded-[18px] bg-primary px-6 py-3 text-center text-sm font-extrabold tracking-[-0.01em] text-white shadow-[0_0_24px_rgba(0,113,227,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(0,113,227,0.52)]"
      >
        Quero transformar meu perfil
      </a>

      <a
        href="#captacoes"
        className="
rounded-[18px]
          border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            text-center
            text-sm
            font-medium
            text-white
            transition
            hover:border-primary/40
            hover:bg-white/[0.06]
        "
      >
        Ver trabalhos
      </a>
    </MotionReveal>
  );
}
