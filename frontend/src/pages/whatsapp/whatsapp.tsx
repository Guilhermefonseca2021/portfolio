import { useEffect, useState } from "react";
import ConversationCard from "../../components/dashboard/whatsapp/ConversationCard";
import MessageBox from "../../components/dashboard/whatsapp/MessageBox";
import QuickReplies from "../../components/dashboard/whatsapp/QuickReplies";
import WhatsappStats from "../../components/dashboard/whatsapp/WhatsappStats";
import fonsecaApi from "../../services/fonsecaApi";
import type { WhatsappConversation, WhatsappSession } from "../../types/api";

export default function Whatsapp() {
  const [sessions, setSessions] = useState<WhatsappSession[]>([]);
  const [conversations, setConversations] = useState<WhatsappConversation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instanceName, setInstanceName] = useState("");
  const [creatingSession, setCreatingSession] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [selectedConversation, setSelectedConversation] =
    useState<WhatsappConversation | null>(null);
  const [qrCode, setQrCode] = useState("");
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const [sessionData, conversationData] = await Promise.all([
        fonsecaApi.whatsapp.sessions.list(),
        fonsecaApi.whatsapp.conversations.list(),
      ]);
      setSessions(sessionData);
      setConversations(conversationData);
      if (!selectedSessionId && sessionData[0]?.id) {
        setSelectedSessionId(sessionData[0].id);
      }
    } catch (err) {
      setError(
        fonsecaApi.utils.getErrorMessage(
          err,
          "Erro ao carregar dados do WhatsApp.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateSession() {
    if (!instanceName.trim()) {
      setError("Informe um nome para a instância.");
      return;
    }

    try {
      setCreatingSession(true);
      setError(null);
      await fonsecaApi.whatsapp.sessions.create({
        instanceName: instanceName.trim(),
      });
      setInstanceName("");
      await loadData();
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao criar sessão."));
    } finally {
      setCreatingSession(false);
    }
  }

  async function handleLoadQr() {
    if (!selectedSessionId) return;

    try {
      const result =
        await fonsecaApi.whatsapp.sessions.qrCode(selectedSessionId);
      setQrCode(result);
    } catch (err) {
      setError(
        fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar QR Code."),
      );
    }
  }

  async function handleSendMessage() {
    if (
      !selectedSessionId ||
      !selectedConversation?.phone ||
      !messageText.trim()
    )
      return;

    try {
      setSendingMessage(true);
      setMessageStatus(null);
      await fonsecaApi.whatsapp.messages.send({
        sessionId: selectedSessionId,
        number: selectedConversation.phone,
        text: messageText.trim(),
      });
      setMessageText("");
      setMessageStatus("Mensagem enviada com sucesso.");
    } catch (err) {
      setMessageStatus(
        fonsecaApi.utils.getErrorMessage(err, "Erro ao enviar mensagem."),
      );
    } finally {
      setSendingMessage(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">WhatsApp</h1>

        <p className="text-secondaryText/60 mt-2">
          Gerencie conversas, clientes e automações.
        </p>
      </div>

      <WhatsappStats />

      <div className="rounded-2xl border border-secondary bg-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-primary">Criar sessão</h2>
            <p className="text-sm text-secondaryText/60">
              Informe o nome da instância para abrir uma sessão real do
              WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={instanceName}
              onChange={(event) => setInstanceName(event.target.value)}
              placeholder="Ex: fonseca"
              className="rounded-xl border border-secondary bg-bg px-4 py-2 text-secondaryText outline-none"
            />
            <button
              type="button"
              onClick={handleCreateSession}
              disabled={creatingSession}
              className="rounded-xl bg-primary px-4 py-2 font-semibold text-primaryText disabled:opacity-50"
            >
              {creatingSession ? "Criando..." : "Criar sessão"}
            </button>
          </div>
        </div>
      </div>

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

          {loading && (
            <p className="text-sm text-secondaryText/70">
              Carregando conversas...
            </p>
          )}
          {!loading && !error && conversations.length === 0 && (
            <p className="text-sm text-secondaryText/70">
              Nenhuma conversa encontrada.
            </p>
          )}
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}
          {!loading &&
            !error &&
            conversations.map((item) => (
              <ConversationCard
                key={item.id}
                name={item.contactName ?? "Contato"}
                message={item.lastMessage ?? "Sem mensagens"}
                time={
                  item.lastMessageAt
                    ? new Date(item.lastMessageAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"
                }
                status={item.status === "ACTIVE" ? "online" : "offline"}
                onClick={() => setSelectedConversation(item)}
              />
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
          min-h-150
          "
        >
          <div
            className="
            p-5
            border-b
            border-secondaryText/10
            "
          >
            <h2 className="text-primary font-semibold">
              {sessions.find((session) => session.id === selectedSessionId)
                ?.instanceName ??
                sessions[0]?.instanceName ??
                "Sessão WhatsApp"}
            </h2>

            <span
              className="
              text-sm
              text-green-400
              "
            >
              {sessions.find((session) => session.id === selectedSessionId)
                ?.status ??
                sessions[0]?.status ??
                "DISCONNECTED"}
            </span>
          </div>

          <div className="flex-1 p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`rounded-full px-3 py-1 text-sm ${selectedSessionId === session.id ? "bg-primary text-primaryText" : "bg-secondaryText/10 text-secondaryText"}`}
                >
                  {session.instanceName ?? session.id}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLoadQr}
                className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText"
              >
                Gerar QR Code
              </button>
              <button
                type="button"
                onClick={() => setQrCode("")}
                className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText"
              >
                Limpar QR
              </button>
            </div>

            {qrCode && (
              <div className="rounded-xl border border-secondary bg-bg p-3 text-sm text-secondaryText">
                <p className="font-semibold">QR Code</p>
                <p className="mt-1 break-all">{qrCode}</p>
              </div>
            )}

            <div
              className="
              bg-secondaryText/10
              rounded-xl
              p-3
              max-w-sm
              text-sm
              "
            >
              {selectedConversation
                ? `Conversa selecionada: ${selectedConversation.contactName ?? "Contato"}`
                : "Selecione uma conversa para enviar uma mensagem."}
            </div>

            {messageStatus && (
              <p className="text-sm text-primary">{messageStatus}</p>
            )}
          </div>

          <QuickReplies />

          <MessageBox
            value={messageText}
            onChange={setMessageText}
            onSend={handleSendMessage}
            disabled={
              sendingMessage || !selectedSessionId || !selectedConversation
            }
          />
        </div>
      </div>
    </div>
  );
}
