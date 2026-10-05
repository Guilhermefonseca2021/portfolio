import { motion } from "framer-motion";
import { FiArrowUpRight, FiVideo } from "react-icons/fi";
import type { ServiceItem } from "./servicesItems";

interface Props {
  service: ServiceItem;
}

export default function ServiceCard({ service }: Props) {
  return (
    <motion.a
      href="#contact"
      aria-label={`Selecionar serviço ${service.title} no formulário`}
      className="
        group
        relative
        flex
        items-start
        gap-4
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-5
        transition-all
        duration-300
        hover:border-primary/60
        hover:bg-white/[0.04]
      "
      whileHover={{ x: 6, y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-sky-500/20 text-primary shadow-[0_0_24px_rgba(0,113,227,0.18)]">
        <FiVideo aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-base font-semibold text-white">
            {service.title}
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
            Ir ao formulário
            <FiArrowUpRight aria-hidden="true" className="text-[12px]" />
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-white/60">
          {service.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[1px] text-white/70"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
