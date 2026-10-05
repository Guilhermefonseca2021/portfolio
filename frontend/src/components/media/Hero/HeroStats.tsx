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
      className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:mt-14 sm:gap-4"
      delay={0.2}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
        >
          <h3 className="text-xl font-black text-white sm:text-2xl">
            {stat.value}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/55">
            {stat.label}
          </p>
        </div>
      ))}
    </MotionReveal>
  );
}
