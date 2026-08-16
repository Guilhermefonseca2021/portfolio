// src/pages/dashboard/Clients.tsx

import { useEffect, useState } from "react";
import DataTable from "../../components/dashboard/reuses/table/DataTable";

import { FiPlus } from "react-icons/fi";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";
import fonsecaApi from "../../services/fonsecaApi";
import type { Customer } from "../../types/api";

export default function Clients() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Clientes</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie todos os clientes cadastrados.
        </p>
      </div>

      <DataTable<Customer>
        title="Clientes"
        description="Gerencie todos os clientes cadastrados pela empresa."
        data={customers}
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
                  <p className="font-semibold text-secondaryText">{row.name}</p>

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
            sortable: false,
            render: (row) => (
              <span className="text-secondaryText">{row.phone ?? "-"}</span>
            ),
          },
          {
            key: "status",
            title: "Status",
            sortable: false,
            render: (row) => <StatusBadge status={row.status ?? "ACTIVE"} />,
          },
          {
            key: "document",
            title: "Documento",
            sortable: true,
            render: (row) => (
              <span className="text-secondaryText">{row.document ?? "-"}</span>
            ),
          },
          {
            key: "actions",
            title: "",
            render: () => (
              <button className="rounded-lg border border-secondary px-4 py-2 text-sm text-secondaryText transition hover:bg-secondary">
                Editar
              </button>
            ),
          },
        ]}
        actions={
          <div className="flex gap-3">
            <button className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText transition hover:bg-secondary">
              Ver Todos
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90">
              <FiPlus size={16} />
              Novo cliente
            </button>
          </div>
        }
        pagination={{
          page: 1,
          totalPages: 10,
          onPrevious: () => console.log("Anterior"),
          onNext: () => console.log("Próxima"),
        }}
      />

      {loading && (
        <p className="text-secondaryText/70">Carregando clientes...</p>
      )}
      {!loading && !error && customers.length === 0 && (
        <p className="text-secondaryText/70">Nenhum cliente encontrado.</p>
      )}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
