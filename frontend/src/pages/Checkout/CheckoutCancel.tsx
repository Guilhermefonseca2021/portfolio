import { HiXCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function CheckoutCancel() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="w-full max-w-md rounded-2xl border border-secondary bg-card p-8 text-center">
        <HiXCircle className="mx-auto mb-4 text-5xl text-red-400" size={48} />
        <h1 className="text-2xl font-bold text-primary">Pagamento cancelado</h1>
        <p className="mt-2 text-sm text-secondaryText/60">
          Sua transação foi cancelada. Nenhuma cobrança foi realizada.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl border border-secondary px-5 py-3 font-semibold text-secondaryText transition hover:border-primary"
        >
          Voltar para a home
        </button>
      </div>
    </div>
  );
}
