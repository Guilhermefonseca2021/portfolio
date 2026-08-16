import { useMemo } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Dashboard() {
  const { user, company, loading } = useUserContext();

  const greeting = useMemo(() => {
    if (loading) {
      return "Carregando informações...";
    }

    if (!user && !company) {
      return "Dados do painel ainda não estão disponíveis.";
    }

    return `Bem-vindo, ${user?.name ?? "usuário"}`;
  }, [loading, user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

        <p className="mt-2 text-secondaryText/60">{greeting}</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-secondary bg-card p-6">
          <p className="text-secondaryText/70">Carregando dados do backend...</p>
        </div>
      ) : !user && !company ? (
        <div className="rounded-2xl border border-secondary bg-card p-6">
          <p className="text-secondaryText/70">
            Nenhum dado de usuário ou empresa foi carregado. As informações
            aparecerão aqui assim que estiverem disponíveis no backend.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-secondary bg-card p-6">
            <h2 className="text-xl font-semibold text-secondaryText">Perfil</h2>
            <div className="mt-5 space-y-3 text-sm text-secondaryText/80">
              <p>
                <span className="font-semibold text-secondaryText">Nome:</span>{" "}
                {user?.name ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-secondaryText">Email:</span>{" "}
                {user?.email ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-secondaryText">Função:</span>{" "}
                {user?.role?.name ?? "-"}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-secondary bg-card p-6">
            <h2 className="text-xl font-semibold text-secondaryText">Empresa</h2>
            <div className="mt-5 space-y-3 text-sm text-secondaryText/80">
              <p>
                <span className="font-semibold text-secondaryText">Nome:</span>{" "}
                {company?.name ?? user?.company?.name ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-secondaryText">Nome fantasia:</span>{" "}
                {company?.fantasyName ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-secondaryText">Status:</span>{" "}
                {company?.status ?? user?.company?.status ?? "-"}
              </p>
            </div>
          </section>
        </div>
      )}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <h2 className="text-xl font-semibold text-secondaryText">
          Dados adicionais
        </h2>
        <p className="mt-3 text-secondaryText/70">
          Métricas detalhadas ainda não estão disponíveis. Quando o backend
          fornecer mais dados, esses cards e gráficos serão preenchidos com
          informações reais.
        </p>
      </section>
    </div>
  );
}
