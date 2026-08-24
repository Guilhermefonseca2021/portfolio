import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import type { Deal, Pipeline, PipelineStage } from "../../types/api";

export default function CRM() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(null);
  const [updatingDealId, setUpdatingDealId] = useState<string | null>(null);
  const [pipelineModalOpen, setPipelineModalOpen] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const [creatingPipeline, setCreatingPipeline] = useState(false);

  async function loadStages(pipelineId: string) {
    try {
      const stageData = await fonsecaApi.pipelineStages.list(pipelineId);
      setStages(stageData);
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar etapas."));
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const pipelineData = await fonsecaApi.pipelines.list();
        const dealData = await fonsecaApi.deals.list();

        setPipelines(pipelineData);
        setDeals(dealData);

        if (pipelineData[0]) {
          setSelectedPipelineId(pipelineData[0].id);
          await loadStages(pipelineData[0].id);
        }
      } catch (err) {
        setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar CRM."));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handlePipelineSelect(pipelineId: string) {
    setSelectedPipelineId(pipelineId);
    setError(null);
    await loadStages(pipelineId);
  }

  async function handleCreatePipeline() {
    if (!newPipelineName.trim()) return;

    try {
      setCreatingPipeline(true);
      setError(null);
      await fonsecaApi.pipelines.create({ name: newPipelineName.trim() });
      setNewPipelineName("");
      setPipelineModalOpen(false);
      notifyToast("Pipeline criada com sucesso.", "success");
      const pipelineData = await fonsecaApi.pipelines.list();
      setPipelines(pipelineData);
      if (pipelineData[0]) {
        setSelectedPipelineId(pipelineData[0].id);
        await loadStages(pipelineData[0].id);
      }
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao criar pipeline."));
    } finally {
      setCreatingPipeline(false);
    }
  }

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

  const dealsByStage = stages.reduce<Record<string, Deal[]>>((acc, stage) => {
    acc[stage.id] = deals.filter((deal) => deal.stageId === stage.id);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">CRM</h1>
          <p className="mt-2 text-secondaryText/60">
            Visualize pipelines, etapas e negociações do backend.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedPipelineId ?? ""}
            onChange={(e) => handlePipelineSelect(e.target.value)}
            className="rounded-xl border border-secondary bg-bg px-4 py-2 text-sm text-secondaryText outline-none focus:border-primary"
          >
            <option value="">Selecione um pipeline</option>
            {pipelines.map((pipeline) => (
              <option key={pipeline.id} value={pipeline.id}>
                {pipeline.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setPipelineModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90"
          >
            <FiPlusCircle size={16} />
            Nova Pipeline
          </button>
        </div>
      </div>

      {loading && <p className="text-secondaryText/70">Carregando CRM...</p>}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 overflow-x-auto lg:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => {
            const stageDeals = dealsByStage[stage.id] ?? [];
            const stageAmount = stageDeals.reduce((sum, deal) => sum + (deal.value ?? 0), 0);

            return (
              <div
                key={stage.id}
                className="min-w-[280px] rounded-2xl border border-secondary bg-card p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-secondaryText">{stage.name}</h3>
                    <p className="text-xs text-secondaryText/60">
                      {stageDeals.length} negociação(ões) · R$ {stageAmount.toFixed(2)}
                    </p>
                  </div>
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: stage.color ?? "#3b82f6" }}
                  />
                </div>

                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="rounded-xl border border-secondary/70 bg-bg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-secondaryText">
                          {deal.title ?? "Negociação"}
                        </h4>
                        <span className="text-xs text-secondaryText/60">
                          R$ {(deal.value ?? 0).toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-secondaryText/60">
                        {deal.customer?.name ?? "Sem cliente"}
                      </p>
                      <div className="mt-3">
                        <select
                          value={deal.stageId ?? ""}
                          onChange={(e) => handleStageChange(deal.id, e.target.value)}
                          disabled={updatingDealId === deal.id}
                          className="w-full rounded-xl border border-secondary bg-card px-3 py-2 text-xs text-secondaryText outline-none focus:border-primary disabled:opacity-50"
                        >
                          <option value="">Mover para...</option>
                          {stages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <p className="py-4 text-center text-xs text-secondaryText/50">
                      Nenhuma negociação nesta etapa.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Nova Pipeline */}
      <Modal open={pipelineModalOpen} title="Nova Pipeline" width="sm" onClose={() => setPipelineModalOpen(false)}>
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-secondaryText">Nome da pipeline</label>
            <input
              value={newPipelineName}
              onChange={(e) => setNewPipelineName(e.target.value)}
              placeholder="Ex: Vendas, Marketing, ..."
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setPipelineModalOpen(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleCreatePipeline}
              disabled={creatingPipeline || !newPipelineName.trim()}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {creatingPipeline ? "Criando..." : "Criar pipeline"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
