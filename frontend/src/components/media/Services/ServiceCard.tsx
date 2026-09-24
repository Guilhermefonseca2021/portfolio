import { motion } from "framer-motion";
import { FiVideo } from "react-icons/fi";
import type { ServiceItem } from "./servicesItems";

interface Props {
  service: ServiceItem;
}

export default function ServiceCard({ service }: Props) {
  return (
    <motion.article
      className="
        group
        relative
        overflow-hidden
        flex
        items-start
        gap-4
        border-t
        border-white/10
        py-5
        transition-all
        duration-300
        hover:border-primary/60
      "
      whileHover={{ x: 6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">
        <FiVideo aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div
            className="
            text-sm
            font-semibold
            text-white
          "
          >
            {service.title}
          </div>

          <p
            className="
            text-xs
            text-white/50
          "
          >
            {service.description}
          </p>
        </div>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-x-4
            gap-y-1
          "
        >
          {service.features.map((feature) => (
            <span
              key={feature}
              className="
                text-[10px]
                uppercase
                tracking-[1px]
                text-white/70
              "
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
