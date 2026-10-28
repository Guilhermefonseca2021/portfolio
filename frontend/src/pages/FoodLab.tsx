import { useEffect } from "react";
import { useMemo, useState } from "react";

type PromptItem = {
  id: number;
  name: string;
  text: string;
  category: string;
  img: string;
};

const prompts: PromptItem[] = [
  {
    id: 1,
    name: 'Brinde com Três Hambúrgueres Artesanais',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Brinde com Três Hambúrgueres Artesanais.webp',
  },
  {
    id: 2,
    name: 'Burger Intenso_ Só Pra Quem Tem Fome',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Burger Intenso_ Só Pra Quem Tem Fome.webp',
  },
  {
    id: 3,
    name: 'Busca pelo Melhor Hambúrguer em João Pessoa',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Busca pelo Melhor Hambúrguer em João Pessoa.webp',
  },
  {
    id: 4,
    name: 'Cheeseburger artesanal em destaque',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Cheeseburger artesanal em destaque.webp',
  },
  {
    id: 5,
    name: 'Cheesebúrguer suculento em destaque',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Cheesebúrguer suculento em destaque.webp',
  },
  {
    id: 6,
    name: 'Diva Retrô com Hambúrguer no Diner',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Diva Retrô com Hambúrguer no Diner.webp',
  },
  {
    id: 7,
    name: 'Hamburguer_01',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hamburguer_01.webp',
  },
  {
    id: 8,
    name: 'Hamburguer_02',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hamburguer_02.webp',
  },
  {
    id: 9,
    name: 'Hamburguer_03',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hamburguer_03.webp',
  },
  {
    id: 10,
    name: 'Hamburguer_04',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hamburguer_04.webp',
  },
  {
    id: 11,
    name: 'Hamburguer_05',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hamburguer_05.webp',
  },
  {
    id: 12,
    name: 'Hambúrguer Artesanal em Foco',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Artesanal em Foco.webp',
  },
  {
    id: 13,
    name: 'Hambúrguer Clássico em Destaque Retro',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Clássico em Destaque Retro.webp',
  },
  {
    id: 14,
    name: 'Hambúrguer Duplo com Queijo Derretido',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Duplo com Queijo Derretido.webp',
  },
  {
    id: 15,
    name: 'Hambúrguer Duplo em Destaque',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Duplo em Destaque.webp',
  },
  {
    id: 16,
    name: 'Hambúrguer Explosivo com Queijo Derretido',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Explosivo com Queijo Derretido.webp',
  },
  {
    id: 17,
    name: 'Hambúrguer Pop por Apenas R$ 29,90',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer Pop por Apenas R$ 29,90.webp',
  },
  {
    id: 18,
    name: 'Hambúrguer refletido em óculos vermelhos',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hambúrguer refletido em óculos vermelhos.webp',
  },
  {
    id: 19,
    name: 'Hoje é Dia de Hambúrguer',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Hoje é Dia de Hambúrguer.webp',
  },
  {
    id: 20,
    name: 'Homem Morde Hambúrguer Suculento',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Homem Morde Hambúrguer Suculento.webp',
  },
  {
    id: 21,
    name: 'Jogo da Velha do Sabor Contrário',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Jogo da Velha do Sabor Contrário.webp',
  },
  {
    id: 22,
    name: 'Molho que ultrapassa a tela',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Molho que ultrapassa a tela.webp',
  },
  {
    id: 23,
    name: 'Mulher saboreando hambúrguer artesanal',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Mulher saboreando hambúrguer artesanal.webp',
  },
  {
    id: 24,
    name: 'Pôster Grunge de Hambúrguer Supremo',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Pôster Grunge de Hambúrguer Supremo.webp',
  },
  {
    id: 25,
    name: 'Sabor Delicioso_ Burger Artesanal',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Sabor Delicioso_ Burger Artesanal.webp',
  },
  {
    id: 26,
    name: 'Sabor Que Mata a Fome',
    text: "",
    category: "FoodLab",
    img: '/portfolio/media/imagens/Sabor Que Mata a Fome.webp',
  },
];

const steps = [
  {
    number: "01",
    title: "Você pergunta",
    description:
      "Peça uma imagem, uma edição ou uma direção visual usando linguagem natural ou um comando.",
  },
  {
    number: "02",
    title: "A IA consulta",
    description:
      "O RAG procura nos seus PDFs, presets e referências os trechos que combinam com o pedido.",
  },
  {
    number: "03",
    title: "O contexto é aplicado",
    description:
      "As regras encontradas entram no prompt junto com a sua imagem e as instruções da conversa.",
  },
  {
    number: "04",
    title: "Seu estilo ganha forma",
    description:
      "ChatGPT ou Claude responde com uma direção coerente com o material e os critérios da sua marca.",
  },
];

const onboardingSteps = [
  {
    number: "01",
    title: "ASSISTA",
    description: "Entenda o método em uma aula rápida.",
  },
  {
    number: "02",
    title: "INSTALE",
    description: "Adicione o Estúdio Invisível à tela do seu celular.",
  },
  {
    number: "03",
    title: "CRIE",
    description: "Abra o app, escolha uma foto, copie e use.",
  },
];

const photoFeatures = [
  "Método completo",
  "Biblioteca",
  "Prompts",
  "Referência → Produto",
  "Preservação",
  "Kit Anti-Cara-de-IA",
];
const videoFeatures = [
  "Tudo do plano Fotos",
  "Foto → Vídeo",
  "Prompts de vídeo",
  "Movimentos naturais",
  "Preservação no vídeo",
  "Reels e anúncios",
];
const traditionalProduction = [
  "Fotógrafo",
  "Captação",
  "Iluminação",
  "Produção",
  "Tratamento",
  "Vídeo",
  "Edição",
  "Tempo",
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap');
:root{--bg:#0d0e0e;--panel:#181a19;--panel2:#202321;--stroke:#333733;--text:#f6f4ed;--muted:#a2a59d;--accent:#ff824a;--accent2:#ffc38a}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}.foodlab-page{background:var(--bg);color:var(--text);font:15px 'DM Sans',sans-serif;min-height:100vh;overflow:hidden}.foodlab-page button,.foodlab-page input,.foodlab-page select,.foodlab-page textarea{font:inherit}.foodlab-page button,.foodlab-page a{cursor:pointer}.foodlab-page a{color:inherit;text-decoration:none}.fl-shell{max-width:1420px;margin:auto;padding:0 42px}.fl-nav{height:84px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #292b29;gap:22px}.fl-brand{display:flex;align-items:center;gap:12px;font-family:Outfit,sans-serif;font-size:22px;font-weight:800;letter-spacing:-.8px;white-space:nowrap}.fl-brand-mark{display:grid;place-items:center;width:39px;height:39px;background:var(--accent);color:#1b130e;border-radius:13px;font-size:22px}.fl-brand-muted{color:#92968e;font-weight:500}.fl-navlinks{display:flex;gap:25px;color:#c6c7c0;font-size:13px}.fl-navlinks a:hover{color:#fff}.fl-nav-cta,.fl-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--accent);border:0;border-radius:12px;padding:13px 18px;color:#1c130d!important;font-weight:800;transition:transform .2s,background .2s}.fl-nav-cta:hover,.fl-primary:hover{background:#ff9b6b;transform:translateY(-2px)}.fl-secondary{display:inline-flex;align-items:center;gap:9px;background:#292c29;border:1px solid #424640;color:var(--text);border-radius:12px;padding:12px 17px;font-weight:700}.fl-eyebrow{color:var(--accent);font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase}.fl-hero{display:grid;grid-template-columns:1.02fr .98fr;gap:55px;align-items:center;padding:82px 0 90px}.fl-hero h1,.fl-display{font:800 clamp(42px,5.1vw,75px)/1.02 Outfit,sans-serif;letter-spacing:-3.4px;margin:20px 0}.fl-hero h1 em,.fl-display em{color:var(--accent);font-style:normal}.fl-hero-copy>p:not(.fl-eyebrow){color:var(--muted);font-size:17px;line-height:1.8;max-width:570px}.fl-actions{display:flex;gap:12px;flex-wrap:wrap;margin:28px 0 20px}.fl-trust{color:#a9ada5;font-size:13px}.fl-trust b{color:#fff}.fl-hero-art{height:480px;display:grid;grid-template-columns:1fr 1fr;gap:13px;transform:rotate(1.5deg)}.fl-hero-art img{width:100%;height:100%;object-fit:cover;border-radius:23px;border:1px solid #41413a;min-height:0}.fl-hero-art img:nth-child(2){transform:translateY(26px)}.fl-image-stamp{position:absolute;bottom:16px;left:16px;background:#101210d9;border:1px solid #ffffff20;padding:9px 12px;border-radius:9px;font-size:10px;letter-spacing:1.3px;font-weight:800}.fl-hero-art-wrap{position:relative}.fl-section{padding:76px 0}.fl-section-heading{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:34px}.fl-section-heading h2{font:750 clamp(31px,3.4vw,48px)/1.1 Outfit,sans-serif;letter-spacing:-1.8px;margin:12px 0 0;max-width:720px}.fl-section-heading p{max-width:450px;color:var(--muted);line-height:1.7;margin:0}.fl-showcase{border-top:1px solid #292b28}.fl-showcase-grid{display:grid;grid-template-columns:1.15fr .85fr .85fr;gap:16px}.fl-showcase-card{min-height:310px;position:relative;border-radius:18px;overflow:hidden;background:#242521;border:1px solid #363a35}.fl-showcase-card img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .5s}.fl-showcase-card:hover img{transform:scale(1.04)}.fl-showcase-card:after{content:'';position:absolute;inset:25% 0 0;background:linear-gradient(transparent,#090a09e8)}.fl-showcase-copy{position:absolute;z-index:1;left:20px;right:20px;bottom:19px}.fl-showcase-copy span{font-size:10px;letter-spacing:1.5px;color:#ffd0b7;font-weight:800}.fl-showcase-copy h3{font:700 23px Outfit;margin:7px 0}.fl-marquee{border-block:1px solid #30322e;background:#111312;overflow:hidden;white-space:nowrap;padding:19px 0;color:#d4d2c9;font:700 13px Outfit;letter-spacing:2px}.fl-marquee span{padding:0 28px}.fl-marquee i{color:var(--accent);font-style:normal;margin:0 15px}.fl-library{background:#111312;border-block:1px solid #292b28}.fl-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:32px 0 42px}.fl-metric{background:#171918;border:1px solid var(--stroke);border-radius:17px;padding:21px}.fl-metric strong{font:750 32px Outfit;color:var(--accent)}.fl-metric p{color:var(--muted);margin:8px 0 0;font-size:13px}.fl-toolbar{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}.fl-search{flex:1;min-width:230px;background:#202220;color:white;border:1px solid #383c36;padding:14px 16px;border-radius:12px;outline:none}.fl-search:focus{border-color:var(--accent)}.fl-filter{background:#222522;border:1px solid #373b36;color:#ddd;padding:11px 14px;border-radius:11px}.fl-filter.active{background:#473027;color:#ffad7b;border-color:#9b5b3c}.fl-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px}.fl-card{background:#1b1e1b;border:1px solid #363a35;border-radius:18px;overflow:hidden;transition:transform .2s,border-color .2s;min-width:0}.fl-card:hover{transform:translateY(-4px);border-color:#a56d4e}.fl-card-image{height:225px;position:relative;background:linear-gradient(135deg,#412820,#1c1c1b)}.fl-card-image img{width:100%;height:100%;object-fit:cover}.fl-tag{position:absolute;left:12px;top:12px;background:#151615df;padding:8px 10px;border-radius:9px;font-size:10px;font-weight:800;backdrop-filter:blur(5px)}.fl-heart{position:absolute;right:11px;top:10px;background:#151615d9;color:white;border:0;border-radius:50%;height:35px;width:35px;font-size:19px}.fl-heart.saved{color:#ff7b55}.fl-cardbody{padding:17px}.fl-cardbody h3{font:700 17px Outfit;margin:7px 0 9px}.fl-cardbody p{color:var(--muted);font-size:12px;margin:0 0 17px;min-height:32px}.fl-cardbottom{display:flex;align-items:center;justify-content:space-between;gap:8px}.fl-openbtn{background:#2f342f;color:#fff;border:1px solid #484d46;border-radius:9px;padding:10px 12px;font-weight:700;font-size:12px}.fl-num{color:#8e968b;font-size:11px}.fl-empty{border:1px dashed #424640;border-radius:16px;padding:30px;color:var(--muted);text-align:center}.fl-how{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-top:35px}.fl-step{background:var(--panel);border:1px solid var(--stroke);padding:24px;border-radius:18px}.fl-stepnum{color:var(--accent);font:800 32px Outfit}.fl-step h3{font:700 19px Outfit;margin:18px 0 8px}.fl-step p{color:var(--muted);line-height:1.7;font-size:13px}.fl-gallery{display:grid;grid-template-columns:1.2fr .8fr .8fr;grid-template-rows:220px 220px;gap:14px}.fl-gallery-item{position:relative;overflow:hidden;border-radius:17px;border:1px solid #393b34}.fl-gallery-item:first-child{grid-row:span 2}.fl-gallery-item img{width:100%;height:100%;object-fit:cover}.fl-gallery-item span{position:absolute;left:12px;bottom:12px;padding:8px 10px;background:#101210d9;border-radius:8px;font-size:10px;font-weight:800;letter-spacing:1px}.fl-onboarding{background:#111312;border-block:1px solid #292b28}.fl-onboarding-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center}.fl-onboarding-copy p{color:var(--muted);line-height:1.8}.fl-mantra{font:700 23px/1.4 Outfit;color:#f7f1e7!important}.fl-mantra em{color:var(--accent);font-style:normal}.fl-onboarding-steps{display:grid;gap:12px}.fl-onboarding-step{display:flex;align-items:center;gap:18px;background:#1b1e1b;border:1px solid #363a35;padding:19px;border-radius:15px}.fl-onboarding-step>span{font:800 26px Outfit;color:var(--accent)}.fl-onboarding-step h3{margin:0 0 5px;font:700 15px Outfit}.fl-onboarding-step p{margin:0;color:var(--muted);font-size:13px}.fl-cost{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}.fl-cost p{color:var(--muted);line-height:1.8}.fl-cost-list{display:flex;gap:9px;flex-wrap:wrap;padding:0;list-style:none;margin:25px 0}.fl-cost-list li{border:1px solid #383c36;border-radius:8px;padding:9px 12px;color:#d1d2ca;font-size:12px}.fl-cost-number{border:1px solid #6e4837;background:linear-gradient(120deg,#43271e,#1d1c1a);border-radius:25px;padding:38px}.fl-cost-number span{display:block;font-size:10px;letter-spacing:1.6px;color:#d2b5a5}.fl-cost-number strong{display:block;font:800 clamp(52px,7vw,86px) Outfit;letter-spacing:-4px;color:var(--accent);margin:16px 0}.fl-cost-number i{display:block;width:54px;height:3px;background:var(--accent);margin:18px 0}.fl-pricing{background:#111312;border-block:1px solid #292b28}.fl-pricing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:920px;margin:auto}.fl-price-card{position:relative;background:#1b1e1b;border:1px solid #363a35;border-radius:20px;padding:28px;display:flex;flex-direction:column}.fl-price-card.featured{border-color:#b36a45;background:linear-gradient(155deg,#2a211d,#191b19 55%)}.fl-price-card h3{font:750 29px Outfit;margin:12px 0 7px}.fl-price-card p{color:var(--muted);line-height:1.6}.fl-price-card ul{list-style:none;padding:0;margin:15px 0 25px;display:grid;gap:12px}.fl-price-card li{display:flex;gap:9px;color:#deded6;font-size:13px}.fl-price-card li:before{content:'✓';color:var(--accent);font-weight:800}.fl-price{margin-top:auto;padding-top:15px}.fl-price strong{display:block;font:800 44px Outfit}.fl-price span{font-size:12px;color:var(--muted)}.fl-faq{max-width:900px;margin:auto}.fl-faq details{border-bottom:1px solid #353832;padding:19px 0}.fl-faq summary{font:700 17px Outfit;cursor:pointer}.fl-faq details p{color:var(--muted);line-height:1.75;max-width:760px}.fl-cta{background:linear-gradient(120deg,#43271e,#1d1c1a);border:1px solid #6e4837;border-radius:25px;padding:42px;margin:28px 0 70px;display:flex;justify-content:space-between;align-items:center;gap:25px}.fl-cta h2{font:750 clamp(28px,3vw,40px)/1.12 Outfit;margin:10px 0}.fl-cta p{color:#cbbcb2;max-width:630px;line-height:1.7}.fl-footer{border-top:1px solid #333;padding:27px 0;color:#999;font-size:12px;display:flex;justify-content:space-between;gap:20px;align-items:center}.fl-modal-backdrop{position:fixed;inset:0;background:#070807e8;z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto}.fl-modal{background:#181b18;border:1px solid #484c44;border-radius:22px;max-width:1080px;width:100%;max-height:92vh;overflow:auto;display:grid;grid-template-columns:300px minmax(0,1fr);box-shadow:0 25px 100px #0009}.fl-modal-left{padding:22px;border-right:1px solid #343832}.fl-modal-left img{width:100%;height:210px;object-fit:cover;border-radius:13px}.fl-modal-left h2{font:750 24px Outfit;margin:17px 0 5px}.fl-modal-left p{color:#aeb2a8;font-size:12px;line-height:1.6}.fl-field{margin-top:13px}.fl-field label{display:block;font-size:11px;color:#c7c9c2;margin-bottom:7px}.fl-field input,.fl-field select{background:#262a26;border:1px solid #424740;color:white;border-radius:9px;width:100%;padding:11px}.fl-modal-right{padding:22px;display:flex;flex-direction:column;min-height:0}.fl-modal-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}.fl-modal-toolbar h3{font:700 18px Outfit;margin:0}.fl-modal-close{background:#292c29;color:white;border:1px solid #444;border-radius:9px;padding:8px 12px}.fl-prompt-text{white-space:pre-wrap;overflow:auto;flex:1;min-height:260px;max-height:48vh;background:#101210;border:1px solid #343832;border-radius:12px;padding:16px;color:#deded6;font:12px/1.65 'DM Sans',sans-serif}.fl-modal-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:13px}.fl-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:120;background:#f6f4ed;color:#171817;border-radius:10px;padding:12px 18px;font-weight:800;box-shadow:0 10px 40px #0008}.fl-mobile-menu{display:none}@media (max-width:720px){.fl-section{padding:40px 0}.fl-marquee{padding:12px 0}.fl-hero{padding:48px 0 40px}.fl-hero-art{height:320px}.fl-showcase-card{min-height:220px}.fl-gallery{grid-template-rows:180px 180px}.fl-cards{gap:12px}.fl-pricing-grid{gap:12px}.fl-cost{gap:24px}.fl-onboarding-grid{gap:24px}}.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.reveal.is-visible{opacity:1;transform:none}@media (prefers-reduced-motion: reduce){.reveal{opacity:1;transform:none;transition:none}}
@media(max-width:1050px){.fl-shell{padding:0 25px}.fl-navlinks{gap:13px}.fl-navlinks a:nth-child(3),.fl-navlinks a:nth-child(4){display:none}.fl-hero{gap:30px}.fl-hero-art{height:400px}.fl-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.fl-how{grid-template-columns:repeat(2,1fr)}}
@media(max-width:720px){.fl-shell{padding:0 18px}.fl-nav{height:auto;min-height:72px;flex-wrap:wrap;padding:13px 0}.fl-navlinks{order:3;width:100%;overflow:auto;padding:5px 0 10px;gap:19px}.fl-navlinks a{white-space:nowrap;display:block!important}.fl-nav-cta{padding:10px 12px;font-size:12px}.fl-brand{font-size:19px}.fl-hero{grid-template-columns:1fr;padding:48px 0 58px;gap:35px}.fl-hero h1,.fl-display{letter-spacing:-2px}.fl-hero-art{height:340px;max-width:520px;margin:0 auto;width:100%}.fl-section{padding:55px 0}.fl-section-heading{display:block}.fl-section-heading p{margin-top:15px}.fl-showcase-grid{grid-template-columns:1fr 1fr}.fl-showcase-card{min-height:230px}.fl-showcase-card:first-child{grid-column:span 2}.fl-metrics{grid-template-columns:1fr;gap:10px}.fl-metric{padding:16px}.fl-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.fl-card-image{height:170px}.fl-cardbody{padding:12px}.fl-cardbody h3{font-size:15px}.fl-cardbody p{font-size:11px}.fl-openbtn{padding:9px;font-size:11px}.fl-how{grid-template-columns:1fr}.fl-gallery{grid-template-columns:1fr 1fr;grid-template-rows:240px 170px 170px}.fl-gallery-item:first-child{grid-row:span 1;grid-column:span 2}.fl-onboarding-grid,.fl-cost{grid-template-columns:1fr;gap:30px}.fl-pricing-grid{grid-template-columns:1fr}.fl-cost-number{padding:28px}.fl-cta{padding:25px;display:block}.fl-cta .fl-primary{margin-top:10px}.fl-footer{align-items:flex-start;flex-direction:column}.fl-modal-backdrop{padding:10px;align-items:flex-start}.fl-modal{grid-template-columns:1fr;max-height:none;margin:10px 0}.fl-modal-left{border-right:0;border-bottom:1px solid #343832;display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:start;padding:14px}.fl-modal-left img{height:120px;grid-row:span 3}.fl-modal-left h2{margin:4px 0}.fl-modal-left p{margin:0}.fl-modal-fields{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:0 10px}.fl-modal-right{padding:14px}.fl-prompt-text{max-height:40vh}.fl-section-heading h2{letter-spacing:-1.2px}}
@media(max-width:390px){.fl-cards{grid-template-columns:1fr}.fl-card-image{height:220px}.fl-nav-cta{font-size:11px;padding:9px}.fl-modal-fields{grid-template-columns:1fr}}
`;

function safeText(value: string) {
  return value.trim();
}

export default function FoodLabStudioPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<PromptItem | null>(null);
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [headline, setHeadline] = useState("");
  const [price, setPrice] = useState("");
  const [format, setFormat] = useState("4:5 — Feed Instagram");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const pixelId = "2153674188571719";
    if ((window as any).fbq) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    (window as any).fbq = function (...args: any[]) {
      ((window as any).fbq.q = (window as any).fbq.q || []).push(args);
    };
    (window as any)._fbq = (window as any).fbq;
    (window as any).fbq("init", pixelId);
    (window as any).fbq("track", "PageView", { route: window.location.pathname, name: "FoodLab" });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal],.fl-card,.fl-price-card,.fl-showcase-card,.fl-gallery-item").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const els = Array.from(document.querySelectorAll("[data-reveal],.fl-card,.fl-price-card,.fl-showcase-card,.fl-gallery-item"));
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const categories = useMemo(
    () => [
      "Todos",
      ...Array.from(new Set(prompts.map((p) => p.category))),
      "Favoritos",
    ],
    [],
  );
  const visiblePrompts = useMemo(() => {
    const q = query.toLocaleLowerCase("pt-BR").trim();
    return prompts.filter((p) => {
      const matchesCategory =
        category === "Todos" ||
        (category === "Favoritos"
          ? favorites.includes(p.id)
          : p.category === category);
      const matchesQuery =
        !q ||
        `${p.name} ${p.category} ${p.text}`
          .toLocaleLowerCase("pt-BR")
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, favorites]);

  const personalizedPrompt = useMemo(() => {
    if (!selected) return "";
    const fields: [string, string][] = [
      ["Marca", brand],
      ["Produto", product],
      ["Frase publicitária", headline],
      ["Preço", price ? `R$ ${price}` : ""],
      ["Formato", format],
    ].filter((entry) => safeText(entry[1])) as [string, string][];
    return (
      selected.text +
      (fields.length
        ? "\n\n---\nPERSONALIZAÇÃO DO CLIENTE (COMPLEMENTO, SEM ALTERAR O PROMPT ORIGINAL)\n" +
          fields.map(([label, value]) => `${label}: ${value}`).join("\n") +
          "\nUtilize somente as informações fornecidas; não invente ingredientes, preços ou marcas."
        : "")
    );
  }, [selected, brand, product, headline, price, format]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(personalizedPrompt);
      notify("Prompt copiado para a área de transferência.");
    } catch {
      notify(
        "Não foi possível copiar automaticamente. Selecione e copie o texto.",
      );
    }
  };

  return (
    <main className="foodlab-page">
      <style>{styles}</style>
      <div className="fl-shell">
        <header className="fl-nav">
          <a
            className="fl-brand"
            href="/"
            aria-label="FoodLab — início"
          >
            <span className="fl-brand-mark">M</span>
            <span>
              Método <span className="fl-brand-muted">/ FoodLab</span>
            </span>
          </a>
          <nav className="fl-navlinks" aria-label="Navegação principal">
            <a href="#comparacao">Demonstração</a>
            <a href="#metodo">Como funciona</a>
            <a href="#biblioteca">Biblioteca</a>
            <a href="#imagens-ia">Fotos IA</a>
            <a href="#planos">Estúdios</a>
          </nav>
          <a className="fl-nav-cta" href="#contato">
            Vamos conversar <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section data-reveal className="fl-hero" aria-labelledby="fl-hero-title">
          <div className="fl-hero-copy">
            <p className="fl-eyebrow">
              FoodLab + inteligência artificial
            </p>
            <h1 id="fl-hero-title">
              Essa sessão de fotos <em>nunca aconteceu.</em>
            </h1>
            <p>
              Presets, comandos e referências para transformar a sua identidade
              visual em imagens com intenção. Crie novas campanhas a partir das
              fotos que você já tem, sem perder o que torna seu produto único.
            </p>
            <div className="fl-actions">
              <a className="fl-primary" href="https://pay.kiwify.com.br/pDueN25?utm_id=97760_v0_s00_e0_tv4" target="_blank" rel="noopener noreferrer">
                Comprar agora ↗
              </a>
              <a className="fl-secondary" href="#comparacao">
                Ver a transformação
              </a>
            </div>
            <div className="fl-trust">
              ✓ Sem fotógrafo &nbsp; ✓ Sem horas perdidas &nbsp;{" "}
              <b>✓ Sem cara de IA</b>
            </div>
          </div>
          <div className="fl-hero-art-wrap">
            <div className="fl-hero-art">
               <img
                 src="/portfolio/media/imagens/Hamburguer_05.webp"
                 alt="Antes"
                 fetchPriority="high"
               />
               <img
                 src="/portfolio/media/imagens/Cheeseburger artesanal em destaque.webp"
                 alt="Depois"
               />
                <span className="fl-image-stamp" style={{ left: "auto", right: 16 }}>DEPOIS</span>
            </div>
            <span className="fl-image-stamp">
              ANTES
            </span>
          </div>
        </section>

        <section data-reveal className="fl-section fl-showcase" id="comparacao">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">
                Uma foto simples. Uma nova apresentação.
              </p>
              <h2>
                Essas sessões também não aconteceram. Aprenda uma vez. Use
                sempre.
              </h2>
            </div>
            <p>
              Uma referência bem escolhida ajuda a definir a luz, a composição e
              a linguagem visual de cada campanha, sem começar tudo do zero.
            </p>
          </div>
          <div className="fl-showcase-grid">
            {[prompts[0], prompts[1], prompts[1]].map((item, index) => (
              <article className="fl-showcase-card" key={item.id}>
                <img src={item.img} alt={item.name} loading="lazy" />
                <div className="fl-showcase-copy">
                  <span>
                    {
                      [
                        "DIREÇÃO DE ARTE",
                        "PRODUTO EM FOCO",
                        "CENA & EXPERIÊNCIA",
                      ][index]
                    }
                  </span>
                  <h3>
                    {
                      [
                        "Uma campanha com intenção",
                        "O produto continua sendo o centro",
                        "Bastidores que contam",
                      ][index]
                    }
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fl-marquee" aria-label="Imagem. Referência. Intenção.">
        <span>
          IMAGEM <i>✳</i> REFERÊNCIA <i>✳</i> INTENÇÃO <i>✳</i> REPETIÇÃO COM
          IDENTIDADE <i>✳</i> IMAGEM <i>✳</i> REFERÊNCIA <i>✳</i> INTENÇÃO{" "}
          <i>✳</i>
        </span>
      </div>

      <div className="fl-shell">
        <section data-reveal className="fl-section fl-library" id="biblioteca">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">01 / Biblioteca criativa</p>
              <h2>Uma foto. Várias possibilidades.</h2>
            </div>
            <p>
              Escolha um modelo, confira as instruções e personalize o que for
              necessário. O produto original continua sendo a referência
              principal.
            </p>
          </div>
          <div className="fl-metrics">
            <article className="fl-metric">
              <strong>14</strong>
              <p>modelos visuais prontos para explorar</p>
            </article>
            <article className="fl-metric">
              <strong>02</strong>
              <p>direções criativas para campanhas gastronômicas</p>
            </article>
            <article className="fl-metric">
              <strong>01</strong>
              <p>objetivo: manter a identidade do produto</p>
            </article>
          </div>
          <div className="fl-toolbar">
            <input
              className="fl-search"
              aria-label="Buscar modelos"
              placeholder="Buscar por nome, estilo ou palavra-chave..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={`fl-filter ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          {visiblePrompts.length ? (
            <div className="fl-cards">
              {visiblePrompts.map((item) => (
                <article className="fl-card" key={item.id}>
                  <div className="fl-card-image">
                    <img
                      src={item.img}
                      alt={`Referência visual: ${item.name}`}
                      loading="lazy"
                    />
                    <span className="fl-tag">{item.category}</span>
                    <button
                      type="button"
                      className={`fl-heart ${favorites.includes(item.id) ? "saved" : ""}`}
                      aria-label={
                        favorites.includes(item.id)
                          ? "Remover dos favoritos"
                          : "Adicionar aos favoritos"
                      }
                      onClick={() => toggleFavorite(item.id)}
                    >
                      {favorites.includes(item.id) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className="fl-cardbody">
                    <span className="fl-num">
                      PROMPT {String(item.id).padStart(3, "0")}
                    </span>
                    <h3>{item.name}</h3>
                    <p>
                      Direção visual pronta para adaptar à sua marca e ao
                      produto enviado.
                    </p>
                    <div className="fl-cardbottom">
                      <button
                        type="button"
                        className="fl-openbtn"
                        onClick={() => {
                          setSelected(item);
                          setBrand("");
                          setProduct("");
                          setHeadline("");
                          setPrice("");
                          setFormat("4:5 — Feed Instagram");
                        }}
                      >
                        Ver prompt ↗
                      </button>
                      <span className="fl-num">
                        {favorites.includes(item.id)
                          ? "♥ Salvo"
                          : item.text.length + " caracteres"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="fl-empty">
              Nenhum modelo encontrado. Tente outra palavra ou categoria.
            </div>
          )}
        </section>

        <section data-reveal className="fl-section" id="metodo">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">02 / Por que funciona</p>
              <h2>
                Não é mágica.{" "}
                <span style={{ color: "var(--accent)" }}>É contexto.</span>
              </h2>
            </div>
            <p>
              RAG é a ponte entre o que você pede e o que a IA precisa saber. Em
              vez de depender só de uma instrução genérica, a consulta a
              referências ajuda a manter critérios e direção.
            </p>
          </div>
          <div className="fl-how">
            {steps.map((step) => (
              <article className="fl-step" key={step.number}>
                <span className="fl-stepnum">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="fl-section" id="imagens-ia">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">03 / Ideias que ganham forma</p>
              <h2>Primeiro, a imagem ganha direção.</h2>
            </div>
            <p>
              Experimente cenas, luzes e enquadramentos sem perder de vista o
              produto que torna a sua marca única.
            </p>
          </div>
          <div className="fl-gallery">
            {[prompts[0], prompts[1], prompts[0], prompts[1], prompts[0]].map(
              (item) => (
                <div className="fl-gallery-item" key={item.id}>
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span>{item.name}</span>
                </div>
              ),
            )}
          </div>
        </section>

        <section data-reveal className="fl-section fl-onboarding" id="primeiros-passos">
          <div className="fl-onboarding-grid">
            <div className="fl-onboarding-copy">
              <p className="fl-eyebrow">04 / Aprenda uma vez. Use sempre.</p>
              <h2 className="fl-display">
                Você não precisa fazer um curso longo.
              </h2>
              <p>
                Assista a uma aula rápida, entenda como funciona e instale o
                Estúdio Invisível no seu celular. Depois, escolha o estilo,
                copie o prompt e use com a foto do seu produto.
              </p>
              <p className="fl-mantra">
                Aprenda uma vez.
                <br />
                <em>Use sempre que precisar.</em>
              </p>
            </div>
            <div className="fl-onboarding-steps">
              {onboardingSteps.map((step) => (
                <article className="fl-onboarding-step" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className="fl-section">
          <div className="fl-cost">
            <div>
              <p className="fl-eyebrow">05 / O valor da produção</p>
              <h2
                className="fl-display"
                style={{ fontSize: "clamp(34px,4vw,53px)" }}
              >
                Quanto custaria produzir tudo isso do jeito tradicional?
              </h2>
              <p>
                Fotógrafo, captação, iluminação, produção, tratamento, vídeo,
                edição e tempo. Uma produção mais completa pode representar
                centenas ou até milhares de reais.
              </p>
              <ul className="fl-cost-list">
                {traditionalProduction.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <small style={{ color: "var(--muted)" }}>
                *Estimativa de referência. O custo varia de acordo com o escopo
                e a produção.
              </small>
            </div>
            <div className="fl-cost-number">
              <span>UMA PRODUÇÃO COMPLETA PODE CHEGAR A</span>
              <strong>R$ 1.500*</strong>
              <i />
              <span>FOTOGRAFIA · VÍDEO · PÓS-PRODUÇÃO</span>
            </div>
          </div>
        </section>

        <section data-reveal className="fl-section fl-pricing" id="planos">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">06 / Escolha o seu estúdio</p>
              <h2>
                Fotos ou{" "}
                <span style={{ color: "var(--accent)" }}>Fotos + Vídeos.</span>
              </h2>
            </div>
            <p>Um pagamento único. Seu próximo passo criativo começa aqui.</p>
          </div>
          <div className="fl-pricing-grid">
            <article className="fl-price-card">
              <span className="fl-eyebrow">Estúdio Invisível</span>
              <h3>Fotos</h3>
              <p>Crie fotos com direção, método e identidade visual.</p>
              <ul>
                {photoFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="fl-price">
                <strong>R$ 47</strong>
                <span>Pagamento único</span>
              </div>
              <a
                className="fl-secondary"
                href="https://pay.kiwify.com.br/pDueN25?utm_id=97760_v0_s00_e0_tv4"
                target="_blank"
                rel="noopener noreferrer"
                style={{ justifyContent: "center", marginTop: 18 }}
              >
                Quero o Estúdio Fotos ↗
              </a>
            </article>
            <article className="fl-price-card featured">
              <span className="fl-eyebrow">
                Estúdio Invisível · melhor custo-benefício
              </span>
              <h3>Fotos + Vídeos</h3>
              <p>Leve sua criação da imagem ao movimento.</p>
              <ul>
                {videoFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="fl-price">
                <strong>R$ Em-breve</strong>
                <span>Pagamento único</span>
              </div>
              <a
                className="fl-primary"
                href="https://pay.kiwify.com.br/pDueN25?utm_id=97760_v0_s00_e0_tv4"
                target="_blank"
                rel="noopener noreferrer"
                style={{ justifyContent: "center", marginTop: 18 }}
              >
                Quero Fotos + Vídeos ↗
              </a>
            </article>
          </div>
        </section>

        <section data-reveal className="fl-section" id="faq">
          <div className="fl-section-heading">
            <div>
              <p className="fl-eyebrow">07 / Perguntas frequentes</p>
              <h2>Sem mistério.</h2>
            </div>
          </div>
          <div className="fl-faq">
            <details>
              <summary>Preciso treinar um modelo de IA do zero?</summary>
              <p>
                Não. A proposta é configurar instruções e uma base de
                conhecimento consultável por RAG. A IA recupera seus critérios e
                referências na hora de responder — sem treinar um modelo do
                zero.
              </p>
            </details>
            <details>
              <summary>Funciona com ChatGPT e Claude?</summary>
              <p>
                Sim. Os materiais e comandos são organizados para uso com o
                assistente escolhido, respeitando os recursos disponíveis em
                cada plataforma.
              </p>
            </details>
            <details>
              <summary>Posso usar minhas próprias fotos e referências?</summary>
              <p>
                Sim. Suas imagens servem como referências para definir direção
                visual, e os documentos podem reunir presets, critérios de
                edição e exemplos do resultado que você busca.
              </p>
            </details>
          </div>
        </section>

        <section data-reveal className="fl-cta" id="contato">
          <div>
            <p className="fl-eyebrow">
              Uma foto. Várias produções. Nenhuma sessão nova.
            </p>
            <h2>
              Essa foto não teve sessão.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Esse vídeo não teve gravação.
              </span>
            </h2>
            <p>
              E você pode aprender a criar os dois para o seu negócio. Escolha
              uma direção visual, teste a biblioteca e adapte o resultado à sua
              marca.
            </p>
          </div>
          <a className="fl-primary" href="/#contact">
            Fale com a gente ↗
          </a>
        </section>

        <footer className="fl-footer">
          <a
            className="fl-brand"
            href="/"
            aria-label="FoodLab — início"
          >
            <span className="fl-brand-mark">M</span>
            <span>
              MÉTODO <span className="fl-brand-muted">FOODLAB</span>
            </span>
          </a>
          <span>Uma foto. Várias produções. Nenhuma sessão nova.</span>
          <a href="#fl-hero-title">VOLTAR AO TOPO ↑</a>
        </footer>
      </div>

      {selected && (
        <div
          className="fl-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className="fl-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fl-modal-title"
          >
            <aside className="fl-modal-left">
              <img src={selected.img} alt={selected.name} />
              <h2 id="fl-modal-title">{selected.name}</h2>
              <p>
                Prompt {String(selected.id).padStart(3, "0")} · texto original
                preservado
              </p>
              <div className="fl-modal-fields">
                <div className="fl-field">
                  <label htmlFor="fl-brand">Marca</label>
                  <input
                    id="fl-brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Nome da marca"
                  />
                </div>
                <div className="fl-field">
                  <label htmlFor="fl-product">Produto</label>
                  <input
                    id="fl-product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Ex.: hambúrguer artesanal"
                  />
                </div>
                <div className="fl-field">
                  <label htmlFor="fl-headline">Frase publicitária</label>
                  <input
                    id="fl-headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Opcional"
                  />
                </div>
                <div className="fl-field">
                  <label htmlFor="fl-price">Preço (opcional)</label>
                  <input
                    id="fl-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex.: 29,90"
                  />
                </div>
                <div className="fl-field">
                  <label htmlFor="fl-format">Formato</label>
                  <select
                    id="fl-format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <option>4:5 — Feed Instagram</option>
                    <option>9:16 — Stories / Reels</option>
                    <option>1:1 — Quadrado</option>
                    <option>16:9 — Horizontal</option>
                  </select>
                </div>
              </div>
            </aside>
            <div className="fl-modal-right">
              <div className="fl-modal-toolbar">
                <h3>Prompt completo</h3>
                <button
                  type="button"
                  className="fl-modal-close"
                  onClick={() => setSelected(null)}
                >
                  Fechar ×
                </button>
              </div>
              <div className="fl-prompt-text">{personalizedPrompt}</div>
              <div className="fl-modal-actions">
                <button
                  type="button"
                  className="fl-primary"
                  onClick={copyPrompt}
                >
                  Copiar prompt completo ↗
                </button>
                <button
                  type="button"
                  className="fl-secondary"
                  onClick={() => toggleFavorite(selected.id)}
                >
                  {favorites.includes(selected.id)
                    ? "♥ Remover dos favoritos"
                    : "♡ Favoritar modelo"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      {toast && (
        <div className="fl-toast" role="status">
          {toast}
        </div>
      )}
    </main>
  );
}
