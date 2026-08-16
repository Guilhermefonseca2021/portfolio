import { HiPaperAirplane } from "react-icons/hi2";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function MessageBox({
  value,
  onChange,
  onSend,
  disabled,
}: Props) {
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
        disabled={disabled}
      />

      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="
bg-primary
text-primaryText
px-5
rounded-xl
disabled:opacity-50
"
      >
        <HiPaperAirplane size={20} />
      </button>
    </div>
  );
}
