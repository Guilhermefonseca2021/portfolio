export interface ServiceItem {
  id: number;
  title: string;
  formService: string;
  description?: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Estratégia",
    formService: "Consultoria Digital",
    description: "Direção clara para o que sua marca quer comunicar e vender.",
    features: ["Diagnóstico", "Posicionamento", "Planejamento"],
  },
  {
    id: 2,
    title: "Conteúdo",
    formService: "Criação de Conteúdo",
    description: "Peças pensadas para atrair atenção, confiança e demanda.",
    features: ["Posts", "Reels", "Artes"],
  },
  {
    id: 3,
    title: "Gestão",
    formService: "Gestão de Redes Sociais",
    description:
      "Organização de calendário, publicação e acompanhamento da presença digital.",
    features: ["Calendário", "Publicação", "Acompanhamento"],
  },
  {
    id: 4,
    title: "Captação",
    formService: "Captação de Conteúdo",
    description:
      "Produção visual para dar vida à marca em movimento e em contexto.",
    features: ["Eventos", "Bastidores", "Produção"],
  },
];

export default services;
