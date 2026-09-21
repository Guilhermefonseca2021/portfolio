import clients from "./clientsItems";

const infiniteClients = [...clients, ...clients];

export default function ClientsRow() {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="clients-scroll flex w-max items-center gap-12 lg:gap-16">
        {infiniteClients.map((client, index) => (
          <img
            key={`${client.id}-${index}`}
            src={client.image}
            alt={client.name}
            className="h-12 w-auto shrink-0 rounded-xl bg-white/90 px-4 py-2 object-contain opacity-90 shadow-lg grayscale-0 transition-all duration-300 hover:scale-105 hover:bg-white"
          />
        ))}
      </div>
    </div>
  );
}
