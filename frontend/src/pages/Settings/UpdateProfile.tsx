import { useEffect, useState } from "react";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Company } from "../../types/api";

export default function UpdateProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    fantasyName: "",
    document: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await fonsecaApi.company.getMe();
        setCompany(data);
        setForm({
          name: data.name ?? "",
          fantasyName: data.fantasyName ?? "",
          document: data.document ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          website: data.website ?? "",
        });
      } catch {
        notifyToast("Erro ao carregar perfil.", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company) return;

    try {
      setSaving(true);
      const updated = await fonsecaApi.company.updateMe({
        name: form.name || undefined,
        fantasyName: form.fantasyName || null,
        document: form.document || null,
        email: form.email || null,
        phone: form.phone || null,
        website: form.website || null,
      });
      setCompany(updated);
      notifyToast("Perfil atualizado com sucesso.", "success");
    } catch {
      notifyToast("Erro ao atualizar perfil.", "error");
    } finally {
      setSaving(false);
    }
  }

  function updateForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return <p className="text-secondaryText/70">Carregando...</p>;
  }

  if (!company) {
    return <p className="text-secondaryText/70">Empresa não encontrada.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Atualizar perfil</h1>
        <p className="mt-2 text-secondaryText/60">Altere os dados da sua empresa.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Nome</label>
            <input value={form.name} onChange={(e) => updateForm("name", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Fantasia</label>
            <input value={form.fantasyName} onChange={(e) => updateForm("fantasyName", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Documento</label>
            <input value={form.document} onChange={(e) => updateForm("document", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Email</label>
            <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Telefone</label>
            <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Website</label>
            <input value={form.website} onChange={(e) => updateForm("website", e.target.value)} className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary" />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-secondary pt-5">
          <a href="/dashboard/profile" className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary">Cancelar</a>
          <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50">
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
