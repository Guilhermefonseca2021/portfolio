import About from "../components/dev/About/About";
import Contact from "../components/dev/Contact/Contact";
import Footer from "../components/dev/Footer/Footer";
import Header from "../components/dev/Header/Header";
import Hero from "../components/dev/Hero/Hero";
import Projects from "../components/dev/Projects/Projects";
import Services from "../components/dev/services/Services";

export default function PortfolioDev() {
  return (
    <div className="min-h-screen bg-bg text-secondaryText">
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
