import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-black/[.06] bg-white/75 backdrop-blur-2xl"
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
          "
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-secondaryText text-sm font-semibold text-primaryText">
            F
          </div>

          <span
            className="
              text-xl
              font-bold
              tracking-tight
              text-secondaryText
            "
          >
            Fonseca
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          <a
            href="#services"
            className="text-sm text-secondaryText/70 transition hover:text-primary"
          >
            Serviços
          </a>

          <Link
            to="/socialmedia"
            onClick={() => setOpen(false)}
            className="py-3 text-secondaryText hover:text-primary"
          >
            Portfólio
          </Link>
          <a
            href="#contact"
            className="py-3 text-secondaryText hover:text-primary"
          >
            Contato
          </a>
        </nav>

        {/* Desktop Actions */}
        <div
          className="
            hidden
            items-center
            gap-3
            lg:flex
          "
        >
          <Link
            to="/login"
            className="
              rounded-full
              px-5
              py-2
              text-sm
              text-secondaryText/80
              transition
              hover:text-primary
            "
          >
            Entrar
          </Link>

          <Link
            to="/register"
            className="
              rounded-full
              bg-primary
              px-5
              py-2.5
              text-sm
              font-semibold
              text-primaryText
              transition
              hover:scale-105
            "
          >
            Criar conta
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
            text-3xl
            text-white
            lg:hidden
          "
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            border-t
            border-white/10
            bg-bg/95
            backdrop-blur-xl
            lg:hidden
          "
        >
          <nav className="flex flex-col px-6 py-6">
            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="py-3 text-secondaryText hover:text-primary"
            >
              Serviços
            </a>

            <Link
              to="/socialmedia"
              onClick={() => setOpen(false)}
              className="py-3 text-secondaryText hover:text-primary"
            >
              Portfólio
            </Link>

            <a
              href="#clients"
              onClick={() => setOpen(false)}
              className="py-3 text-secondaryText hover:text-primary"
            >
              Clientes
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="py-3 text-secondaryText hover:text-primary"
            >
              Contato
            </a>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="
                  rounded-full
                  border
                  border-white/10
                  py-3
                  text-center
                  text-secondaryText
                  transition
                  hover:border-primary
                  hover:text-primary
                "
              >
                Entrar
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="
                  rounded-full
                  bg-primary
                  py-3
                  text-center
                  font-semibold
                  text-primaryText
                  transition
                  hover:scale-[1.02]
                "
              >
                Criar conta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
