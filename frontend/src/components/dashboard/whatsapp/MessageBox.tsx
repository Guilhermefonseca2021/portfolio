import { HiPaperAirplane } from "react-icons/hi2";

export default function MessageBox() {
  return (
    <div
      className="
p-4
border-t
border-secondaryText/10
flex
gap-3
"
    >
      <input
        placeholder="Digite uma mensagem..."
        className="
flex-1
bg-bg
border
border-secondaryText/20
rounded-xl
px-4
py-3
outline-none
text-primary
"
      />

      <button
        className="
bg-primary
text-primaryText
px-5
rounded-xl
"
      >
        <HiPaperAirplane size={20} />
      </button>
    </div>
  );
}
