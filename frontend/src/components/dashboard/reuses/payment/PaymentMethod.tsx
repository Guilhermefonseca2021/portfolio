import {
  HiCreditCard,
  HiPencilSquare,
  HiTrash,
  HiShieldCheck,
} from "react-icons/hi2";

interface PaymentMethodProps {
  brand?: string;
  number?: string;
  holder?: string;
  expiry?: string;
  defaultMethod?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PaymentMethod({
  brand = "Visa",
  number = "**** **** **** 4242",
  holder = "Guilherme Fonseca",
  expiry = "12/28",
  defaultMethod = true,
  onEdit,
  onDelete,
}: PaymentMethodProps) {
  return (
    <section className="rounded-2xl border border-secondary bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            Método de Pagamento
          </span>

          <h2 className="mt-4 text-2xl font-bold text-secondaryText">
            Cartão Principal
          </h2>

          <p className="mt-2 text-secondaryText/60">
            Utilizado para cobranças recorrentes.
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <HiCreditCard size={26} className="text-primary" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-secondary bg-secondary p-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-secondaryText">
            {brand}
          </span>

          {defaultMethod && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primaryText">
              Principal
            </span>
          )}
        </div>

        <p className="mt-6 text-xl tracking-[0.3rem] text-secondaryText">
          {number}
        </p>

        <div className="mt-6 flex justify-between">
          <div>
            <p className="text-xs uppercase text-secondaryText/50">Titular</p>

            <p className="mt-1 font-medium text-secondaryText">{holder}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-secondaryText/50">Expira</p>

            <p className="mt-1 font-medium text-secondaryText">{expiry}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3">
        <HiShieldCheck size={20} className="text-primary" />

        <span className="text-sm text-secondaryText/70">
          Seus dados são protegidos e criptografados.
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={onEdit}
          className="
            flex items-center gap-2
            rounded-xl
            bg-primary
            px-5 py-3
            font-semibold
            text-primaryText
            transition
            hover:opacity-90
          "
        >
          <HiPencilSquare size={18} />
          Editar cartão
        </button>

        <button
          onClick={onDelete}
          className="
            flex items-center gap-2
            rounded-xl
            border border-secondary
            bg-secondary
            px-5 py-3
            font-semibold
            text-secondaryText
            transition
            hover:border-red-500
            hover:text-red-400
          "
        >
          <HiTrash size={18} />
          Remover
        </button>
      </div>
    </section>
  );
}
