import type { IconType } from "react-icons";
import { FiCpu, FiGlobe, FiInfo, FiMonitor, FiPhone, FiSettings } from "react-icons/fi";

type Service = { id: number; title: string; description: string; icon: IconType };

const servicesItems: Service[] = [
  {
    id: 1,
    title: "Desenvolvimento Web",
    description:
      "Sites institucionais, landing pages e sistemas completos utilizando React, Next.js e TypeScript.",
    icon: FiGlobe,
  },
  {
    id: 2,
    title: "Sistemas Personalizados",
    description:
      "ERPs, CRMs, dashboards administrativos e plataformas sob medida para empresas.",
    icon: FiSettings,
  },
  {
    id: 3,
    title: "Automação com IA",
    description:
      "Chatbots, agentes de IA, automações de WhatsApp e integração com APIs inteligentes.",
    icon: FiCpu,
  },
  {
    id: 4,
    title: "Aplicativos Mobile",
    description:
      "Aplicativos Android e iOS utilizando React Native com foco em performance e experiência.",
    icon: FiPhone,
  },
  {
    id: 5,
    title: "Backend Escalável",
    description:
      "APIs REST, autenticação, bancos de dados, Docker e arquiteturas modernas.",
    icon: FiMonitor,
  },
  {
    id: 6,
    title: "Consultoria Técnica",
    description:
      "Arquitetura de software, revisão de código e apoio técnico para equipes e empresas.",
    icon: FiInfo,
  },
];


export default servicesItems
