import { useState } from "react";

export default function PaymentForm() {
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  function update(field: keyof typeof card, value: string) {
    if (field === "number") {
      value = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (field === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);

      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    setCard((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    console.log(card);
  }

  return (
    <section className="rounded-2xl border border-secondary bg-card p-6">
      <h2 className="text-2xl font-bold text-primary">Novo Cartão</h2>

      <p className="mt-2 text-secondaryText/60">
        Adicione ou atualize seu método de pagamento.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Preview (virá no próximo componente) */}
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-secondary p-10">
          <span className="text-secondaryText/50">Card Preview</span>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-secondaryText">
              Número
            </label>

            <input
              value={card.number}
              onChange={(e) => update("number", e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full rounded-xl border border-secondary bg-secondary px-4 py-3 text-secondaryText outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-secondaryText">
              Nome
            </label>

            <input
              value={card.holder}
              onChange={(e) => update("holder", e.target.value)}
              placeholder="Nome impresso no cartão"
              className="w-full rounded-xl border border-secondary bg-secondary px-4 py-3 text-secondaryText outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-secondaryText">
                Validade
              </label>

              <input
                value={card.expiry}
                onChange={(e) => update("expiry", e.target.value)}
                placeholder="MM/AA"
                className="w-full rounded-xl border border-secondary bg-secondary px-4 py-3 text-secondaryText outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-secondaryText">
                CVV
              </label>

              <input
                value={card.cvv}
                onChange={(e) => update("cvv", e.target.value)}
                placeholder="123"
                className="w-full rounded-xl border border-secondary bg-secondary px-4 py-3 text-secondaryText outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-primary py-3 font-semibold text-primaryText transition hover:opacity-90"
          >
            Salvar Cartão
          </button>
        </div>
      </form>
    </section>
  );
}
