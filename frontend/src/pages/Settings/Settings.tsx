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

export default function Settings() {
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

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Nome da empresa
            </label>

            <input
              defaultValue="Fonseca Software"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              CNPJ
            </label>

            <input
              placeholder="00.000.000/0001-00"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Telefone
            </label>

            <input
              placeholder="(83) 99999-9999"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Site
            </label>

            <input
              placeholder="https://"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>
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
              Integração com a Meta Cloud API.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Número conectado
            </label>

            <input
              placeholder="+55 83 99999-9999"
              className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText/70">
              Status
            </label>

            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 font-semibold text-green-400">
              Conectado
            </div>
          </div>
        </div>
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
        <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-primaryText transition hover:opacity-90">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
