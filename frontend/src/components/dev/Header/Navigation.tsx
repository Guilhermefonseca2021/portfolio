import TranslateButton from "../Language/LanguageButton";

const links = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Serviços", href: "#services" },
  { label: "Contato", href: "#contact" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="hidden items-center gap-10 text-sm font-medium text-secondaryText lg:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="transition duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
        <TranslateButton />
      </ul>
    </nav>
  );
}
