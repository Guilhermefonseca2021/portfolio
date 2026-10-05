import { useEffect, useState } from "react";
import fonsecaApi from "../../../services/fonsecaApi";
import { notifyToast } from "../../ui/GlobalToast";

import MotionReveal from "../MotionReveal";
import ContactForm from "./ContactForm";
import ServicesModal from "./ServicesModal";

export default function Contact() {
  const [modal, setModal] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);

  useEffect(() => {
    const handlePlanSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ plan?: string }>;
      const planName = customEvent.detail?.plan;

      if (!planName) {
        return;
      }

      setSelectedPlans((prev) =>
        prev.includes(planName) ? prev : [...prev, planName],
      );

      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });

      notifyToast(
        `Plano "${planName}" já está no formulário. Você pode remover ou trocar antes de enviar.`,
        "success",
      );
    };

    window.addEventListener(
      "social-plan:selected",
      handlePlanSelected as EventListener,
    );

    return () => {
      window.removeEventListener(
        "social-plan:selected",
        handlePlanSelected as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ service?: string }>;
      const serviceName = customEvent.detail?.service;

      if (!serviceName) return;

      setServices((prev) =>
        prev.includes(serviceName) ? prev : [...prev, serviceName],
      );

      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      notifyToast(
        `Serviço "${serviceName}" adicionado ao formulário. Você pode selecionar outros também.`,
        "success",
      );
    };

    window.addEventListener(
      "social-service:selected",
      handleServiceSelected as EventListener,
    );

    return () => {
      window.removeEventListener(
        "social-service:selected",
        handleServiceSelected as EventListener,
      );
    };
  }, []);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service],
    );
  }

  function togglePlan(plan: string) {
    setSelectedPlans((prev) =>
      prev.includes(plan)
        ? prev.filter((item) => item !== plan)
        : [...prev, plan],
    );
  }

  async function handleSubmit(data: ContactFormData) {
    const message = [
      "Olá, Gabriel! Gostaria de solicitar um orçamento.",
      "",
      data.name.trim() && `Nome: ${data.name.trim()}`,
      data.email.trim() && `E-mail: ${data.email.trim()}`,
      data.whatsapp.trim() && `WhatsApp: ${data.whatsapp.trim()}`,
      data.company.trim() && `Empresa: ${data.company.trim()}`,
      data.instagram.trim() && `Instagram: ${data.instagram.trim()}`,
      data.selectedPlans.length > 0 &&
        `Planos: ${data.selectedPlans.join(", ")}`,
      data.services.length > 0 && `Serviços: ${data.services.join(", ")}`,
      data.objective.trim() && `Objetivo: ${data.objective.trim()}`,
      data.companySize.trim() && `Porte da empresa: ${data.companySize.trim()}`,
      data.budget.trim() && `Orçamento: ${data.budget.trim()}`,
      data.deadline.trim() && `Prazo: ${data.deadline.trim()}`,
      data.message.trim() && `Mensagem: ${data.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappLink = `https://wa.me/5583986625571?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    try {
      const { selectedPlans: planSelections, ...leadData } = data;
      const mergedServices = [
        ...new Set([...planSelections, ...leadData.services]),
      ];

      await fonsecaApi.leads.create({
        ...leadData,
        services: mergedServices,
      });

      notifyToast(
        "Pedido enviado para orçamento com sucesso! Entraremos em contato.",
        "success",
      );
    } catch (error) {
      const message = fonsecaApi.utils.getErrorMessage(
        error,
        "Não foi possível enviar seu contato.",
      );

      notifyToast(message, "error");
    }
  }

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#0b1220]
        py-6
        md:py-14
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
        <MotionReveal
          className="
          max-w-3xl
          "
        >
          <span
            className="
            text-xs
            font-semibold
            uppercase
            tracking-[6px]
            text-primary
            "
          >
            Contato
          </span>

          <h2
            className="
            mt-5
            text-3xl
            font-bold
            leading-tight
            tracking-tight
            text-white
            sm:text-4xl
            lg:text-5xl
            "
          >
            Vamos criar algo
            <span className="text-primary"> incrível juntos.</span>
          </h2>

          <p
            className="
            mt-6
            max-w-xl
            text-lg
            leading-8
            text-white/70
            "
          >
            Conte sua ideia e receba uma estratégia personalizada para
            transformar sua marca.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <ContactForm
            services={services}
            selectedPlans={selectedPlans}
            onTogglePlan={togglePlan}
            openModal={() => setModal(true)}
            onSubmit={handleSubmit}
          />
        </MotionReveal>
      </div>

      {modal && (
        <ServicesModal
          services={services}
          toggleService={toggleService}
          close={() => setModal(false)}
        />
      )}
    </section>
  );
}
