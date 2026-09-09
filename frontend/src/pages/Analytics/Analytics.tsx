import { useEffect, useMemo, useState } from "react";
import {
  FiDollarSign,
  FiUsers,
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

export default function Analytics() {
  const { user, loading: userLoading } = useUserContext();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
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
      notifyToast("Erro ao carregar analytics.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value ?? 0), 0);
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

  const greeting = userLoading
    ? "Carregando informações..."
    : `Bem-vindo, ${user?.name ?? "usuário"}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Analytics</h1>
        <p className="mt-2 text-secondaryText/60">{greeting}</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-secondary bg-card p-6">
              <p className="text-secondaryText/70">Carregando...</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
            <section className="rounded-2xl border border-secondary bg-card p-6">
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

            <section className="rounded-2xl border border-secondary bg-card p-6">
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

            <section className="rounded-2xl border border-secondary bg-card p-6 lg:col-span-2">
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
          </div>
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
    <section className="rounded-2xl border border-secondary bg-card p-6">
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
