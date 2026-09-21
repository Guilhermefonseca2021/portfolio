import CaptureCarousel from "./CaptureCarousel";

export default function Captures() {
  return (
    <section
      id="captacoes"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#0b1220]
        py-4
        md:py-8
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-8
        "
      >
        <div
          className="
            grid
            items-center
            gap-16
            lg:grid-cols-2
          "
        >
          {/* Imagem */}
          <div
            className="
              flex
              justify-center
            "
          >
            <CaptureCarousel />
          </div>

          {/* Texto */}
          <div
            className="
              max-w-xl
            "
          >
            <span
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[6px]
                text-primary
              "
            >
              Bastidores
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                leading-[1.1]
                tracking-tight
                text-primary
                sm:text-4xl
                lg:text-5xl
              "
            >
              Cada vídeo começa
              <br />
              muito antes da edição.
            </h2>

            <p
              className="
                mt-7
                text-lg
                leading-8
                text-white/70
              "
            >
              Produção cinematográfica para marcas que querem transformar
              conteúdo em percepção, autoridade e conexão com o público.
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-3
              "
            >
              {["Social Media", "Conteúdo Visual", "Branding"].map((item) => (
                <span
                  key={item}
                  className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.02]
                      px-5
                      py-2
                      text-sm
                      text-white/70
                    "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
