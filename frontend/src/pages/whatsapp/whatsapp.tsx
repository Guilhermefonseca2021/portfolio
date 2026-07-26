import MessageBox from "../../components/dashboard/whatsapp/MessageBox";
import QuickReplies from "../../components/dashboard/whatsapp/QuickReplies";
import ConversationCard from "../../components/dashboard/whatsapp/ConversationCard";
import WhatsappStats from "../../components/dashboard/whatsapp/WhatsappStats";

type Conversation = {
  name: string;
  message: string;
  time: string;
  status: "online" | "offline";
};

const conversations: Conversation[] = [
  {
    name: "João Silva",
    message: "Olá, gostaria de saber o preço.",
    time: "10:32",
    status: "online",
  },
  {
    name: "Maria Souza",
    message: "Obrigado pelo atendimento!",
    time: "09:15",
    status: "offline",
  },
  {
    name: "Empresa XPTO",
    message: "Preciso de uma proposta.",
    time: "08:40",
    status: "online",
  },
];
export default function Whatsapp() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">WhatsApp</h1>

        <p className="text-secondaryText/60 mt-2">
          Gerencie conversas, clientes e automações.
        </p>
      </div>

      <WhatsappStats />

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-[350px_1fr]
        gap-5
        "
      >
        {/* Lista conversas */}
        <div
          className="
          bg-card
          rounded-2xl
          border
          border-secondaryText/10
          p-4
          space-y-3
          "
        >
          <h2 className="font-semibold text-lg text-primary">Conversas</h2>

          {conversations.map((item, index) => (
            <ConversationCard key={index} {...item} />
          ))}
        </div>

        {/* Chat */}
        <div
          className="
          bg-card
          rounded-2xl
          border
          border-secondaryText/10
          flex
          flex-col
          min-h-[600px]
          "
        >
          <div
            className="
            p-5
            border-b
            border-secondaryText/10
            "
          >
            <h2 className="text-primary font-semibold">João Silva</h2>

            <span
              className="
              text-sm
              text-green-400
              "
            >
              Online
            </span>
          </div>

          <div className="flex-1 p-5">
            <div
              className="
              bg-secondaryText/10
              rounded-xl
              p-3
              max-w-sm
              text-sm
              "
            >
              Olá, gostaria de saber mais informações.
            </div>
          </div>

          <QuickReplies />

          <MessageBox />
        </div>
      </div>
    </div>
  );
}
