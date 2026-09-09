import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle, HiArrowRight } from "react-icons/hi2";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import { isAuthenticated } from "../../utils/session";

type Status = "loading" | "succeeded" | "failed" | "processing";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [status, setStatus] = useState<Status>(sessionId ? "loading" : "failed");

  useEffect(() => {
    if (!sessionId) {
      notifyToast("Sessão de checkout não encontrada.", "error");
      return;
    }

    fonsecaApi.stripe
      .getSession(sessionId)
      .then((res) => {
        const paymentStatus = res?.data?.paymentStatus;

        if (
          paymentStatus === "paid" ||
          paymentStatus === "no_payment_required"
        ) {
          setStatus("succeeded");
          notifyToast("Pagamento concluído com sucesso!", "success");
        } else {
          setStatus("processing");
        }
      })
      .catch(() => {
        setStatus("failed");
        notifyToast("Não foi possível confirmar o pagamento.", "error");
      });
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="w-full max-w-md rounded-2xl border border-secondary bg-card p-8 text-center">
        {status === "succeeded" && (
          <>
            <HiCheckCircle
              className="mx-auto mb-4 text-5xl text-green-400"
              size={48}
            />
            <h1 className="text-2xl font-bold text-primary">
              Pagamento concluído!
            </h1>
            <p className="mt-2 text-sm text-secondaryText/60">
              Seu pagamento foi registrado com sucesso. Em breve a assinatura
              ou aquisição será aplicada à sua conta.
            </p>
            <button
              onClick={() =>
                navigate(isAuthenticated() ? "/dashboard/plans" : "/")
              }
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90"
            >
              <HiArrowRight size={16} />
              {isAuthenticated() ? "Ir para meus planos" : "Ir para a home"}
            </button>
          </>
        )}

        {status === "processing" && (
          <>
            <p className="text-secondaryText/70">
              Seu pagamento está sendo processado. Aguarde um momento e
              atualize a página para conferir o status.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <HiXCircle
              className="mx-auto mb-4 text-5xl text-red-400"
              size={48}
            />
            <h1 className="text-2xl font-bold text-primary">
              Pagamento não confirmado
            </h1>
            <p className="mt-2 text-sm text-secondaryText/60">
              Não foi possível confirmar o status do seu pagamento. Verifique
              e tente novamente.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-xl border border-secondary px-5 py-3 font-semibold text-secondaryText transition hover:border-primary"
            >
              Voltar para a home
            </button>
          </>
        )}

        {status === "loading" && (
          <p className="text-secondaryText/70">Verificando pagamento...</p>
        )}
      </div>
    </div>
  );
}
