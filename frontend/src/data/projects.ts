import hardmanImage from "../assets/images/banner-menu.png";
import nubankImage from "../assets/images/banner-nuapp.gif";
// import securityImage from "../assets/images/banner-security.png"; // ou troque pelo nome correto
import storeImage from "../assets/images/banner-store.png";
import tabnewsImage from "../assets/images/banner-tabnews.png";
// import whatsappImage from "../assets/images/banner-whatsapp.png"; // se ainda não existir, use uma imagem temporária

export const projects: Project[] = [
  {
    id: 1,
    title: "Sistema Web para E-commerce",
    description:
      "Plataforma completa para gerenciamento de produtos, estoque e pedidos com arquitetura escalável.",

    image: storeImage,

    github: "https://github.com/Guilhermefonseca2021/Storeweb",

    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST API"],
  },

  // {
  //   id: 2,
  //   title: "Automação WhatsApp com IA",
  //   description:
  //     "Sistema inteligente para atendimento automático, notificações e integração com IA.",

  //   image: whatsappImage,

  //   github: "https://github.com/Guilhermefonseca2021/Bot-Whatsap",

  //   technologies: ["Node.js", "TypeScript", "Automation", "AI", "WhatsApp"],
  // },

  {
    id: 3,
    title: "Nubank UI Clone",
    description:
      "Clone moderno do aplicativo Nubank desenvolvido em React Native com foco em UX e performance.",

    image: nubankImage,

    github: "https://github.com/Guilhermefonseca2021/Nubank-App",

    technologies: ["React Native", "Expo", "Tailwind", "TypeScript", "Figma"],
  },

  // {
  //   id: 4,
  //   title: "API de Autenticação",
  //   description:
  //     "Backend seguro utilizando Java, Spring Boot, JWT e controle de acesso baseado em papéis.",

  //   image: securityImage,

  //   github:
  //     "https://github.com/Guilhermefonseca2021/security-api-login/tree/main/apilogin",

  //   technologies: ["Java", "Spring Boot", "JWT", "Security", "REST API"],
  // },

  {
    id: 5,
    title: "TabNews",
    description:
      "Plataforma full stack inspirada no TabNews utilizando Next.js, PostgreSQL e Docker.",

    image: tabnewsImage,

    github: "https://github.com/Guilhermefonseca2021/tabnews",

    technologies: ["Next.js", "React", "PostgreSQL", "Docker", "Vercel"],
  },

  {
    id: 6,
    title: "Hotel Hardman",
    description:
      "Sistema web para hotelaria e restaurantes com foco em performance, SEO e experiência do usuário.",

    image: hardmanImage,

    github: "https://github.com/Guilhermefonseca2021/salsait-restaurant",

    technologies: ["React", "TypeScript", "TailwindCSS", "SEO", "Vercel"],
  },
];
