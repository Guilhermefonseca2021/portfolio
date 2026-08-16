export interface ServiceItem {
  id: number;
  title: string;
  description?: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Social Media",
    description: "Conteúdo estratégico para atrair clientes.",
    features: ["Posts", "Reels", "Planejamento"],
  },
  {
    id: 2,
    title: "Captação",
    description: "Gravações profissionais para sua marca.",
    features: ["4K", "Drone", "Eventos"],
  },
  {
    id: 3,
    title: "Edição",
    description: "Vídeos que geram impacto e retenção.",
    features: ["Motion", "Color", "Shorts"],
  },
];

export default services;
