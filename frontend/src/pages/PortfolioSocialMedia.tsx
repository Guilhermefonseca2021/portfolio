import Captures from "../components/media/Captures/Captures";
import Clients from "../components/media/Clients/Clients";
import Contact from "../components/media/Contact/Contact";
import Header from "../components/media/Header/Header";
import Hero from "../components/media/Hero/Hero";
import ProblemSection from "../components/media/ProblemSection/ProblemSection";
import Services from "../components/media/Services/Services";
import PageSeo from "../components/seo/PageSeo";


export default function PortfolioSocialMedia() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1220] text-white">
      <PageSeo
        title="Social media estratégico para marcas | Fonseca Digital"
        description="Estratégia, conteúdo e performance para marcas que querem crescer nas redes sociais com clareza, consistência e resultado."
        path="/socialmedia"
        keywords="social media, estratégia de conteúdo, branding, marketing digital, performance"
      />
      <a
        href="#conteudo-social"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primaryText"
      >
        Ir para o conteúdo
      </a>
      <Header dark />

      <div id="conteudo-social" className="relative bg-[#0b1220]">
        <div className="space-y-0 bg-[#0b1220]">
          <Hero />

          <Clients />

          <div className="relative space-y-0">
            <ProblemSection />

            <Captures />

            <Services />

            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
