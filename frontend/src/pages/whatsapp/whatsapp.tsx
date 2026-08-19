import { useEffect, useState } from "react";
import ConversationCard from "../../components/dashboard/whatsapp/ConversationCard";
import MessageBox from "../../components/dashboard/whatsapp/MessageBox";
import QuickReplies from "../../components/dashboard/whatsapp/QuickReplies";
import WhatsappStats from "../../components/dashboard/whatsapp/WhatsappStats";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import fonsecaApi from "../../services/fonsecaApi";
import type { WhatsappConversation, WhatsappSession } from "../../types/api";

export default function Whatsapp() {
  const [sessions, setSessions] = useState<WhatsappSession[]>([]);
  const [conversations, setConversations] = useState<WhatsappConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instanceName, setInstanceName] = useState("");
  const [creatingSession, setCreatingSession] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<WhatsappConversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState<string | null>(null);

  // QR Code modal state
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);

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
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
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

  async function handleOpenQrModal() {
    if (!selectedSessionId) return;

    setQrModalOpen(true);
    setQrLoading(true);
    setQrError(null);
    setQrCode("");

    try {
      const result = await fonsecaApi.whatsapp.sessions.qrCode(selectedSessionId);

      // Evolution API retorna o QR em base64 dentro de { qrcode: "data:image/png;base64,..." }
      const qrResponse = result as { qrcode?: string; base64?: string };
      const qrValue =
        typeof result === "string"
          ? result
          : qrResponse?.qrcode ?? qrResponse?.base64 ?? "";

      if (!qrValue) {
        setQrError("QR Code não disponível. Verifique se a sessão está aguardando conexão.");
        return;
      }

      setQrCode(qrValue);
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(
        err,
        "Erro ao carregar QR Code. Verifique se a Evolution API está acessível.",
      );
      setQrError(message);
    } finally {
      setQrLoading(false);
    }
  }

  async function handleSendMessage() {
    if (!selectedSessionId || !selectedConversation?.phone || !messageText.trim()) return;

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

  function getSessionStatus(session: WhatsappSession) {
    if (session.status === "CONNECTED") {
      return { label: "Conectado", color: "text-green-400" };
    }
    if (session.status === "CONNECTING") {
      return { label: "Conectando...", color: "text-yellow-400" };
    }
    return { label: "Desconectado", color: "text-red-400" };
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
              Informe o nome da instância para abrir uma sessão real do WhatsApp.
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

      <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-5">
        {/* Lista conversas */}
        <div className="bg-card rounded-2xl border border-secondaryText/10 p-4 space-y-3">
          <h2 className="font-semibold text-lg text-primary">Conversas</h2>

          {loading && (
            <p className="text-sm text-secondaryText/70">Carregando conversas...</p>
          )}
          {!loading && !error && conversations.length === 0 && (
            <p className="text-sm text-secondaryText/70">Nenhuma conversa encontrada.</p>
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
        <div className="bg-card rounded-2xl border border-secondaryText/10 flex flex-col min-h-150">
          <div className="p-5 border-b border-secondaryText/10">
            <h2 className="text-primary font-semibold">
              {sessions.find((session) => session.id === selectedSessionId)?.instanceName ??
                sessions[0]?.instanceName ??
                "Sessão WhatsApp"}
            </h2>

            <span className="text-sm text-green-400">
              {(() => {
                const found = sessions.find((s) => s.id === selectedSessionId) ?? sessions[0];
                return found ? getSessionStatus(found).label : "DISCONNECTED";
              })()}
            </span>
          </div>

          <div className="flex-1 p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    selectedSessionId === session.id
                      ? "bg-primary text-primaryText"
                      : "bg-secondaryText/10 text-secondaryText"
                  }`}
                >
                  {session.instanceName ?? session.id}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleOpenQrModal}
                disabled={!selectedSessionId}
                className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText disabled:opacity-50"
              >
                Gerar QR Code
              </button>
            </div>

            <div className="bg-secondaryText/10 rounded-xl p-3 max-w-sm text-sm">
              {selectedConversation
                ? `Conversa selecionada: ${selectedConversation.contactName ?? "Contato"}`
                : "Selecione uma conversa para enviar uma mensagem."}
            </div>

            {messageStatus && <p className="text-sm text-primary">{messageStatus}</p>}
          </div>

          <QuickReplies />

          <MessageBox
            value={messageText}
            onChange={setMessageText}
            onSend={handleSendMessage}
            disabled={sendingMessage || !selectedSessionId || !selectedConversation}
          />
        </div>
      </div>

      {/* Modal QR Code */}
      <Modal
        open={qrModalOpen}
        title="Conectar WhatsApp"
        width="md"
        onClose={() => setQrModalOpen(false)}
      >
        <div className="space-y-5">
          <p className="text-sm text-secondaryText/70">
            Escaneie o QR Code abaixo com o WhatsApp do seu celular para
            conectar esta sessão.
          </p>

          {qrLoading && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-secondaryText/70">
                Carregando QR Code...
              </p>
            </div>
          )}

          {qrError && !qrLoading && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {qrError}
            </div>
          )}

          {qrCode && !qrLoading && !qrError && (
            <div className="flex flex-col items-center gap-4">
              {qrCode.startsWith("data:image") || qrCode.startsWith("http") ? (
                <img
                  src={qrCode}
                  alt="QR Code WhatsApp"
                  className="h-64 w-64 rounded-xl border border-secondary bg-white p-2"
                />
              ) : (
                <p className="break-all rounded-xl border border-secondary bg-bg p-4 text-xs text-secondaryText">
                  {qrCode}
                </p>
              )}

              <p className="text-xs text-secondaryText/60">
                Abra o WhatsApp → Aparelhos conectados → Conectar um aparelho
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setQrModalOpen(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleOpenQrModal}
              disabled={qrLoading}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              Atualizar QR Code
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
