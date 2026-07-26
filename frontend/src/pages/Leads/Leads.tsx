import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";

import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";

import type { TableColumn } from "../../@types/table";

// ===========================
// TYPES
// ===========================

type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  owner: string;
  pipeline: string;
  status: "Online" | "Offline" | "Pending" | "Blocked";
  createdAt: string;
};

// ===========================
// MOCK
// ===========================

const leads: Lead[] = [
  {
    id: 1,
    name: "Carlos Henrique",
    company: "Alpha Tech",
    email: "carlos@alpha.com",
    phone: "(83) 99999-1111",
    source: "Site",
    owner: "Guilherme",
    pipeline: "Novo",
    status: "Online",
    createdAt: "24/07/2026",
  },
  {
    id: 2,
    name: "Amanda Souza",
    company: "Mercado Center",
    email: "amanda@email.com",
    phone: "(83) 98888-4444",
    source: "Instagram",
    owner: "Lucas",
    pipeline: "Proposta",
    status: "Pending",
    createdAt: "25/07/2026",
  },
  {
    id: 3,
    name: "João Pedro",
    company: "Construtora JP",
    email: "joao@jp.com",
    phone: "(83) 98777-2222",
    source: "Google",
    owner: "Guilherme",
    pipeline: "Negociação",
    status: "Online",
    createdAt: "25/07/2026",
  },
  {
    id: 4,
    name: "Mariana Lima",
    company: "Beauty Store",
    email: "mariana@email.com",
    phone: "(83) 99911-4433",
    source: "Facebook",
    owner: "Pedro",
    pipeline: "Contato",
    status: "Offline",
    createdAt: "22/07/2026",
  },
  {
    id: 5,
    name: "Fernanda Alves",
    company: "Construlife",
    email: "fernanda@email.com",
    phone: "(83) 99123-5555",
    source: "WhatsApp",
    owner: "Guilherme",
    pipeline: "Fechado",
    status: "Blocked",
    createdAt: "20/07/2026",
  },
];

// ===========================
// PAGE
// ===========================

export default function Leads() {
  const [search, setSearch] = useState("");
  const [openImportModal, setOpenImportModal] = useState(false);

  // ===========================
  // FILTER
  // ===========================

  const filtered = useMemo(() => {
    return leads.filter((lead) =>
      [
        lead.name,
        lead.company,
        lead.email,
        lead.phone,
        lead.source,
        lead.owner,
        lead.pipeline,
        lead.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  // ===========================
  // TABLE
  // ===========================

  const columns: TableColumn<Lead>[] = [
    {
      key: "name",
      title: "Lead",

      render: (lead) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primaryText">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="font-semibold text-secondaryText">{lead.name}</p>

            <span className="text-xs text-secondaryText/60">
              {lead.company}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "phone",
      title: "Telefone",
    },

    {
      key: "email",
      title: "Email",
    },

    {
      key: "source",
      title: "Origem",
    },

    {
      key: "owner",
      title: "Responsável",
    },

    {
      key: "pipeline",
      title: "Pipeline",

      render: (lead) => (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {lead.pipeline}
        </span>
      ),
    },

    {
      key: "status",
      title: "Status",

      render: (lead) => <StatusBadge status={lead.status} />,
    },

    {
      key: "createdAt",
      title: "Criado em",
    },

    {
      key: "id",
      title: "",

      render: () => (
        <div className="flex justify-end gap-2">
          <button className="rounded-lg bg-secondary p-2 transition hover:bg-primary hover:text-primaryText">
            <FaWhatsapp />
          </button>

          <button className="rounded-lg bg-secondary px-3 py-2 text-sm transition hover:bg-primary hover:text-primaryText">
            Abrir
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondaryText">Leads</h1>

            <p className="mt-1 text-secondaryText/60">
              Gerencie todos os leads do CRM.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-4 py-3 text-secondaryText transition hover:border-primary">
              <HiOutlineArrowDownTray />
              Exportar
            </button>

            <button
              onClick={() => setOpenImportModal(true)}
              className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-4 py-3 text-secondaryText transition hover:border-primary"
            >
              <HiOutlineArrowUpTray />
              Importar
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90">
              <HiOutlinePlus />
              Novo Lead
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <IncomeCard title="Total de Leads" total={2451} sessions={[]} />

          <IncomeCard title="Novos Hoje" total={38} sessions={[]} />

          <IncomeCard title="Em Negociação" total={92} sessions={[]} />

          <IncomeCard title="Conversão" total={28} sessions={[]} />
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-5">
          <div className="relative max-w-md">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar leads..."
              className="w-full rounded-xl border border-secondary bg-bg py-3 pl-12 pr-4 text-secondaryText outline-none transition focus:border-primary"
            />
          </div>
        </div>

        <DataTable
          title="Lista de Leads"
          description={`${filtered.length} leads encontrados`}
          columns={columns}
          data={filtered}
        />
      </div>

      <Modal
        open={openImportModal}
        title="Importar Leads"
        width="lg"
        onClose={() => setOpenImportModal(false)}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-secondaryText">
              Como deseja importar seus leads?
            </h3>

            <p className="mt-1 text-sm text-secondaryText/60">
              Escolha um dos métodos abaixo para adicionar novos contatos ao
              CRM.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <button className="rounded-2xl border border-secondary bg-bg p-6 transition hover:border-primary hover:bg-secondary/30">
              <HiOutlineArrowUpTray
                size={34}
                className="mx-auto mb-4 text-primary"
              />

              <h4 className="font-semibold text-secondaryText">CSV</h4>

              <p className="mt-2 text-sm text-secondaryText/60">
                Importe uma planilha CSV contendo seus contatos.
              </p>
            </button>

            <button className="rounded-2xl border border-secondary bg-bg p-6 transition hover:border-primary hover:bg-secondary/30">
              <HiOutlineArrowUpTray
                size={34}
                className="mx-auto mb-4 text-primary"
              />

              <h4 className="font-semibold text-secondaryText">PDF</h4>

              <p className="mt-2 text-sm text-secondaryText/60">
                Extraia automaticamente contatos de um arquivo PDF.
              </p>
            </button>

            <button className="rounded-2xl border border-secondary bg-bg p-6 transition hover:border-primary hover:bg-secondary/30">
              <HiOutlinePlus size={34} className="mx-auto mb-4 text-primary" />

              <h4 className="font-semibold text-secondaryText">Manual</h4>

              <p className="mt-2 text-sm text-secondaryText/60">
                Digite ou cole números manualmente.
              </p>
            </button>
          </div>

          <div className="rounded-xl border border-dashed border-secondary bg-bg p-8 text-center">
            <HiOutlineArrowUpTray
              size={48}
              className="mx-auto mb-4 text-primary"
            />

            <h4 className="text-lg font-semibold text-secondaryText">
              Arraste um arquivo aqui
            </h4>

            <p className="mt-2 text-sm text-secondaryText/60">
              Ou clique para selecionar um arquivo do computador.
            </p>

            <button className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primaryText transition hover:opacity-90">
              Selecionar Arquivo
            </button>
          </div>

          <div className="flex justify-end gap-3 border-t border-secondary pt-6">
            <button
              onClick={() => setOpenImportModal(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>

            <button className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90">
              Continuar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
