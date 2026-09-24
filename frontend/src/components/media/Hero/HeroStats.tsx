import { humanizeContentCount } from "../../../utils/humanizeMetric";
import MotionReveal from "../MotionReveal";

export default function HeroStats() {
  const stats = [
    { value: "+200", label: "Clientes" },
    { value: "+10", label: "Anos de experiência" },
    { value: humanizeContentCount(5_000), label: "Conteúdos entregues" },
  ];

  return (
    <MotionReveal
      className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-5 sm:mt-14 sm:gap-10"
      delay={0.2}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          <p className="mt-1 text-xs leading-4 text-white/50">{stat.label}</p>
        </div>
      ))}
    </MotionReveal>
  );
}
