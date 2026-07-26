import { HiMenu, HiBell, HiSearch } from "react-icons/hi";

interface Props {
  setOpen: (v: boolean) => void;
}

export default function Navbar({ setOpen }: Props) {
  return (
    <header
      className="
      sticky
      top-0
      z-20
      h-[72px]
      bg-card/80
      backdrop-blur-xl
      border-b
      border-secondary/60
      px-6
      flex
      items-center
      justify-between
    "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="
          lg:hidden
          w-10
          h-10
          rounded-xl
          bg-secondary
          flex
          items-center
          justify-center
        "
        >
          <HiMenu />
        </button>

        <div
          className="
          hidden
          md:flex
          items-center
          gap-3
          px-4
          h-11
          rounded-xl
          bg-bg
          border
          border-secondary
          w-80
        "
        >
          <HiSearch size={18} />

          <input
            placeholder="Pesquisar..."
            className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            placeholder:text-secondaryText/40
          "
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
          w-11
          h-11
          rounded-xl
          bg-secondary
          flex
          items-center
          justify-center
        "
        >
          <HiBell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="font-semibold">Guilherme</h3>

            <p className="text-xs text-secondaryText/50">Administrator</p>
          </div>

          <div
            className="
            w-11
            h-11
            rounded-full
            bg-primary
          "
          />
        </div>
      </div>
    </header>
  );
}
