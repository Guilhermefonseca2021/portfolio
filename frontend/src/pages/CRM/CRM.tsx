import Dropdown from "../../components/dashboard/reuses/dropdown/Dropdown";
import DropdownItem from "../../components/dashboard/reuses/dropdown/DropdownItem";
import PricingGrid from "../../components/dashboard/reuses/Pricing/PricingGrid";

export default function CRM() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <PricingGrid
        plans={[
          {
            title: "Free",
            description: "Plano gratuito",
            price: "R$ 0",
            period: "/mês",
            button: "Começar",
            features: ["1 usuário", "10 clientes", "Suporte básico"],
          },
          {
            title: "Starter",
            description: "Ideal para pequenas empresas",
            price: "R$ 49",
            period: "/mês",
            button: "Assinar",
            highlighted: true,
            features: ["5 usuários", "100 clientes", "WhatsApp", "Relatórios"],
          },
          {
            title: "Pro",
            description: "Para equipes",
            price: "R$ 99",
            period: "/mês",
            button: "Assinar",
            features: ["Usuários ilimitados", "CRM", "Automações", "API"],
          },
        ]}
      />
      <Dropdown label="Ações">
        <DropdownItem onClick={() => alert("Editar")}>Editar</DropdownItem>

        <DropdownItem onClick={() => alert("Excluir")}>Excluir</DropdownItem>

        <DropdownItem onClick={() => alert("Visualizar")}>
          Visualizar
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
