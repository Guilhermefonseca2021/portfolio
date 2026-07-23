import Captures from "../components/media/Captures/Captures";
import Clients from "../components/media/Clients/Clients";
import Contact from "../components/media/Contact/Contact";
import Header from "../components/media/Header/Header";
import Hero from "../components/media/Hero/Hero";
import ProblemSection from "../components/media/ProblemSection/ProblemSection";
import Services from "../components/media/Services/Services";
import ThreeCamera from "../components/media/ThreeCamera/ThreeCamera";

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
    <main
      className="
        min-h-screen
        space-y-0
        bg-bg
        text-secondaryText
      "
    >
      <Header />

      <div className="space-y-0">
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
    </main>
  );
}
