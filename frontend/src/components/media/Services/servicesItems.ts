export interface ServiceItem {
  id?: number;
  title: string;
  description?: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    title: "Social Media",
    description: "Conteúdo estratégico para atrair clientes.",
    features: ["Posts", "Reels", "Planejamento"],
  },
  {
    title: "Captação",
    description: "Gravações profissionais para sua marca.",
    features: ["4K", "Drone", "Eventos"],
  },
  {
    title: "Edição",
    description: "Vídeos que geram impacto e retenção.",
    features: ["Motion", "Color", "Shorts"],
  },
];

export default services;
