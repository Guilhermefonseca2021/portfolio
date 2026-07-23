export interface Client {
  id: number;
  name: string;
  category: string;
  image: string;
}

export const clients: Client[] = [
  {
    id: 1,
    name: "Honda",
    category: "Concessionária",
    image: "/images/clients/honda.jpeg",
  },
  {
    id: 2,
    name: "BMW",
    category: "Concessionária Premium",
    image: "/images/clients/bmw.svg",
  },
  {
    id: 3,
    name: "Volkswagen",
    category: "Concessionária",
    image: "/images/clients/vk.svg",
  },
  {
    id: 4,
    name: "Bella Bijoux",
    category: "Joalheria",
    image: "/images/clients/bb.jpeg",
  },
  {
    id: 5,
    name: "Medellín Café",
    category: "Cafeteria",
    image: "/images/clients/mc.jpeg",
  },
];

export default clients;
