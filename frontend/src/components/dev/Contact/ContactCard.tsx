import { useState } from "react";
import ContactItem from "./ContactItem";
import fonsecaApi from "../../../services/fonsecaApi";
import { notifyToast } from "../../ui/GlobalToast";

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

export default function ContactCard() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      notifyToast("Nome e e-mail são obrigatórios.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await fonsecaApi.leads.create({
        name: form.name.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim() || undefined,
        objective: form.message.trim() || undefined,
        message: form.message.trim() || undefined,
      });

      notifyToast(
        "Pedido enviado para orçamento com sucesso! Entraremos em contato.",
        "success",
      );
      setForm({ name: "", email: "", whatsapp: "", message: "" });
    } catch {
      notifyToast("Não foi possível enviar seu contato.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-10 text-sm">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-8 text-3xl font-bold text-secondaryText">
            Entre em contato
          </h3>

          <div className="space-y-6">
            <ContactItem
              icon="📧"
              title="Email"
              value="gsbloogs194@email.com"
            />

            <ContactItem
              icon="📱"
              title="WhatsApp"
              value="+55 (83) 99812-9695"
            />

            <ContactItem
              icon="💼"
              title="LinkedIn"
              value="linkedin.com/in/guilhermefonseca2021"
            />

            <ContactItem
              icon="🐙"
              title="GitHub"
              value="github.com/Guilhermefonseca2021"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="mb-4 text-xl font-bold text-secondaryText">
            Solicite um orçamento
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Seu nome"
              className="input"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Seu e-mail"
              className="input"
            />

            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
              className="input"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Conte sobre seu projeto..."
              className="input min-h-[100px] resize-y"
            />

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Solicitar orçamento"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
