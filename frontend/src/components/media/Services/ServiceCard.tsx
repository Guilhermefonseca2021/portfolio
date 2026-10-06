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
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("social-service:selected", {
            detail: { service: service.formService },
          }),
        );
      }}
      className="
        group
        relative
        flex
        flex-col
        items-start
        gap-2.5
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-3 sm:flex-row sm:gap-4 sm:p-5
        transition-all
        duration-300
        hover:border-primary/60
        hover:bg-white/[0.06]
        hover:shadow-[0_18px_44px_rgba(0,113,227,0.22)]
      "
      whileHover={{ y: -4, scale: 1.015, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-sky-500/20 text-sm text-primary sm:size-11 sm:rounded-2xl sm:text-base">
        <FiVideo aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="text-sm font-semibold leading-tight text-white sm:text-base">
            {service.title}
          </div>

          <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary sm:text-[10px] sm:tracking-[0.15em]">
            <span className="sm:hidden">Orçar</span>
            <span className="hidden sm:inline">Ir ao formulário</span>
            <FiArrowUpRight aria-hidden="true" className="text-[12px]" />
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-4 text-white/60 sm:mt-2 sm:text-sm sm:leading-6">
          {service.description}
        </p>

        <div className="mt-2 hidden flex-wrap gap-x-2 gap-y-1.5 sm:flex sm:gap-x-3">
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
