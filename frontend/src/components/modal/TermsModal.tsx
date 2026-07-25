import { Link } from "react-router-dom";

type TermsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function TermsModal({ open, onClose }: TermsModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-secondary bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-secondary px-6 py-5">
          <h2 className="text-2xl font-bold text-white">Termos de Serviço</h2>

          <button
            onClick={onClose}
            className="text-3xl text-secondaryText transition hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-6 py-6 text-secondaryText">
          <section>
            <h3 className="mb-2 text-lg font-semibold text-white">
              1. Aceitação
            </h3>
            <p>
              Ao criar uma conta você concorda com nossos Termos de Serviço e
              Política de Privacidade.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-semibold text-white">
              2. Cadastro
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Forneça informações verdadeiras.</li>
              <li>Mantenha sua senha protegida.</li>
              <li>Você é responsável pela sua conta.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-semibold text-white">
              3. Uso da Plataforma
            </h3>

            <ul className="list-disc space-y-2 pl-5">
              <li>Não utilize para atividades ilegais.</li>
              <li>Não tente invadir ou explorar falhas.</li>
              <li>Respeite outros usuários.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-semibold text-white">
              4. Privacidade
            </h3>

            <p>
              Seus dados são tratados conforme nossa Política de Privacidade e
              em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-semibold text-white">
              5. Alterações
            </h3>

            <p>
              Estes termos podem ser atualizados periodicamente. A versão mais
              recente estará sempre disponível na plataforma.
            </p>
          </section>

          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
            <p className="text-sm">
              Para ler a versão completa, acesse{" "}
              <Link
                to="/terms"
                target="_blank"
                className="font-semibold text-primary hover:underline"
              >
                Termos de Serviço
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-secondary p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
          >
            Fechar
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-5 py-2 font-semibold text-primaryText transition hover:opacity-90"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
