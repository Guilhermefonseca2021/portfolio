const clients = [
  "HONDA",
  "BMW",
  "VOLKSWAGEN",
  "BELLA BIJOUX",
  "MEDELLÍN CAFÉ",
  "SIMONE REIS",
  "PIZZARIA",
  "CAFETERIA",
];

export default function ClientsCarousel() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee gap-14">
        {[...clients, ...clients].map((client, index) => (
          <div
            key={index}
            className="
              whitespace-nowrap
              text-2xl
              font-semibold
              tracking-wider
              text-white/25
              transition
              hover:text-primary
            "
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
