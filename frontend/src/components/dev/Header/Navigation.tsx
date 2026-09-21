import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import TranslateButton from "../Language/LanguageButton";

const links = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Serviços", href: "#services" },
  { label: "Contato", href: "#contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      <ul className="hidden items-center gap-10 text-sm font-medium text-secondaryText lg:flex">
        {links.map((link) => (
          <li key={link.href}><a href={link.href} className="transition duration-300 hover:text-primary">{link.label}</a></li>
        ))}
        <TranslateButton />
      </ul>
      <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 text-2xl text-secondaryText lg:hidden">
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      {open && (
        <div className="absolute right-0 top-14 w-56 rounded-2xl border border-black/[.08] bg-white/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-secondaryText">
            {links.map((link) => (
              <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 hover:bg-bgAccent">{link.label}</a></li>
            ))}
            <li className="px-4 py-3"><TranslateButton /></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
