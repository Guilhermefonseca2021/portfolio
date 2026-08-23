import {
  HiArrowLeftOnRectangle,
  HiBolt,
  HiBuildingOffice2,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiChevronRight,
  HiCog6Tooth,
  HiCurrencyDollar,
  HiPhoto,
  HiSquares2X2,
  HiUserGroup,
  HiUsers,
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
          fixed left-0 top-0 z-40
          flex h-screen w-72 flex-col
          border-r border-secondary/60
          bg-card
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-20 items-center border-b border-secondary/60 px-6">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>

            <p className="text-sm text-secondaryText/50">
              Painel Administrativo
            </p>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto p-5">
          {/* GERAL */}
          <div className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              Geral
            </p>

            <div className="space-y-2">
              <NavItem to="/dashboard" icon={<HiSquares2X2 size={20} />}>
                Dashboard
              </NavItem>
            </div>
          </div>

          {/* CRM */}
          <div className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              CRM
            </p>

            <div className="space-y-2">
              <NavItem to="/dashboard/clients" icon={<HiUsers size={20} />}>
                Clientes
              </NavItem>

              <NavItem to="/dashboard/leads" icon={<HiUserGroup size={20} />}>
                Leads
              </NavItem>

              <NavItem
                to="/dashboard/crm"
                icon={<HiBuildingOffice2 size={20} />}
              >
                CRM
              </NavItem>
            </div>
          </div>

          {/* FINANCEIRO */}
          <div className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              Financeiro
            </p>

            <div className="space-y-2">
              <NavItem
                to="/dashboard/finance"
                icon={<HiCurrencyDollar size={20} />}
              >
                Financeiro
              </NavItem>
            </div>
          </div>

          {/* AUTOMAÇÃO */}
          <div className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              Automação
            </p>

            <div className="space-y-2">
              <NavItem
                to="/dashboard/whatsapp"
                icon={<HiChatBubbleLeftRight size={20} />}
              >
                WhatsApp
              </NavItem>

              <NavItem to="/dashboard/automations" icon={<HiBolt size={20} />}>
                Automações
              </NavItem>
            </div>
          </div>

          {/* RELATÓRIOS */}
          <div className="mb-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              Análises
            </p>

            <div className="space-y-2">
              <NavItem to="/dashboard/reports" icon={<HiChartBar size={20} />}>
                Relatórios
              </NavItem>
            </div>
          </div>

          {/* SISTEMA */}
          <div>
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
              Sistema
            </p>

            <div className="space-y-2">
              <NavItem
                to="/dashboard/settings"
                icon={<HiCog6Tooth size={20} />}
                right={<HiChevronRight size={18} />}
              >
                Configurações
              </NavItem>

              <NavItem
                to="/dashboard/services/images"
                icon={<HiPhoto size={20} />}
                right={<HiChevronRight size={18} />}
              >
                Serviços › Imagens
              </NavItem>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-secondary/60 p-5">
          <button
            className="
              flex w-full items-center gap-3
              rounded-xl px-4 py-3
              text-secondaryText/70
              transition-all
              hover:bg-secondary
              hover:text-primary
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
