// src/pages/dashboard/Clients.tsx

import { HiPlus } from "react-icons/hi2";
import DataTable from "../../components/dashboard/reuses/table/DataTable";

const columns = [
  {
    key: "name",
    title: "Cliente",
  },
  {
    key: "company",
    title: "Empresa",
  },
  {
    key: "status",
    title: "Status",
  },
  {
    key: "createdAt",
    title: "Cadastro",
  },
];

const data = [
  {
    name: "João Silva",
    company: "Fonseca Tech",
    status: "Ativo",
    createdAt: "24/07/2026",
  },
  {
    name: "Maria Souza",
    company: "Creative Studio",
    status: "Ativo",
    createdAt: "21/07/2026",
  },
  {
    name: "Carlos Lima",
    company: "Lima Imports",
    status: "Inativo",
    createdAt: "17/07/2026",
  },
  {
    name: "Ana Costa",
    company: "AC Solutions",
    status: "Ativo",
    createdAt: "14/07/2026",
  },
  {
    name: "Pedro Santos",
    company: "PS Digital",
    status: "Pendente",
    createdAt: "09/07/2026",
  },
  {
    name: "Lucas Oliveira",
    company: "Dev Solutions",
    status: "Ativo",
    createdAt: "02/07/2026",
  },
];

export default function Clients() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Clientes</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie todos os clientes cadastrados.
        </p>
      </div>

      <DataTable
        title="Lista de Clientes"
        description="Visualize, pesquise e gerencie seus clientes."
        columns={columns}
        data={data}
        actions={
          <button
            className="
              flex items-center gap-2
              rounded-xl
              bg-primary
              px-5
              py-3
              font-semibold
              text-primaryText
              transition
              hover:opacity-90
            "
          >
            <HiPlus size={18} />
            Novo Cliente
          </button>
        }
        pagination={{
          page: 1,
          totalPages: 12,
          onPrevious: () => console.log("Anterior"),
          onNext: () => console.log("Próxima"),
        }}
      />
    </div>
  );
}
