import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiUsers,
  HiBriefcase,
  HiCurrencyDollar,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiBolt,
  HiCog6Tooth,
  HiPhoto,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const navigation = [
  {
    group: "Principal",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: HiHome },
    ],
  },
  {
    group: "Gestão",
    items: [
      { label: "Clientes", href: "/dashboard/clients", icon: HiUsers },
      { label: "Leads", href: "/dashboard/leads", icon: HiUsers },
      { label: "Contratos", href: "/dashboard/contracts", icon: HiBriefcase },
    ],
  },
  {
    group: "Financeiro",
    items: [
      { label: "Financeiro", href: "/dashboard/finance", icon: HiCurrencyDollar },
      { label: "Relatórios", href: "/dashboard/reports", icon: HiChartBar },
    ],
  },
  {
    group: "Comunicação",
    items: [
      { label: "WhatsApp", href: "/dashboard/whatsapp", icon: HiChatBubbleLeftRight },
      { label: "Automações", href: "/dashboard/automations", icon: HiBolt },
    ],
  },
  {
    group: "Serviços",
    items: [
      { label: "Imagens", href: "/dashboard/services/images", icon: HiPhoto },
    ],
  },
  {
    group: "Sistema",
    items: [
      { label: "Configurações", href: "/dashboard/settings", icon: HiCog6Tooth },
    ],
  },
];

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
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-white/[.08] bg-card/95 backdrop-blur-2xl transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex h-16 items-center border-b border-secondary/60 px-6">
          <div>
            <h1 className="text-lg font-bold text-primary">Fonseca</h1>
            <p className="text-xs text-secondaryText/50">Painel Administrativo</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.group}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-secondaryText/40">
                {section.group}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-primary text-primaryText"
                          : "text-secondaryText/70 hover:bg-secondary hover:text-secondaryText"
                      }`
                    }
                  >
                    <item.icon size={20} aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer - User / Logout */}
        <div className="border-t border-secondary/60 p-4">
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
