import { useMemo, useState } from "react";
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiLayers,
  FiUserPlus,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useUserContext } from "../../contexts/UserContext";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Deal, PipelineStage, Customer, Lead } from "../../types/api";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function Dashboard() {
  const { user, loading: userLoading } = useUserContext();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingDealId, setUpdatingDealId] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      const [dealsData, pipelinesData, customersData, leadsData] = await Promise.all([
        fonsecaApi.deals.list(),
        fonsecaApi.pipelines.list(),
        fonsecaApi.customers.list(),
        fonsecaApi.leads.list(),
      ]);
      setDeals(dealsData);
      setCustomers(customersData);
      setLeads(leadsData);

      const defaultPipeline = pipelinesData.find((p) => p.isDefault) ?? pipelinesData[0];
      if (defaultPipeline) {
        const stagesData = await fonsecaApi.pipelineStages.list(defaultPipeline.id);
        setStages(stagesData);
      }
    } catch {
      notifyToast("Erro ao carregar dashboard.", "error");
    } finally {
      setLoading(false);
    }
  }

  useMemo(() => {
    loadData();
  }, []);

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value ?? 0), 0);
  const openDeals = deals.filter((deal) => deal.status === "OPEN" || !deal.status).length;
  const wonDeals = deals.filter((deal) => deal.status === "WON").length;
  const totalCustomers = customers.length;
  const totalLeads = leads.length;

  const stageMetrics = useMemo(() => {
    const map = new Map<string, { name: string; value: number; amount: number }>();
    stages.forEach((stage) => {
      map.set(stage.id, { name: stage.name, value: 0, amount: 0 });
    });
    deals.forEach((deal) => {
      if (deal.stageId && map.has(deal.stageId)) {
        const entry = map.get(deal.stageId)!;
        entry.value += 1;
        entry.amount += deal.value ?? 0;
      }
    });
    return Array.from(map.values());
  }, [deals, stages]);

  const stageValueMetrics = useMemo(() => {
    const map = new Map<string, { name: string; value: number }>();
    stages.forEach((stage) => {
      map.set(stage.id, { name: stage.name, value: 0 });
    });
    deals.forEach((deal) => {
      if (deal.stageId && map.has(deal.stageId)) {
        const entry = map.get(deal.stageId)!;
        entry.value += deal.value ?? 0;
      }
    });
    return Array.from(map.values());
  }, [deals, stages]);

  const dealTrend = useMemo(() => {
    const sorted = [...deals].sort((a, b) =>
      new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
    );
    const map = new Map<string, number>();
    sorted.forEach((deal) => {
      const key = new Date(deal.createdAt ?? 0).toISOString().slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .slice(-7);
  }, [deals]);

  const recentDeals = useMemo(() => {
    return [...deals]
      .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
      .slice(0, 10);
  }, [deals]);

  async function handleStageChange(dealId: string, stageId: string) {
    setUpdatingDealId(dealId);
    try {
      await fonsecaApi.deals.update(dealId, { stageId });
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId
            ? {
                ...deal,
                stageId,
                stage: stages.find((s) => s.id === stageId) ?? deal.stage,
              }
            : deal,
        ),
      );
      notifyToast("Etapa atualizada.", "success");
    } catch {
      notifyToast("Erro ao atualizar etapa.", "error");
    } finally {
      setUpdatingDealId(null);
    }
  }

  const greeting = userLoading
    ? "Carregando informações..."
    : `Bem-vindo, ${user?.name ?? "usuário"}`;

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Visão geral</p>
        <h1 className="display-type mt-2 text-4xl font-medium text-secondaryText">Dashboard</h1>
        <p className="mt-2 text-secondaryText/60">{greeting}</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="surface rounded-2xl p-6">
              <p className="text-secondaryText/70">Carregando...</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            <MetricCard
              title="Negociações"
              value={totalDeals.toString()}
              icon={<FiLayers size={22} />}
            />
            <MetricCard
              title="Valor total"
              value={`R$ ${totalValue.toFixed(2)}`}
              icon={<FiDollarSign size={22} />}
            />
            <MetricCard
              title="Abertas"
              value={openDeals.toString()}
              icon={<FiTrendingUp size={22} />}
            />
            <MetricCard
              title="Ganhas"
              value={wonDeals.toString()}
              icon={<FiUsers size={22} />}
            />
            <MetricCard
              title="Clientes"
              value={totalCustomers.toString()}
              icon={<FiUsers size={22} />}
            />
            <MetricCard
              title="Leads"
              value={totalLeads.toString()}
              icon={<FiUserPlus size={22} />}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="surface rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-secondaryText">Negociações por etapa</h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stageMetrics}>
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#e5e7eb",
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="surface rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-secondaryText">Valor por etapa</h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stageValueMetrics}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {stageValueMetrics.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#e5e7eb",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="surface rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-secondaryText">Evolução de negociações</h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dealTrend}>
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#e5e7eb",
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="surface rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-secondaryText">Funil rápido</h2>
              <div className="mt-4 space-y-4">
                {stages.map((stage) => {
                  const stageDeals = deals.filter((deal) => deal.stageId === stage.id);
                  const percentage = totalDeals > 0 ? (stageDeals.length / totalDeals) * 100 : 0;
                  return (
                    <div key={stage.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondaryText">{stage.name}</span>
                        <span className="text-secondaryText/60">{stageDeals.length}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: stage.color ?? "#3b82f6",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="surface rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondaryText">Negociações recentes</h2>
              <span className="text-sm text-secondaryText/60">
                Atualize a etapa diretamente aqui
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary text-left text-secondaryText/60">
                    <th className="pb-3 text-sm font-medium">Título</th>
                    <th className="pb-3 text-sm font-medium">Valor</th>
                    <th className="pb-3 text-sm font-medium">Status</th>
                    <th className="pb-3 text-sm font-medium">Etapa atual</th>
                    <th className="pb-3 text-sm font-medium">Nova etapa</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((deal) => (
                    <tr key={deal.id} className="border-b border-secondary/40">
                      <td className="py-3 text-sm text-secondaryText">
                        {deal.title ?? "Sem título"}
                      </td>
                      <td className="py-3 text-sm text-secondaryText">
                        R$ {(deal.value ?? 0).toFixed(2)}
                      </td>
                      <td className="py-3 text-sm text-secondaryText">
                        {deal.status ?? "OPEN"}
                      </td>
                      <td className="py-3 text-sm text-secondaryText">
                        {deal.stage?.name ?? "-"}
                      </td>
                      <td className="py-3">
                        <select
                          value={deal.stageId ?? ""}
                          onChange={(e) => handleStageChange(deal.id, e.target.value)}
                          disabled={updatingDealId === deal.id || stages.length === 0}
                          className="rounded-xl border border-secondary bg-bg px-3 py-2 text-sm text-secondaryText outline-none focus:border-primary disabled:opacity-50"
                        >
                          <option value="">Selecione</option>
                          {stages.map((stage) => (
                            <option key={stage.id} value={stage.id}>
                              {stage.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {recentDeals.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-sm text-secondaryText/60">
                        Nenhuma negociação encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <section className="surface rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondaryText/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </section>
  );
}
