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
            className="
              h-10
              w-auto
              shrink-0
              opacity-60
              grayscale
              transition-all
              duration-300
              hover:scale-110
              hover:opacity-100
              hover:grayscale-0
            "
          />
        ))}
      </div>
    </div>
  );
}