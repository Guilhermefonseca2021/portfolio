import { humanizeContentCount } from "../../../utils/humanizeMetric";
import MotionReveal from "../MotionReveal";

export default function HeroStats() {
  const stats = [
    { value: "+200", label: "clientes atendidos" },
    { value: "+10", label: "anos de experiência" },
    { value: humanizeContentCount(5_000), label: "conteúdos entregues" },
  ];

  return (
    <MotionReveal
      className="mt-6 grid max-w-xl grid-cols-3 gap-2 sm:mt-14 sm:gap-4"
      delay={0.2}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2.5 backdrop-blur-sm sm:rounded-2xl sm:px-4 sm:py-3"
        >
          <h3 className="text-lg font-black text-white sm:text-2xl">
            {stat.value}
          </h3>
          <p className="mt-1 text-[9px] uppercase leading-tight tracking-[0.08em] text-white/55 sm:text-[10px] sm:tracking-[0.12em]">
            {stat.label}
          </p>
        </div>
      ))}
    </MotionReveal>
  );
}
