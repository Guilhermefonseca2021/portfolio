import {
  HiSquares2X2,
  HiUsers,
  HiFolder,
  HiCreditCard,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
  HiChevronRight,
} from "react-icons/hi2";

import NavItem from "./NavItem";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Sidebar({ open, setOpen }: Props) {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-72
          bg-card
          border-r border-secondary/60
          flex flex-col
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-20 items-center border-b border-secondary/60 px-6">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>

            <p className="text-sm text-secondaryText/50">
              Painel Administrativo
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-5">
          <NavItem to="/dashboard" icon={<HiSquares2X2 size={20} />}>
            Dashboard
          </NavItem>

          <NavItem to="/clientes" icon={<HiUsers size={20} />}>
            Clientes
          </NavItem>

          <NavItem to="/contratos" icon={<HiFolder size={20} />}>
            Contratos
          </NavItem>

          <NavItem to="/financeiro" icon={<HiCreditCard size={20} />}>
            Financeiro
          </NavItem>

          <NavItem
            to="/configuracoes"
            icon={<HiCog6Tooth size={20} />}
            right={<HiChevronRight size={18} />}
          >
            Configurações
          </NavItem>
        </nav>

        <div className="border-t border-secondary/60 p-5">
          <button
            className="
              flex w-full items-center gap-3
              rounded-xl px-4 py-3
              text-secondaryText/70
              transition
              hover:bg-secondary
            "
          >
            <HiArrowLeftOnRectangle size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
