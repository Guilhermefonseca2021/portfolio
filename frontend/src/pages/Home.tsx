import Footer from "../components/dev/Footer/Footer";
import ForCompanies from "../components/home/ForCompanies/ForCompanies";
import ForProfessionals from "../components/home/ForProfessionals/ForProfessionals";
import Header from "../components/home/Header/Header";
import Hero from "../components/home/Hero/Hero";
import PlatformPreview from "../components/home/Platform/PlatformPreview";
import ServicesGrid from "../components/home/Services/ServicesGrid";
import Solution from "../components/home/Solution/Solution";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-secondaryText">
      <Header />

      <Hero />

      <Solution />

      <PlatformPreview />

      <ServicesGrid />

      <ForCompanies />

      <ForProfessionals />

      <Footer />
    </main>
  );
}
