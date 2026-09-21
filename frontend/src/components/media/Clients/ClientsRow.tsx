import clients from "./clientsItems";

const infiniteClients = [...clients, ...clients];

export default function ClientsRow() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-10">
      <div className="clients-scroll flex w-max items-center justify-center gap-12 lg:gap-16">
        {infiniteClients.map((client, index) => (
          <img
            key={`${client.id}-${index}`}
            src={client.image}
            alt={client.name}
            className="h-12 w-auto max-w-[140px] shrink-0 object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 sm:h-16 sm:max-w-[160px]"
          />
        ))}
      </div>
    </div>
  );
}
