import { useNavigate } from "react-router-dom";

export default function TermsAndService() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content:
        "Ao acessar ou utilizar nossa plataforma, você declara que leu, compreendeu e concorda integralmente com estes Termos de Serviço. Caso não concorde com qualquer parte destes termos, interrompa imediatamente o uso da plataforma.",
    },
    {
      title: "2. Definições",
      list: [
        "Plataforma: sistema disponibilizado por nossa empresa.",
        "Usuário: pessoa física ou jurídica cadastrada.",
        "Conta: perfil individual criado para utilização dos serviços.",
        "Serviços: funcionalidades oferecidas pela plataforma.",
      ],
    },
    {
      title: "3. Cadastro da Conta",
      list: [
        "Fornecer informações verdadeiras e atualizadas.",
        "Manter a confidencialidade da senha.",
        "Não compartilhar credenciais de acesso.",
        "Comunicar imediatamente qualquer uso não autorizado da conta.",
      ],
    },
    {
      title: "4. Uso Permitido",
      list: [
        "Utilizar a plataforma de forma legal e ética.",
        "Não tentar acessar áreas restritas sem autorização.",
        "Não utilizar bots ou automações abusivas.",
        "Não distribuir malware, spam ou conteúdo ilícito.",
        "Respeitar direitos autorais e propriedade intelectual.",
      ],
    },
    {
      title: "5. Serviços",
      content:
        "Os recursos disponíveis poderão ser alterados, atualizados ou descontinuados a qualquer momento visando melhorias na plataforma.",
    },
    {
      title: "6. Pagamentos",
      content:
        "Alguns serviços poderão exigir assinatura ou pagamento recorrente. Os valores, formas de cobrança e políticas de cancelamento serão informados antes da contratação.",
    },
    {
      title: "7. Cancelamento",
      content:
        "O usuário poderá cancelar sua conta a qualquer momento. Determinados dados poderão ser mantidos conforme exigência legal.",
    },
    {
      title: "8. Propriedade Intelectual",
      content:
        "Todo o conteúdo da plataforma, incluindo código, identidade visual, logotipos, interfaces, banco de dados e materiais disponibilizados pertencem exclusivamente à empresa.",
    },
    {
      title: "9. Conteúdo do Usuário",
      content:
        "O usuário permanece proprietário do conteúdo enviado, concedendo apenas a licença necessária para armazenamento e funcionamento da plataforma.",
    },
    {
      title: "10. Privacidade",
      content:
        "O tratamento de dados pessoais ocorre conforme nossa Política de Privacidade e em conformidade com a LGPD.",
    },
    {
      title: "11. Segurança",
      list: [
        "Proteja sua senha.",
        "Não compartilhe sua conta.",
        "Utilize dispositivos confiáveis.",
        "Informe qualquer atividade suspeita.",
      ],
    },
    {
      title: "12. Disponibilidade",
      content:
        "Empregamos nossos melhores esforços para manter os serviços disponíveis, porém não garantimos funcionamento ininterrupto, podendo ocorrer manutenções programadas ou indisponibilidades temporárias.",
    },
    {
      title: "13. Limitação de Responsabilidade",
      list: [
        "Falhas na conexão de internet do usuário.",
        "Problemas causados por terceiros.",
        "Uso inadequado da plataforma.",
        "Perdas indiretas ou lucros cessantes.",
      ],
    },
    {
      title: "14. Suspensão da Conta",
      list: [
        "Violação destes Termos.",
        "Fraudes.",
        "Tentativas de invasão.",
        "Uso abusivo da plataforma.",
        "Atividades ilegais.",
      ],
    },
    {
      title: "15. Alterações",
      content:
        "Os Termos de Serviço poderão ser atualizados periodicamente. A versão mais recente estará sempre disponível nesta página.",
    },
    {
      title: "16. Legislação Aplicável",
      content:
        "Este documento é regido pelas leis da República Federativa do Brasil, incluindo o Código Civil, Marco Civil da Internet e a Lei Geral de Proteção de Dados (LGPD), quando aplicáveis.",
    },
    {
      title: "17. Contato",
      content:
        "Caso tenha dúvidas sobre estes Termos de Serviço, entre em contato por meio dos nossos canais oficiais de atendimento.",
    },
  ];

  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-secondary bg-card p-10 shadow-2xl">
          <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Documento Legal
          </span>

          <h1 className="text-4xl font-bold text-white">Termos de Serviço</h1>

          <p className="mt-3 text-secondaryText">
            Última atualização: <strong>24 de julho de 2026</strong>
          </p>

          <div className="my-10 h-px bg-secondary" />

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="leading-8 text-secondaryText">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="space-y-3 pl-6 text-secondaryText">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="list-disc leading-8 marker:text-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="mb-2 text-lg font-semibold text-primary">
              Importante
            </h3>

            <p className="leading-7 text-secondaryText">
              Ao criar uma conta ou continuar utilizando a plataforma, você
              confirma que leu e concorda com estes Termos de Serviço e com a
              Política de Privacidade vigente.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
