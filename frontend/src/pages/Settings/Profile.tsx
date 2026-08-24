import { useEffect, useState } from "react";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Company } from "../../types/api";

export default function Profile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fonsecaApi.company.getMe();
        setCompany(data);
      } catch {
        notifyToast("Erro ao carregar perfil.", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-secondaryText/70">Carregando perfil...</p>;
  }

  if (!company) {
    return (
      <p className="text-secondaryText/70">Empresa não encontrada.</p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Perfil</h1>
        <p className="mt-2 text-secondaryText/60">Informações da sua empresa.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-secondary bg-card p-6">
          <h2 className="text-xl font-semibold text-secondaryText">Dados da empresa</h2>
          <div className="mt-5 space-y-3 text-sm text-secondaryText/80">
            <p><span className="font-semibold text-secondaryText">Nome:</span> {company.name}</p>
            <p><span className="font-semibold text-secondaryText">Fantasia:</span> {company.fantasyName ?? "-"}</p>
            <p><span className="font-semibold text-secondaryText">Documento:</span> {company.document ?? "-"}</p>
            <p><span className="font-semibold text-secondaryText">Email:</span> {company.email ?? "-"}</p>
            <p><span className="font-semibold text-secondaryText">Telefone:</span> {company.phone ?? "-"}</p>
            <p><span className="font-semibold text-secondaryText">Website:</span> {company.website ?? "-"}</p>
            <p><span className="font-semibold text-secondaryText">Plano:</span> {company.plan ?? "BASE"}</p>
            <p><span className="font-semibold text-secondaryText">Status:</span> {company.status ?? "-"}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-secondary bg-card p-6">
          <h2 className="text-xl font-semibold text-secondaryText">Ações rápidas</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/dashboard/profile/update"
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90"
            >
              Editar perfil
            </a>
            <a
              href="/dashboard/plans"
              className="rounded-xl border border-secondary bg-secondary px-5 py-3 font-semibold text-secondaryText transition hover:border-primary"
            >
              Ver planos
            </a>
            <a
              href="/dashboard/contracts"
              className="rounded-xl border border-secondary bg-secondary px-5 py-3 font-semibold text-secondaryText transition hover:border-primary"
            >
              Contratos
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
