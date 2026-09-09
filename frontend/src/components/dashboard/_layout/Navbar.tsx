import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { HiMagnifyingGlass, HiUser, HiBell, HiBars3 } from "react-icons/hi2";

interface Props {
  setOpen: (v: boolean) => void;
}

export default function Navbar({ setOpen }: Props) {
  const { user } = useUserContext();

  const userName = user?.name ?? "Usuário";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 h-16 bg-card/80 backdrop-blur-xl border-b border-secondary/60 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
          aria-label="Abrir menu"
        >
          <HiBars3 />
        </button>

        <div className="hidden md:flex items-center gap-3 px-4 h-10 rounded-xl bg-bg border border-secondary w-80">
          <HiMagnifyingGlass size={18} className="text-secondaryText/40" />
          <input
            placeholder="Pesquisar..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-secondaryText/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/profile"
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center transition hover:border-primary hover:text-primary"
          title="Perfil"
        >
          <HiUser size={20} />
        </Link>

        <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center" title="Notificações">
          <HiBell size={20} />
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-secondary/60">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-secondaryText">{userName}</p>
            <p className="text-xs text-secondaryText/50">{user?.role?.name ?? "Sem função"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold text-primaryText">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
}