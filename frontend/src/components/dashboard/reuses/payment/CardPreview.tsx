interface CardPreviewProps {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  showBack?: boolean;
}

export default function CardPreview({
  number,
  holder,
  expiry,
  cvv,
  showBack = false,
}: CardPreviewProps) {
  return (
    <div className="w-full max-w-md [perspective:1000px]">
      <div
        className={`
          relative h-60 w-full
          transition-all duration-500
          [transform-style:preserve-3d]
          ${showBack ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* Frente */}
        <div
          className="
            absolute inset-0
            rounded-3xl
            border border-primary/20
            bg-gradient-to-br
            from-bgAccent
            via-accent
            to-primary
            p-6
            text-white
            shadow-2xl
            [backface-visibility:hidden]
          "
        >
          <div className="flex justify-between">
            <span className="text-sm font-semibold tracking-widest">
              PREMIUM
            </span>

            <span className="font-bold text-xl">VISA</span>
          </div>

          <div className="mt-12 text-2xl tracking-[0.25em] font-semibold">
            {number || "•••• •••• •••• ••••"}
          </div>

          <div className="mt-10 flex justify-between">
            <div>
              <p className="text-xs opacity-70">CARD HOLDER</p>

              <p className="mt-1 font-medium uppercase">
                {holder || "SEU NOME"}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">EXPIRES</p>

              <p className="mt-1 font-medium">{expiry || "MM/YY"}</p>
            </div>
          </div>
        </div>

        {/* Verso */}
        <div
          className="
            absolute inset-0
            rounded-3xl
            border border-primary/20
            bg-gradient-to-br
            from-bgAccent
            via-accent
            to-primary
            text-white
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          <div className="mt-6 h-12 bg-black" />

          <div className="px-6 pt-8">
            <div className="flex items-center">
              <div className="h-10 flex-1 rounded bg-white/90" />

              <div className="ml-3 rounded bg-white px-3 py-2 font-bold text-primaryText">
                {cvv || "***"}
              </div>
            </div>

            <p className="mt-2 text-right text-xs opacity-70">
              Código de Segurança
            </p>

            <div className="mt-10 flex justify-end text-2xl font-bold">
              VISA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
