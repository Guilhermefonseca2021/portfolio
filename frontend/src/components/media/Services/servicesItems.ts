export interface ServiceItem {
  id: number;
  title: string;
  description?: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Estratégia",
    description: "Direção clara para o que sua marca quer comunicar e vender.",
    features: ["Diagnóstico", "Posicionamento", "Planejamento"],
  },
  {
    id: 2,
    title: "Conteúdo",
    description: "Peças pensadas para atrair atenção, confiança e demanda.",
    features: ["Posts", "Reels", "Artes"],
  },
  {
    id: 3,
    title: "Gestão",
    description:
      "Organização de calendário, publicação e acompanhamento da presença digital.",
    features: ["Calendário", "Publicação", "Acompanhamento"],
  },
  {
    id: 4,
    title: "Captação",
    description:
      "Produção visual para dar vida à marca em movimento e em contexto.",
    features: ["Eventos", "Bastidores", "Produção"],
  },
];

export default services;
