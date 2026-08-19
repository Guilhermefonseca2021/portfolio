// src/pages/dashboard/Automations.tsx

import { useEffect, useState, type FormEvent } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Automation } from "../../types/api";

const inputClass =
  "w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none transition focus:border-primary";

const labelClass = "mb-1 block text-sm font-medium text-secondaryText";

const emptyForm = {
  name: "",
  keyword: "",
  response: "",
  active: true,
  priority: 0,
};

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal create/edit state
  const [openModal, setOpenModal] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(
    null,
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    async function loadAutomations() {
      try {
        setLoading(true);
        setError(null);
        const data = await fonsecaApi.automations.list();
        setAutomations(data);
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar automações."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadAutomations();
  }, []);

  // ===========================
  // METRICS (dados reais)
  // ===========================

  const totalFluxos = automations.length;
  const ativos = automations.filter((a) => a.active).length;
  const pausados = automations.length - ativos;

  // ===========================
  // CREATE / EDIT
  // ===========================

  function openCreateModal() {
    setEditingAutomation(null);
    setForm(emptyForm);
    setFormError(null);
    setOpenModal(true);
  }

  function openEditModal(automation: Automation) {
    setEditingAutomation(automation);
    setForm({
      name: automation.name,
      keyword: automation.keyword,
      response: automation.response,
      active: automation.active,
      priority: automation.priority,
    });
    setFormError(null);
    setOpenModal(true);
  }

  function updateForm(field: keyof typeof emptyForm, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.keyword.trim() || !form.response.trim()) {
      setFormError("Nome, palavra-chave e resposta são obrigatórios.");
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      const payload = {
        name: form.name.trim(),
        keyword: form.keyword.trim(),
        response: form.response.trim(),
        active: form.active,
        priority: Number(form.priority) || 0,
      };

      if (editingAutomation) {
        await fonsecaApi.automations.update(editingAutomation.id, payload);
        notifyToast("Automação atualizada com sucesso.", "success");
      } else {
        await fonsecaApi.automations.create(payload);
        notifyToast("Automação criada com sucesso.", "success");
      }

      setOpenModal(false);
      setForm(emptyForm);

      // Recarrega a lista
      const data = await fonsecaApi.automations.list();
      setAutomations(data);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao salvar automação.",
      );
      setFormError(message);
      notifyToast(message, "error");
    } finally {
      setSaving(false);
    }
  }

  // ===========================
  // TOGGLE ACTIVE
  // ===========================

  async function handleToggleActive(automation: Automation) {
    try {
      await fonsecaApi.automations.update(automation.id, {
        active: !automation.active,
      });
      notifyToast(
        automation.active
          ? "Automação pausada."
          : "Automação ativada.",
        "success",
      );
      setAutomations((prev) =>
        prev.map((a) =>
          a.id === automation.id ? { ...a, active: !a.active } : a,
        ),
      );
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao alterar status da automação.",
      );
      notifyToast(message, "error");
    }
  }

  // ===========================
  // DELETE
  // ===========================

  async function handleDelete(automation: Automation) {
    if (!window.confirm(`Tem certeza que deseja excluir "${automation.name}"?`))
      return;

    try {
      await fonsecaApi.automations.remove(automation.id);
      notifyToast("Automação excluída com sucesso.", "success");
      setAutomations((prev) =>
        prev.filter((a) => a.id !== automation.id),
      );
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao excluir automação.",
      );
      notifyToast(message, "error");
    }
  }

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Automações</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie todos os fluxos inteligentes da plataforma.
        </p>
      </div>

      {/* DASHBOARD - dados reais */}
      <div className="grid gap-6 xl:grid-cols-2">
        <IncomeCard
          title="Fluxos"
          total={totalFluxos}
          prefix=""
          decimals={0}
          sessions={[
            {
              label: "Ativos",
              value: ativos,
              percentage: totalFluxos > 0 ? Math.round((ativos / totalFluxos) * 100) : 0,
              color: "#22c55e",
            },
            {
              label: "Pausados",
              value: pausados,
              percentage: totalFluxos > 0 ? Math.round((pausados / totalFluxos) * 100) : 0,
              color: "#f59e0b",
            },
          ]}
        />

        <IncomeCard
          title="Palavras-chave"
          total={automations.length}
          prefix=""
          decimals={0}
          sessions={[]}
        />
      </div>

      {/* TABELA */}
      {loading ? (
        <p className="text-secondaryText/70">Carregando automações...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <DataTable<Automation>
          title="Fluxos de Automação"
          description={`${automations.length} fluxos cadastrados`}
          data={automations}
          columns={[
            {
              key: "name",
              title: "Fluxo",
              render: (row) => (
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary bg-secondary/20 font-semibold text-secondaryText">
                    {row.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-secondaryText">
                      {row.name}
                    </p>

                    <p className="text-sm text-secondaryText/60">
                      {row.keyword}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: "response",
              title: "Resposta",
              render: (row) => (
                <span className="text-secondaryText">{row.response}</span>
              ),
            },
            {
              key: "priority",
              title: "Prioridade",
              render: (row) => (
                <span className="font-semibold text-primary">
                  {row.priority}
                </span>
              ),
            },
            {
              key: "active",
              title: "Status",
              render: (row) => (
                <button
                  onClick={() => handleToggleActive(row)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    row.active
                      ? "border-green-500/30 bg-green-500/15 text-green-400 hover:bg-green-500/25"
                      : "border-yellow-500/30 bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
                  }`}
                >
                  {row.active ? "Ativo" : "Pausado"}
                </button>
              ),
            },
            {
              key: "actions",
              title: "",
              render: (row) => (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(row)}
                    title="Editar automação"
                    className="rounded-lg bg-secondary p-2 text-secondaryText transition hover:bg-primary hover:text-primaryText"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => handleDelete(row)}
                    title="Excluir automação"
                    className="rounded-lg bg-secondary p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ),
            },
          ]}
          actions={
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90"
            >
              <FiPlus size={16} />
              Novo Fluxo
            </button>
          }
        />
      )}

      {!loading && !error && automations.length === 0 && (
        <p className="text-secondaryText/70">Nenhuma automação encontrada.</p>
      )}

      {/* Modal Criar/Editar */}
      <Modal
        open={openModal}
        title={editingAutomation ? "Editar Automação" : "Nova Automação"}
        width="md"
        onClose={() => setOpenModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {formError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {formError}
            </div>
          )}

          <div>
            <label className={labelClass}>Nome *</label>
            <input
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="Ex: Resposta de preço"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Palavra-chave *</label>
            <input
              value={form.keyword}
              onChange={(e) => updateForm("keyword", e.target.value)}
              placeholder="Ex: preço"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Resposta *</label>
            <textarea
              value={form.response}
              onChange={(e) => updateForm("response", e.target.value)}
              placeholder="Ex: Olá! Vou te enviar nossas informações de preço."
              rows={4}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Prioridade</label>
              <input
                type="number"
                value={form.priority}
                onChange={(e) =>
                  updateForm("priority", Number(e.target.value))
                }
                placeholder="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.active ? "true" : "false"}
                onChange={(e) =>
                  updateForm("active", e.target.value === "true")
                }
                className={inputClass}
              >
                <option value="true">Ativo</option>
                <option value="false">Pausado</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Salvando..." : editingAutomation ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
