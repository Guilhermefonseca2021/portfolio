import About from "../components/dev/About/About";
import Contact from "../components/dev/Contact/Contact";
import Footer from "../components/dev/Footer/Footer";
import Header from "../components/dev/Header/Header";
import Hero from "../components/dev/Hero/Hero";
import Projects from "../components/dev/Projects/Projects";
import Services from "../components/dev/services/Services";
import PageSeo from "../components/seo/PageSeo";

export default function PortfolioDev() {
  return (
    <div className="min-h-screen overflow-hidden bg-bg text-secondaryText">
      <PageSeo
        title="Desenvolvimento web sob medida | Fonseca Digital"
        description="Portfólio de desenvolvimento web, produtos digitais e automações construídos para transformar operações e negócios."
        path="/dev"
        keywords="desenvolvimento web, React, TypeScript, automação, produto digital"
      />
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primaryText">Ir para o conteúdo</a>
      <Header />

      <main id="conteudo-principal" className="relative">
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-black/[.08] bg-white/80 p-1.5 shadow-xl backdrop-blur-xl md:flex">
          <a className="pointer-events-auto rounded-full bg-secondaryText px-4 py-2 text-xs font-medium text-primaryText" href="#projetos">Projetos</a>
          <a className="pointer-events-auto rounded-full px-4 py-2 text-xs font-medium text-secondaryText/70 hover:bg-bgAccent" href="#servicos">Serviços</a>
          <a className="pointer-events-auto rounded-full px-4 py-2 text-xs font-medium text-secondaryText/70 hover:bg-bgAccent" href="#contato">Contato</a>
        </div>
        <Hero />
        <About />
        <div id="projetos"><Projects /></div>
        <div id="servicos"><Services /></div>
        <div id="contato"><Contact /></div>
      </main>

      <Footer />
    </div>
  );
}
