import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FiColumns, FiGrid } from "react-icons/fi";

import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";

import type { TableColumn } from "../../@types/table";
import type { Lead, Pipeline, PipelineStage } from "../../types/api";

// ===========================
// PAGE
// ===========================

export default function Leads() {
  const [search, setSearch] = useState("");
  const [openImportModal, setOpenImportModal] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [savingCreate, setSavingCreate] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    instagram: "",
    services: "",
    objective: "",
    companySize: "",
    budget: "",
    deadline: "",
    message: "",
  });

  const [viewMode, setViewMode] = useState<"table" | "pipeline">("pipeline");
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null,
  );
  const [movingDealId, setMovingDealId] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setError(null);
        const data = await fonsecaApi.leads.list();
        setLeads(data);
      } catch (err) {
        const message = fonsecaApi.utils.getErrorMessage(
          err,
          "Erro ao carregar leads.",
        );
        setError(message);
        notifyToast(message, "error");
      } finally {
        setLoading(false);
      }
    }

    async function loadPipelines() {
      try {
        const pipelineData = await fonsecaApi.pipelines.list();
        setPipelines(pipelineData);

        if (pipelineData[0] && !selectedPipelineId) {
          setSelectedPipelineId(pipelineData[0].id);
          const stageData = await fonsecaApi.pipelineStages.list(
            pipelineData[0].id,
          );
          setStages(stageData);
        }
      } catch (err) {
        const message = fonsecaApi.utils.getErrorMessage(
          err,
          "Erro ao carregar pipelines.",
        );
        setError(message);
      }
    }

    loadLeads();
    loadPipelines();
  }, []);

  // ===========================
  // PIPELINE
  // ===========================

  async function handlePipelineSelect(pipelineId: string) {
    setSelectedPipelineId(pipelineId);
    try {
      const stageData = await fonsecaApi.pipelineStages.list(pipelineId);
      setStages(stageData);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao carregar etapas.",
      );
      notifyToast(message, "error");
    }
  }

  async function handleMoveDeal(dealId: string, newStageId: string) {
    if (!dealId) return;

    try {
      setMovingDealId(dealId);
      await fonsecaApi.deals.update(dealId, { stageId: newStageId });
      notifyToast("Lead movido de etapa.", "success");

      // Recarrega para obter o novo estado do board
      const data = await fonsecaApi.leads.list();
      setLeads(data);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao mover lead.",
      );
      notifyToast(message, "error");
    } finally {
      setMovingDealId(null);
    }
  }

  // ===========================
  // CREATE
  // ===========================

  const inputClass =
    "w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none transition focus:border-primary";

  const labelClass = "mb-1 block text-sm font-medium text-secondaryText";

  function updateCreateForm(field: keyof typeof createForm, value: string) {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleDeleteLead(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir este lead?")) return;

    try {
      await fonsecaApi.leads.remove(id);
      notifyToast("Lead excluído com sucesso.", "success");
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao excluir lead.",
      );
      notifyToast(message, "error");
    }
  }

  async function handleCreateLead(e: FormEvent) {
    e.preventDefault();

    if (!createForm.name.trim() || !createForm.email.trim()) {
      setCreateError("Nome e e-mail são obrigatórios.");
      return;
    }

    try {
      setSavingCreate(true);
      setCreateError(null);

      await fonsecaApi.leads.create({
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        whatsapp: createForm.whatsapp.trim() || undefined,
        company: createForm.company.trim() || undefined,
        instagram: createForm.instagram.trim() || undefined,
        services: createForm.services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        objective: createForm.objective.trim() || undefined,
        companySize: createForm.companySize.trim() || undefined,
        budget: createForm.budget.trim() || undefined,
        deadline: createForm.deadline.trim() || undefined,
        message: createForm.message.trim() || undefined,
      });

      notifyToast("Lead criado com sucesso.", "success");
      setOpenCreateModal(false);
      setCreateForm({
        name: "",
        email: "",
        whatsapp: "",
        company: "",
        instagram: "",
        services: "",
        objective: "",
        companySize: "",
        budget: "",
        deadline: "",
        message: "",
      });

      const data = await fonsecaApi.leads.list();
      setLeads(data);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao criar lead.",
      );
      setCreateError(message);
      notifyToast(message, "error");
    } finally {
      setSavingCreate(false);
    }
  }

  // ===========================
  // FILTER
  // ===========================

  const filtered = useMemo(() => {
    if (!search.trim()) return leads;

    return leads.filter((lead) =>
      [
        lead.name,
        lead.email ?? "",
        lead.phone ?? "",
        lead.notes ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, leads]);

  // Acumula os leads por etapa (stageId)
  const leadsByStage = useMemo(() => {
    const map: Record<string, Lead[]> = {};

    // Inicializa cada etapa com array vazio
    for (const stage of stages) {
      map[stage.id] = [];
    }

    for (const lead of filtered) {
      const stageId = lead.deals?.[0]?.stageId;
      if (stageId && map[stageId]) {
        map[stageId].push(lead);
      } else {
        // Leads sem etapa definida vão para o final (coluna "Sem etapa")
        if (!map["__no_stage"]) map["__no_stage"] = [];
        map["__no_stage"].push(lead);
      }
    }

    return map;
  }, [filtered, stages]);

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

            {lead.company && (
              <span className="text-xs text-secondaryText/60">
                {lead.company.name}
              </span>
            )}
          </div>
        </div>
      ),
    },

    {
      key: "phone",
      title: "Telefone",
      render: (lead) => <span>{lead.phone ?? "-"}</span>,
    },

    {
      key: "email",
      title: "Email",
      render: (lead) => <span>{lead.email ?? "-"}</span>,
    },

    {
      key: "notes",
      title: "Origem / Serviços",

      render: (lead) => {
        const firstLine = lead.notes?.split("\n")[0] ?? "";
        return (
          <span className="text-xs text-secondaryText/80">
            {firstLine || "-"}
          </span>
        );
      },
    },

    {
      key: "status",
      title: "Status",

      render: (lead) => {
        const statusMap: Record<string, "Online" | "Offline" | "Pending" | "Blocked"> = {
          LEAD: "Pending",
          ACTIVE: "Online",
          INACTIVE: "Offline",
          BLOCKED: "Blocked",
        };
        return <StatusBadge status={statusMap[lead.status ?? "LEAD"] ?? "Pending"} />;
      },
    },

    {
      key: "createdAt",
      title: "Criado em",

      render: (lead) => {
        if (!lead.createdAt) return <span>-</span>;
        const date = new Date(lead.createdAt);
        return (
          <span>
            {date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        );
      },
    },

    {
      key: "id",
      title: "",

      render: (lead) => (
        <div className="flex justify-end gap-2">
          <button className="rounded-lg bg-secondary p-2 transition hover:bg-primary hover:text-primaryText">
            <FaWhatsapp />
          </button>

          <button className="rounded-lg bg-secondary px-3 py-2 text-sm transition hover:bg-primary hover:text-primaryText">
            Abrir
          </button>

          <button
            onClick={() => handleDeleteLead(lead.id)}
            title="Excluir lead"
            className="rounded-lg bg-secondary p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <HiOutlineTrash />
          </button>
        </div>
      ),
    },
  ];

  const totalLeads = leads.length;
  const hoje = new Date();
  const novosHoje = leads.filter((lead) => {
    if (!lead.createdAt) return false;
    const created = new Date(lead.createdAt);
    return (
      created.getDate() === hoje.getDate() &&
      created.getMonth() === hoje.getMonth() &&
      created.getFullYear() === hoje.getFullYear()
    );
  }).length;

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

            <button
              onClick={() => setOpenCreateModal(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90"
            >
              <HiOutlinePlus />
              Novo Lead
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <IncomeCard title="Total de Leads" total={totalLeads} sessions={[]} />

          <IncomeCard title="Novos Hoje" total={novosHoje} sessions={[]} />

          <IncomeCard title="Em Negociação" total={0} sessions={[]} />

          <IncomeCard title="Conversão" total={0} sessions={[]} />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Barra de busca */}
          <div className="relative max-w-md flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar leads..."
              className="w-full rounded-xl border border-secondary bg-card py-3 pl-12 pr-4 text-secondaryText outline-none transition focus:border-primary"
            />
          </div>

          {/* Toggle Tabela / Pipeline */}
          <div className="flex items-center gap-2 rounded-xl border border-secondary bg-card p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                viewMode === "table"
                  ? "bg-primary text-primaryText"
                  : "text-secondaryText hover:bg-secondary"
              }`}
            >
              <FiColumns />
              Tabela
            </button>

            <button
              onClick={() => setViewMode("pipeline")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                viewMode === "pipeline"
                  ? "bg-primary text-primaryText"
                  : "text-secondaryText hover:bg-secondary"
              }`}
            >
              <FiGrid />
              Pipeline
            </button>
          </div>
        </div>

        {/* Seletor de pipeline (visão pipeline) */}
        {viewMode === "pipeline" && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-secondary bg-card p-4">
            <span className="text-sm font-medium text-secondaryText/70">
              Pipeline:
            </span>

            <div className="flex flex-wrap gap-2">
              {pipelines.map((pipeline) => (
                <button
                  key={pipeline.id}
                  type="button"
                  onClick={() => handlePipelineSelect(pipeline.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedPipelineId === pipeline.id
                      ? "bg-primary text-primaryText"
                      : "border border-secondary bg-bg text-secondaryText hover:border-primary"
                  }`}
                >
                  {pipeline.name}
                </button>
              ))}

              {pipelines.length === 0 && (
                <span className="text-sm text-secondaryText/60">
                  Nenhum pipeline encontrado.
                </span>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-secondary bg-card p-8 text-center">
            <p className="text-secondaryText/70">Carregando leads...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        ) : viewMode === "table" ? (
          <DataTable
            title="Lista de Leads"
            description={`${filtered.length} leads encontrados`}
            columns={columns}
            data={filtered}
          />
        ) : (
          // ===========================
          // VISÃO PIPELINE (KANBAN)
          // ===========================
          <div className="overflow-x-auto pb-4">
            <div
              className="flex gap-4"
              style={{ minWidth: stages.length * 280 + (stages.length - 1) * 16 }}
            >
              {stages.map((stage) => {
                const stageLeads = leadsByStage[stage.id] ?? [];
                return (
                  <div
                    key={stage.id}
                    className="flex w-[280px] min-w-[280px] flex-col rounded-2xl border border-secondary bg-card"
                  >
                    {/* Cabeçalho da coluna */}
                    <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: stage.color ?? "#3b82f6" }}
                        />
                        <h3 className="text-sm font-bold text-secondaryText">
                          {stage.name}
                        </h3>
                      </div>

                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondaryText">
                        {stageLeads.length}
                      </span>
                    </div>

                    {/* Cards de leads */}
                    <div className="flex-1 space-y-3 p-3">
                      {stageLeads.map((lead) => {
                        const deal = lead.deals?.[0];
                        return (
                          <div
                            key={lead.id}
                            className="group rounded-xl border border-secondary/70 bg-bg p-4 transition hover:border-primary/50"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primaryText">
                                  {lead.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-secondaryText">
                                    {lead.name}
                                  </p>

                                  {lead.company && (
                                    <span className="text-xs text-secondaryText/60">
                                      {lead.company.name}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Excluir lead"
                                className="rounded-lg p-1.5 text-secondaryText/40 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                              >
                                <HiOutlineTrash size={15} />
                              </button>
                            </div>

                            {lead.phone && (
                              <p className="mt-3 flex items-center gap-2 text-xs text-secondaryText/70">
                                <FaWhatsapp className="text-primary" />
                                {lead.phone}
                              </p>
                            )}

                            {deal && deal.value !== undefined && deal.value !== null && (
                              <p className="mt-2 text-sm font-semibold text-primary">
                                {Number(deal.value).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </p>
                            )}

                            {/* Seletor de etapa */}
                            {deal && stages.length > 1 && (
                              <select
                                value={deal.stageId}
                                disabled={movingDealId === deal.id}
                                onChange={(e) =>
                                  handleMoveDeal(deal.id, e.target.value)
                                }
                                className="mt-3 w-full rounded-lg border border-secondary bg-card px-2.5 py-1.5 text-xs text-secondaryText outline-none transition focus:border-primary disabled:opacity-50"
                              >
                                {stages.map((s) => (
                                  <option key={s.id} value={s.id}>
                                    {s.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        );
                      })}

                      {stageLeads.length === 0 && (
                        <div className="rounded-xl border border-dashed border-secondary p-4 text-center text-xs text-secondaryText/40">
                          Nenhum lead nesta etapa
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coluna "Sem etapa" */}
            {(leadsByStage["__no_stage"]?.length ?? 0) > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  <h3 className="text-sm font-bold text-secondaryText">
                    Sem etapa
                  </h3>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondaryText">
                    {leadsByStage["__no_stage"].length}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {leadsByStage["__no_stage"].map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center gap-3 rounded-xl border border-secondary/70 bg-card p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primaryText">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-secondaryText">
                          {lead.name}
                        </p>
                        <p className="text-xs text-secondaryText/60">
                          {lead.email ?? lead.phone ?? "-"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        open={openCreateModal}
        title="Novo Lead"
        width="lg"
        onClose={() => setOpenCreateModal(false)}
      >
        <form onSubmit={handleCreateLead} className="space-y-6">
          {createError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {createError}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Nome *</label>
              <input
                value={createForm.name}
                onChange={(e) => updateCreateForm("name", e.target.value)}
                placeholder="Nome do lead"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                value={createForm.email}
                onChange={(e) => updateCreateForm("email", e.target.value)}
                placeholder="email@exemplo.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>WhatsApp</label>
              <input
                value={createForm.whatsapp}
                onChange={(e) => updateCreateForm("whatsapp", e.target.value)}
                placeholder="(00) 00000-0000"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Empresa</label>
              <input
                value={createForm.company}
                onChange={(e) => updateCreateForm("company", e.target.value)}
                placeholder="Nome da empresa"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Instagram</label>
              <input
                value={createForm.instagram}
                onChange={(e) => updateCreateForm("instagram", e.target.value)}
                placeholder="@usuario"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Serviços</label>
              <input
                value={createForm.services}
                onChange={(e) => updateCreateForm("services", e.target.value)}
                placeholder="Site, Landing Page, Automação..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Objetivo</label>
              <select
                value={createForm.objective}
                onChange={(e) => updateCreateForm("objective", e.target.value)}
                className={inputClass}
              >
                <option value="">Selecione...</option>
                <option value="Desenvolvimento de Site">
                  Desenvolvimento de Site
                </option>
                <option value="Landing Page">Landing Page</option>
                <option value="Sistema Web">Sistema Web</option>
                <option value="Automação">Automação</option>
                <option value="Consultoria">Consultoria</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Tamanho da empresa</label>
              <select
                value={createForm.companySize}
                onChange={(e) =>
                  updateCreateForm("companySize", e.target.value)
                }
                className={inputClass}
              >
                <option value="">Selecione...</option>
                <option value="MEI">MEI</option>
                <option value="Pequena">Pequena</option>
                <option value="Média">Média</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Orçamento</label>
              <select
                value={createForm.budget}
                onChange={(e) => updateCreateForm("budget", e.target.value)}
                className={inputClass}
              >
                <option value="">Selecione...</option>
                <option value="Até R$ 1.000">Até R$ 1.000</option>
                <option value="R$ 1.000 - R$ 5.000">R$ 1.000 - R$ 5.000</option>
                <option value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
                <option value="R$ 10.000 - R$ 50.000">R$ 10.000 - R$ 50.000</option>
                <option value="Acima de R$ 50.000">Acima de R$ 50.000</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Prazo</label>
              <select
                value={createForm.deadline}
                onChange={(e) => updateCreateForm("deadline", e.target.value)}
                className={inputClass}
              >
                <option value="">Selecione...</option>
                <option value="Urgente (até 1 semana)">
                  Urgente (até 1 semana)
                </option>
                <option value="Até 1 mês">Até 1 mês</option>
                <option value="1 a 3 meses">1 a 3 meses</option>
                <option value="3 a 6 meses">3 a 6 meses</option>
                <option value="Sem prazo definido">Sem prazo definido</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Mensagem</label>
            <textarea
              value={createForm.message}
              onChange={(e) => updateCreateForm("message", e.target.value)}
              placeholder="Mensagem ou observações do lead..."
              rows={4}
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-secondary pt-6">
            <button
              type="button"
              onClick={() => setOpenCreateModal(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={savingCreate}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {savingCreate ? "Salvando..." : "Criar Lead"}
            </button>
          </div>
        </form>
      </Modal>

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
