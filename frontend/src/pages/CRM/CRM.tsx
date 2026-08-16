import { useEffect, useState } from "react";
import fonsecaApi from "../../services/fonsecaApi";
import type { Deal, Pipeline, PipelineStage } from "../../types/api";

export default function CRM() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [pipelineData, dealData] = await Promise.all([
          fonsecaApi.pipelines.list(),
          fonsecaApi.deals.list(),
        ]);

        setPipelines(pipelineData);
        setDeals(dealData);

        if (pipelineData[0]) {
          const stageData = await fonsecaApi.pipelineStages.list(
            pipelineData[0].id,
          );
          setStages(stageData);
        }
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar CRM."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">CRM</h1>
        <p className="mt-2 text-secondaryText/60">
          Visualize pipelines, etapas e negociações do backend.
        </p>
      </div>

      {loading && <p className="text-secondaryText/70">Carregando CRM...</p>}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-secondary bg-card p-5">
            <h2 className="mb-3 text-lg font-semibold text-secondaryText">
              Pipelines
            </h2>
            <div className="space-y-3">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className="rounded-xl border border-secondary/70 bg-bg p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-secondaryText">
                      {pipeline.name}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {pipeline.status ?? "ACTIVE"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-secondaryText/60">
                    {pipeline.description ?? "Sem descrição"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-secondary bg-card p-5">
            <h2 className="mb-3 text-lg font-semibold text-secondaryText">
              Etapas
            </h2>
            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="rounded-xl border border-secondary/70 bg-bg p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-secondaryText">
                      {stage.name}
                    </h3>
                    <span className="text-xs text-secondaryText/60">
                      Posição {stage.position ?? 0}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-2 rounded-full"
                    style={{ backgroundColor: stage.color ?? "#3b82f6" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="rounded-2xl border border-secondary bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold text-secondaryText">
            Negociações
          </h2>
          <div className="space-y-3">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-xl border border-secondary/70 bg-bg p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-secondaryText">
                    {deal.title ?? "Negociação"}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {deal.status ?? "OPEN"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-secondaryText/60">
                  {deal.description ?? "Sem descrição"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
