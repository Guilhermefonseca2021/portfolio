import {
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="h-dvh bg-bg">
      {/* MOBILE */}
      <section className="h-full w-full overflow-y-auto lg:hidden bg-background">
        <div className="min-h-full w-full h-full">
          <Outlet />
        </div>
      </section>

      {/* DESKTOP */}
      <section className="hidden h-full lg:block">
        <div className="mx-auto h-full max-w-7xl px-5 py-5 lg:px-8 lg:py-8">
          <div className="grid h-full overflow-hidden rounded-3xl border border-white/10 bg-card lg:grid-cols-2">
            {/* Lado esquerdo */}
            <section className="flex h-full bg-secondary">
              <div className="flex h-full w-full flex-col justify-center px-12">
                <h1 className="mt-6 text-5xl font-black leading-tight text-secondaryText">
                  <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                    Transparência é com a gente.
                  </span>

                  <br />

                  <span className="text-primary">Conexão B2B.</span>
                </h1>

                <p className="mt-5 max-w-md text-base leading-7 text-secondaryText/75">
                  Mantemos os serviços da sua empresa, gerencie contratos,
                  automatize cobranças recorrentes e acompanhe os resultados em
                  tempo real.
                </p>

                <div className="mt-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <HiOutlineChartBar size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-secondaryText">
                        Dashboard e Resultados
                      </h3>

                      <p className="text-sm text-secondaryText/60">
                        Métricas claras para acompanhar o desempenho dos
                        serviços.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <HiOutlineCreditCard size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-secondaryText">
                        Cobrança Recorrente
                      </h3>

                      <p className="text-sm text-secondaryText/60">
                        Facilite pagamentos e recebimentos automáticos com
                        clientes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <HiOutlineDocumentText size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-secondaryText">
                        Contratos e Alinhamento
                      </h3>

                      <p className="text-sm text-secondaryText/60">
                        Termos, acordos e andamento centralizados na plataforma.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-10 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">B2B</p>

                    <span className="text-xs text-secondaryText/60">
                      Foco Total
                    </span>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-primary">100%</p>

                    <span className="text-xs text-secondaryText/60">
                      Integrado
                    </span>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-primary">Sync</p>

                    <span className="text-xs text-secondaryText/60">
                      Em Tempo Real
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Formulário Desktop */}
            <section className="flex flex-1 justify-center overflow-y-auto bg-bg p-8">
              <div className="w-full max-w-lg">
                <Outlet />
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
