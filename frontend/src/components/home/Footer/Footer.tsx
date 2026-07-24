const columns = [
  {
    title: "Plataforma",
    links: ["Dashboard", "CRM", "Financeiro", "Automações", "Relatórios"],
  },
  {
    title: "Serviços",
    links: [
      "Desenvolvimento",
      "Social Media",
      "Design",
      "Marketing",
      "Inteligência Artificial",
    ],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Profissionais", "Clientes", "Contato"],
  },
];

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-white/10
        bg-bg
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
        "
      >
        <div
          className="
            grid
            gap-10
            md:grid-cols-4
          "
        >
          {/* Marca */}
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary
                  font-bold
                  text-primaryText
                "
              >
                F
              </div>

              <span
                className="
                  text-xl
                  font-bold
                  text-secondaryText
                "
              >
                Fonseca
                <span className="text-primary">.</span>
              </span>
            </div>

            <p
              className="
                mt-5
                max-w-xs
                text-sm
                leading-6
                text-secondaryText/60
              "
            >
              Uma plataforma que conecta empresas, profissionais e tecnologia
              para transformar serviços digitais em resultados.
            </p>

            <div
              className="
                mt-6
                flex
                gap-3
              "
            >
              {["Instagram", "LinkedIn", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="
                    rounded-full
                    border
                    border-white/10
                    px-3
                    py-1.5
                    text-xs
                    text-secondaryText/70
                    transition
                    hover:border-primary/40
                    hover:text-primary
                  "
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3
                className="
                  text-sm
                  font-semibold
                  text-secondaryText
                "
              >
                {column.title}
              </h3>

              <ul
                className="
                  mt-5
                  space-y-3
                "
              >
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        text-sm
                        text-secondaryText/60
                        transition
                        hover:text-primary
                      "
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Portfolios */}
        <div
          className="
            mt-12
            flex
            flex-col
            gap-4
            rounded-3xl
            border
            border-white/10
            bg-card
            p-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h3
              className="
                font-semibold
                text-secondaryText
              "
            >
              Conheça nossos trabalhos
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-secondaryText/60
              "
            >
              Veja projetos desenvolvidos pela nossa equipe.
            </p>
          </div>

          <div
            className="
              flex
              gap-3
            "
          >
            <a
              href="/dev"
              className="
                rounded-full
                border
                border-white/10
                px-5
                py-2
                text-sm
                text-secondaryText
                transition
                hover:border-primary
              "
            >
              Fonseca Dev
            </a>

            <a
              href="/socialmedia"
              className="
                rounded-full
                bg-primary
                px-5
                py-2
                text-sm
                font-semibold
                text-primaryText
              "
            >
              Social Media
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-white/10
            pt-6
            text-sm
            text-secondaryText/50
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Fonseca. Todos os direitos reservados.
          </p>

          <div className="flex gap-5">
            <a href="#">Termos</a>

            <a href="#">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
