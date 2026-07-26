// src/pages/dashboard/Clients.tsx

import DataTable from "../../components/dashboard/reuses/table/DataTable";

import { FiPlus } from "react-icons/fi";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";

type Employee = {
  avatar: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  employed: string;
};

const employees: Employee[] = [
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "João Silva",
    email: "joao@email.com",
    role: "Manager",
    department: "Marketing",
    status: "online",
    employed: "12/01/2025",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Maria Souza",
    email: "maria@email.com",
    role: "Developer",
    department: "Technology",
    status: "offline",
    employed: "22/08/2024",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Pedro Lima",
    email: "pedro@email.com",
    role: "Designer",
    department: "UI/UX",
    status: "pending",
    employed: "05/03/2025",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Ana Costa",
    email: "ana@email.com",
    role: "Sales",
    department: "Commercial",
    status: "online",
    employed: "17/09/2023",
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

      <DataTable<Employee>
        title="Clientes"
        description="Gerencie todos as empresas que ja tem contratos."
        data={employees}
        columns={[
          {
            key: "name",
            title: "Empresa",
            sortable: true,
            render: (row) => (
              <div className="flex items-center gap-3">
                <img
                  src={row.avatar}
                  alt={row.name}
                  className="h-11 w-11 rounded-full border border-secondary object-cover"
                />

                <div>
                  <p className="font-semibold text-secondaryText">{row.name}</p>

                  <p className="text-sm text-secondaryText/60">{row.email}</p>
                </div>
              </div>
            ),
          },
          {
            key: "role",
            title: "Contrato",
            sortable: false,
            render: (row) => (
              <div>
                <p className="font-medium text-secondaryText">{row.role}</p>

                <p className="text-sm text-secondaryText/60">
                  {row.department}
                </p>
              </div>
            ),
          },
          {
            key: "status",
            title: "Status",
            sortable: false,
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "employed",
            title: "Admissão",
            sortable: true,
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
              Nova empresa
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
      
    </div>
  );
}
