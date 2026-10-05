import servicesOptions from "./servicesOptions";

interface Props {
  services: string[];
  toggleService: (service: string) => void;
  close: () => void;
}

export default function ServicesModal({
  services,
  toggleService,
  close,
}: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-title"
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      p-4
      backdrop-blur-sm
      "
    >
      <div
        className="
        flex
        max-h-[85vh]
        w-full
        max-w-md
        flex-col
        rounded-[18px]
        border
        border-white/10
        bg-[#101725]
        p-5
        "
      >
        <div
          className="
          flex
          items-center
          justify-between
          "
        >
          <h3 id="services-title"
            className="
            text-lg
            font-bold
            text-white
            "
          >
            Serviços
          </h3>

          <button
            onClick={close}
            className="
            text-white/50
            hover:text-white
            "
          >
            ✕
          </button>
        </div>

        <div
          className="
          mt-5
          grid
          gap-2
          overflow-y-auto
          pr-1
          "
        >
          {servicesOptions.map((service) => (
            <label
              key={service}
              className={`
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-[18px]
              border
              p-3
              text-sm
              transition

              ${
                services.includes(service)
                  ? "border-primary bg-primary/10 text-white"
                  : "border-white/10 text-white/70"
              }
              `}
            >
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleService(service)}
                className="
                accent-primary
                "
              />

              <span>{service}</span>
            </label>
          ))}
        </div>

        <button
          onClick={close}
          className="
          mt-5
          h-11
          w-full
brand-button rounded-[18px]
  bg-primary
  text-sm
  font-extrabold
  text-white
          "
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
