const links = [
  {
    title: "Início",
    href: "#home",
  },
  {
    title: "Serviços",
    href: "#services",
  },
  {
    title: "Contato",
    href: "#contact",
  },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="hidden items-center gap-10 lg:flex">
        {links.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              className="font-medium text-white/80 transition hover:text-primary"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
