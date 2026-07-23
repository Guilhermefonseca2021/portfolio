import type { ServiceItem } from "./servicesItems";

interface Props {
  service: ServiceItem;
}

export default function ServiceCard({ service }: Props) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-card
        p-3
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/40
      "
    >
      <div
        className="
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-primary/10
          blur-[50px]
          opacity-0
          transition
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        <div
          className="
            mb-2
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-primary/10
            text-sm
          "
        >
          🎥
        </div>

        <h3
          className="
            text-sm
            font-semibold
            text-secondaryText
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-secondaryText/70
          "
        >
          {service.description}
        </p>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-1
          "
        >
          {service.features.map((feature) => (
            <span
              key={feature}
              className="
                rounded-full
                border
                border-white/10
                px-2
                py-0.5
                text-[10px]
                text-secondaryText/70
              "
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
