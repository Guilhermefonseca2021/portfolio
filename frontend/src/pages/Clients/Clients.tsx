// src/pages/dashboard/Clients.tsx

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Customer } from "../../types/api";

const inputClass =
  "w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none transition focus:border-primary";

const labelClass = "mb-1 block text-sm font-medium text-secondaryText";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  document: "",
  notes: "",
};

export default function Clients() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Modal create/edit state
  const [openModal, setOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        setError(null);
        const data = await fonsecaApi.customers.list();
        setCustomers(data);
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar clientes."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  // ===========================
  // SEARCH
  // ===========================

  const filtered = useMemo(() => {
    if (!search.trim()) return customers;

    return customers.filter((customer) =>
      [
        customer.name,
        customer.email ?? "",
        customer.phone ?? "",
        customer.document ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, customers]);

  // ===========================
  // CREATE / EDIT
  // ===========================

  function openCreateModal() {
    setEditingCustomer(null);
    setForm(emptyForm);
    setFormError(null);
    setOpenModal(true);
  }

  function openEditModal(customer: Customer) {
    setEditingCustomer(customer);
    setForm({
      name: customer.name,
      email: customer.email ?? "",
      phone: customer.phone ?? "",
      document: customer.document ?? "",
      notes: customer.notes ?? "",
    });
    setFormError(null);
    setOpenModal(true);
  }

  function updateForm(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormError("Nome é obrigatório.");
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      if (editingCustomer) {
        await fonsecaApi.customers.update(editingCustomer.id, {
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          document: form.document.trim() || undefined,
          notes: form.notes.trim() || undefined,
        });
        notifyToast("Cliente atualizado com sucesso.", "success");
      } else {
        await fonsecaApi.customers.create({
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          document: form.document.trim() || undefined,
          notes: form.notes.trim() || undefined,
        });
        notifyToast("Cliente criado com sucesso.", "success");
      }

      setOpenModal(false);
      setForm(emptyForm);

      // Recarrega a lista
      const data = await fonsecaApi.customers.list();
      setCustomers(data);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao salvar cliente.",
      );
      setFormError(message);
      notifyToast(message, "error");
    } finally {
      setSaving(false);
    }
  }

  // ===========================
  // DELETE
  // ===========================

  async function handleDelete(customer: Customer) {
    if (!window.confirm(`Tem certeza que deseja excluir ${customer.name}?`))
      return;

    try {
      await fonsecaApi.customers.remove(customer.id);
      notifyToast("Cliente excluído com sucesso.", "success");
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao excluir cliente.",
      );
      notifyToast(message, "error");
    }
  }

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Clientes</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie todos os clientes cadastrados.
        </p>
      </div>

      {/* Busca */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText/40" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar clientes..."
          className="w-full rounded-xl border border-secondary bg-card py-3 pl-12 pr-4 text-secondaryText outline-none transition focus:border-primary"
        />
      </div>

      {loading ? (
        <p className="text-secondaryText/70">Carregando clientes...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <DataTable<Customer>
          title="Clientes"
          description={`${filtered.length} clientes encontrados`}
          data={filtered}
          columns={[
            {
              key: "name",
              title: "Cliente",
              sortable: true,
              render: (row) => (
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary bg-secondary/20 font-semibold text-secondaryText">
                    {row.name?.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-secondaryText">
                      {row.name}
                    </p>

                    <p className="text-sm text-secondaryText/60">
                      {row.email ?? "Sem e-mail"}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: "phone",
              title: "Telefone",
              render: (row) => (
                <span className="text-secondaryText">{row.phone ?? "-"}</span>
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (row) => (
                <StatusBadge status={row.status ?? "ACTIVE"} />
              ),
            },
            {
              key: "document",
              title: "Documento",
              render: (row) => (
                <span className="text-secondaryText">
                  {row.document ?? "-"}
                </span>
              ),
            },
            {
              key: "actions",
              title: "",
              render: (row) => (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(row)}
                    title="Editar cliente"
                    className="rounded-lg bg-secondary p-2 text-secondaryText transition hover:bg-primary hover:text-primaryText"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => handleDelete(row)}
                    title="Excluir cliente"
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
              Novo cliente
            </button>
          }
        />
      )}

      {!loading && !error && customers.length === 0 && (
        <p className="text-secondaryText/70">Nenhum cliente encontrado.</p>
      )}

      {/* Modal Criar/Editar */}
      <Modal
        open={openModal}
        title={editingCustomer ? "Editar Cliente" : "Novo Cliente"}
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
              placeholder="Nome do cliente"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              placeholder="email@exemplo.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Telefone</label>
            <input
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
              placeholder="(00) 00000-0000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Documento</label>
            <input
              value={form.document}
              onChange={(e) => updateForm("document", e.target.value)}
              placeholder="CPF ou CNPJ"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Observações</label>
            <textarea
              value={form.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
              placeholder="Observações sobre o cliente..."
              rows={3}
              className={inputClass}
            />
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
              {saving ? "Salvando..." : editingCustomer ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
