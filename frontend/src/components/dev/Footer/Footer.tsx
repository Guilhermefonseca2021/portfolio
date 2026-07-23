import FooterColumn from "./FooterColumn";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-3">
        <div>
          <h2 className="text-3xl font-black text-primary">Fonseca.dev</h2>

          <p className="mt-6 leading-8 text-secondaryText/70">
            Desenvolvimento de sistemas modernos, aplicações web, mobile e
            soluções com IA.
          </p>
        </div>

        <FooterColumn
          title="Navegação"
          links={["Início", "Sobre", "Projetos", "Serviços", "Contato"]}
        />

        <FooterSocial />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-secondaryText/60 md:flex-row">
          <span>© 2026 Guilherme Fonseca.</span>

          <span>Engenheiro de software</span>
        </div>
      </div>
    </footer>
  );
}
