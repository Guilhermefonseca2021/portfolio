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
    description: "Direção para comunicar e vender.",
    features: ["Direção criativa", "Posicionamento", "Identidade"],
  },
  {
    id: 2,
    title: "Conteúdo",
    formService: "Criação de Conteúdo",
    description: "Conteúdo que atrai, conecta e gera demanda.",
    features: ["Posts", "Reels", "Artes"],
  },
  {
    id: 3,
    title: "Gestão",
    formService: "Gestão de Redes Sociais",
    description:
      "Presença digital alinhada aos objetivos da marca.",
    features: ["Consistência", "Presença digital", "Crescimento"],
  },
  {
    id: 4,
    title: "Captação",
    formService: "Captação de Conteúdo",
    description:
      "Produção visual para marcas em movimento.",
    features: ["Eventos", "Bastidores", "Produção"],
  },
];

export default services;
