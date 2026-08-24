import { useEffect, useState } from "react";
import {
  HiBell,
  HiBuildingOffice2,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiCreditCard,
  HiShieldCheck,
  HiSparkles,
  HiUsers,
} from "react-icons/hi2";
import fonsecaApi from "../../services/fonsecaApi";

export default function Settings() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [whatsappSessions, setWhatsappSessions] = useState<WhatsappSession[]>(
    [],
  );

  useEffect(() => {
    async function loadCompany() {
      try {
        setLoading(true);
        const data = await fonsecaApi.company.getMe();
        setCompany(data);
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar empresa."),
        );
      } finally {
        setLoading(false);
      }
    }

    async function loadWhatsappSessions() {
      try {
        const sessions = await fonsecaApi.whatsapp.sessions.list();
        setWhatsappSessions(sessions);
      } catch {
        // Não bloqueia a página se as sessões falharem
      }
    }

    loadCompany();
    loadWhatsappSessions();
  }, []);

  async function handleSave() {
    if (!company) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      const updated = await fonsecaApi.company.updateMe({
        name: company.name,
        fantasyName: company.fantasyName,
        document: company.document,
        email: company.email,
        phone: company.phone,
        website: company.website,
        logo: company.logo,
        timezone: company.timezone,
      });
      setCompany(updated);
      setSuccess("Empresa atualizada com sucesso.");
    } catch (err) {
      setError(
        fonsecaApi.utils.getErrorMessage(err, "Erro ao atualizar empresa."),
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-secondaryText">Configurações</h1>

        <p className="mt-1 text-secondaryText/60">
          Gerencie sua empresa, integrações, usuários e assinatura.
        </p>
      </div>

      {/* Empresa */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiBuildingOffice2 size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">Empresa</h2>

            <p className="text-sm text-secondaryText/50">
              Informações exibidas aos seus clientes.
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-secondaryText/70">Carregando empresa...</p>
        )}
        {error && (
          <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
            {success}
          </p>
        )}

        {company && (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                Nome da empresa
              </label>

              <input
                value={company.name}
                onChange={(event) =>
                  setCompany({ ...company, name: event.target.value })
                }
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                Nome fantasia
              </label>

              <input
                value={company.fantasyName ?? ""}
                onChange={(event) =>
                  setCompany({ ...company, fantasyName: event.target.value })
                }
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                CNPJ
              </label>

              <input
                value={company.document ?? ""}
                onChange={(event) =>
                  setCompany({ ...company, document: event.target.value })
                }
                placeholder="00.000.000/0001-00"
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                E-mail
              </label>

              <input
                value={company.email ?? ""}
                onChange={(event) =>
                  setCompany({ ...company, email: event.target.value })
                }
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                Telefone
              </label>

              <input
                value={company.phone ?? ""}
                onChange={(event) =>
                  setCompany({ ...company, phone: event.target.value })
                }
                placeholder="(83) 99999-9999"
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-secondaryText/70">
                Site
              </label>

              <input
                value={company.website ?? ""}
                onChange={(event) =>
                  setCompany({ ...company, website: event.target.value })
                }
                placeholder="https://"
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        )}
      </section>

      {/* Assinatura */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiCreditCard size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">Assinatura</h2>

            <p className="text-sm text-secondaryText/50">
              Informações do seu plano.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-secondary bg-bg p-5">
            <p className="text-sm text-secondaryText/60">Plano Atual</p>

            <h3 className="mt-2 text-xl font-bold text-primary">
              Professional
            </h3>
          </div>

          <div className="rounded-xl border border-secondary bg-bg p-5">
            <p className="text-sm text-secondaryText/60">Próxima cobrança</p>

            <h3 className="mt-2 text-xl font-bold text-secondaryText">
              10/09/2026
            </h3>
          </div>

          <div className="rounded-xl border border-secondary bg-bg p-5">
            <p className="text-sm text-secondaryText/60">Situação</p>

            <h3 className="mt-2 font-bold text-green-400">Ativa</h3>
          </div>
        </div>
      </section>

      {/* Usuários */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiUsers size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">Usuários</h2>

            <p className="text-sm text-secondaryText/50">
              Equipe que possui acesso ao CRM.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {["Administrador", "Gerente Comercial", "Atendente"].map((user) => (
            <div
              key={user}
              className="flex items-center justify-between rounded-xl border border-secondary bg-bg p-4"
            >
              <div>
                <p className="font-semibold text-secondaryText">{user}</p>

                <span className="text-sm text-secondaryText/60">
                  Possui acesso ao sistema.
                </span>
              </div>

              <button className="rounded-lg border border-secondary px-4 py-2 text-sm transition hover:border-primary">
                Editar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiChatBubbleLeftRight size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">
              WhatsApp Business
            </h2>

            <p className="text-sm text-secondaryText/50">
              Sessões conectadas à plataforma.
            </p>
          </div>
        </div>

        {whatsappSessions.length === 0 ? (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-300">
            Nenhuma sessão WhatsApp conectada. Acesse a página WhatsApp para
            criar uma sessão.
          </div>
        ) : (
          <div className="space-y-4">
            {whatsappSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-xl border border-secondary bg-bg p-4"
              >
                <div>
                  <p className="font-semibold text-secondaryText">
                    {session.instanceName ?? session.id}
                  </p>

                  <span className="text-sm text-secondaryText/60">
                    {session.phone ?? "Número não informado"}
                  </span>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    session.status === "CONNECTED"
                      ? "border-green-500/30 bg-green-500/15 text-green-400"
                      : session.status === "CONNECTING"
                        ? "border-yellow-500/30 bg-yellow-500/15 text-yellow-400"
                        : "border-red-500/30 bg-red-500/15 text-red-400"
                  }`}
                >
                  {session.status === "CONNECTED"
                    ? "Conectado"
                    : session.status === "CONNECTING"
                      ? "Conectando..."
                      : "Desconectado"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* IA */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiSparkles size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">
              Inteligência Artificial
            </h2>

            <p className="text-sm text-secondaryText/50">
              Configure a IA responsável pelos atendimentos.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Modelo
            </label>

            <select className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none">
              <option>GPT-5.5</option>

              <option>Gemini</option>

              <option>Claude</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Temperatura
            </label>

            <input
              defaultValue="0.7"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Sistema */}

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <HiBell size={22} className="text-primary" />

            <h2 className="text-xl font-bold text-secondaryText">
              Notificações
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Receber notificações por Email",
              "Receber Push",
              "Notificar novos Leads",
              "Notificar novas mensagens",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between rounded-xl border border-secondary bg-bg p-4"
              >
                <span className="text-secondaryText">{item}</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-primary"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <HiShieldCheck size={22} className="text-primary" />

            <h2 className="text-xl font-bold text-secondaryText">Segurança</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full rounded-xl border border-secondary bg-bg px-5 py-3 text-left transition hover:border-primary">
              Alterar senha
            </button>

            <button className="w-full rounded-xl border border-secondary bg-bg px-5 py-3 text-left transition hover:border-primary">
              Configurar autenticação em duas etapas
            </button>

            <button className="w-full rounded-xl border border-secondary bg-bg px-5 py-3 text-left transition hover:border-primary">
              Encerrar sessões ativas
            </button>

            <button className="w-full rounded-xl border border-secondary bg-bg px-5 py-3 text-left transition hover:border-primary">
              Visualizar logs de acesso
            </button>
          </div>
        </div>
      </section>

      {/* Integrações */}

      <section className="rounded-2xl border border-secondary bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HiCog6Tooth size={24} className="text-primary" />

          <div>
            <h2 className="text-xl font-bold text-secondaryText">
              Integrações
            </h2>

            <p className="text-sm text-secondaryText/50">
              Serviços disponíveis para conectar ao CRM.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Instagram",
            "Facebook",
            "Google",
            "OpenAI",
            "Gemini",
            "SMTP",
            "Stripe",
            "Mercado Pago",
          ].map((integration) => (
            <div
              key={integration}
              className="rounded-xl border border-secondary bg-bg p-5"
            >
              <h3 className="font-semibold text-secondaryText">
                {integration}
              </h3>

              <p className="mt-2 text-sm text-secondaryText/50">
                Não conectado
              </p>

              <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primaryText">
                Conectar
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || !company}
          className="rounded-xl bg-primary px-8 py-3 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
