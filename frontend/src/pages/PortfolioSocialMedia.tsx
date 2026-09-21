import Captures from "../components/media/Captures/Captures";
import Clients from "../components/media/Clients/Clients";
import Contact from "../components/media/Contact/Contact";
import Header from "../components/media/Header/Header";
import Hero from "../components/media/Hero/Hero";
import ProblemSection from "../components/media/ProblemSection/ProblemSection";
import Services from "../components/media/Services/Services";
import ThreeCamera from "../components/media/ThreeCamera/ThreeCamera";
import PageSeo from "../components/seo/PageSeo";

import { useEffect, useState } from "react";

export default function PortfolioSocialMedia() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

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
      <Header />

      <div id="conteudo-social" className="relative bg-[#0b1220]">
        <div className="space-y-0 bg-[#0b1220]">
          <Hero />

          <Clients />

          <div className="relative space-y-0">
            {isDesktop && (
              <div
                className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-20
                h-[900px]
                w-[600px]
              "
              >
                <div className="h-[620px] w-[620px]">
                  <ThreeCamera />
                </div>
              </div>
            )}

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
