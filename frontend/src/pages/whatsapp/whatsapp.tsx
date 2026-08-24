import { useEffect, useState } from "react";
import {
  FiTrash2,
  FiRefreshCw,
  FiMessageSquare,
  FiCopy,
} from "react-icons/fi";
import {
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineClipboardList,
} from "react-icons/hi";
import ConversationCard from "../../components/dashboard/whatsapp/ConversationCard";
import MessageBox from "../../components/dashboard/whatsapp/MessageBox";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { WhatsappSession, WhatsappConversation, WhatsappMessage } from "../../types/api";

type ConnectionState = "DISCONNECTED" | "CONNECTING" | "CONNECTED";

const CONNECTION_LABEL: Record<ConnectionState, string> = {
  DISCONNECTED: "Desconectado",
  CONNECTING: "Conectando...",
  CONNECTED: "Conectado",
};

const CONNECTION_COLOR: Record<ConnectionState, string> = {
  DISCONNECTED: "text-red-400",
  CONNECTING: "text-yellow-400",
  CONNECTED: "text-green-400",
};

export default function Whatsapp() {
  const [sessions, setSessions] = useState<WhatsappSession[]>([]);
  const [conversations, setConversations] = useState<WhatsappConversation[]>([]);
  const [messages, setMessages] = useState<WhatsappMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instanceName, setInstanceName] = useState("");
  const [creatingSession, setCreatingSession] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<WhatsappConversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>("DISCONNECTED");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId) ?? sessions[0] ?? null;

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
      setSelectedSessionId((current) => current ?? sessionData[0]?.id ?? null);
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar WhatsApp."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedSessionId) return;
    let timer: ReturnType<typeof setInterval> | null = null;

    async function poll() {
      try {
        const state = await fonsecaApi.whatsapp.sessions.status(selectedSessionId);
        setConnectionState((state ?? "DISCONNECTED") as ConnectionState);
      } catch {
        setConnectionState("DISCONNECTED");
      }
    }

    poll();
    timer = setInterval(poll, 5000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [selectedSessionId]);

  async function loadMessages(conversationId: string) {
    try {
      const data = await fonsecaApi.whatsapp.messages.listByConversation(conversationId);
      setMessages(data);
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => {
    if (!selectedConversation?.id) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMessages(selectedConversation.id);
  }, [selectedConversation?.id]);

  async function handleCreateSession() {
    if (!instanceName.trim()) {
      setError("Informe um nome para a instância.");
      return;
    }

    try {
      setCreatingSession(true);
      setError(null);
      await fonsecaApi.whatsapp.sessions.create({ instanceName: instanceName.trim() });
      setInstanceName("");
      await loadData();
      notifyToast("Sessão criada.", "success");
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao criar sessão."));
    } finally {
      setCreatingSession(false);
    }
  }

  async function handleDeleteSession(id: string) {
    if (!window.confirm("Excluir esta instância? Esta ação não pode ser desfeita.")) return;

    try {
      await fonsecaApi.whatsapp.sessions.remove(id);
      notifyToast("Instância removida.", "success");
      if (selectedSessionId === id) {
        setSelectedSessionId(null);
        setMessages([]);
      }
      await loadData();
    } catch (err) {
      notifyToast(fonsecaApi.utils.getErrorMessage(err, "Erro ao remover instância."), "error");
    }
  }

  async function handleLogout(id: string) {
    try {
      await fonsecaApi.whatsapp.sessions.logout(id);
      notifyToast("Logout enviado.", "success");
      if (selectedSessionId === id) {
        setConnectionState("DISCONNECTED");
      }
    } catch (err) {
      notifyToast(fonsecaApi.utils.getErrorMessage(err, "Erro ao desconectar."), "error");
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
      const qrResponse = result as { qrcode?: string; base64?: string };
      const qrValue = qrResponse?.qrcode ?? qrResponse?.base64 ?? "";

      if (!qrValue) {
        setQrError("QR Code não disponível. Verifique se a sessão está aguardando conexão.");
        return;
      }

      setQrCode(qrValue);
    } catch (err) {
      setQrError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar QR Code."));
    } finally {
      setQrLoading(false);
    }
  }

  function startEditSession(session: WhatsappSession) {
    setEditingSessionId(session.id);
    setEditName(session.instanceName ?? "");
  }

  async function saveEditSession() {
    if (!editingSessionId || !editName.trim()) return;

    try {
      setSavingEdit(true);
      await fonsecaApi.whatsapp.sessions.update(editingSessionId, { instanceName: editName.trim() });
      setEditingSessionId(null);
      setEditName("");
      notifyToast("Instância atualizada.", "success");
      await loadData();
    } catch {
      notifyToast("Erro ao atualizar instância.", "error");
    } finally {
      setSavingEdit(false);
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
      setMessageStatus("Mensagem enviada.");
      if (selectedConversation.id) {
        await loadMessages(selectedConversation.id);
      }
    } catch (err) {
      setMessageStatus(fonsecaApi.utils.getErrorMessage(err, "Erro ao enviar mensagem."));
    } finally {
      setSendingMessage(false);
    }
  }

  async function handleCopyInstanceName(instanceNameValue: string) {
    try {
      await navigator.clipboard.writeText(instanceNameValue);
      notifyToast("Nome copiado.", "success");
    } catch {
      notifyToast("Erro ao copiar.", "error");
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

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-secondary bg-card p-5">
          <div className="flex items-center gap-3">
            <HiOutlineUserGroup size={22} className="text-primary" />
            <div>
              <p className="text-sm text-secondaryText/60">Instâncias</p>
              <p className="text-xl font-bold text-secondaryText">{sessions.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-secondary bg-card p-5">
          <div className="flex items-center gap-3">
            <HiOutlineChatAlt2 size={22} className="text-primary" />
            <div>
              <p className="text-sm text-secondaryText/60">Conversas</p>
              <p className="text-xl font-bold text-secondaryText">{conversations.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-secondary bg-card p-5">
          <div className="flex items-center gap-3">
            <HiOutlineClipboardList size={22} className="text-primary" />
            <div>
              <p className="text-sm text-secondaryText/60">Mensagens</p>
              <p className="text-xl font-bold text-secondaryText">{messages.length}</p>
            </div>
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <div className="bg-card rounded-2xl border border-secondaryText/10 p-4 space-y-3">
          <h2 className="font-semibold text-lg text-primary">Instâncias</h2>

          {loading && (
            <p className="text-sm text-secondaryText/70">Carregando...</p>
          )}
          {!loading && sessions.length === 0 && (
            <p className="text-sm text-secondaryText/70">Nenhuma instância.</p>
          )}
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
          )}

          <div className="space-y-2">
            {sessions.map((session) => {
              const state = (session.status ?? "DISCONNECTED") as ConnectionState;
              const isSelected = selectedSessionId === session.id;

              return (
                <div
                  key={session.id}
                  className={`rounded-xl border p-3 ${
                    isSelected ? "border-primary bg-primary/5" : "border-secondary bg-bg"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {editingSessionId === session.id ? (
                        <div className="flex gap-2">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="rounded-lg border border-secondary bg-bg px-2 py-1 text-xs text-secondaryText outline-none"
                          />
                          <button
                            type="button"
                            onClick={saveEditSession}
                            disabled={savingEdit}
                            className="rounded-lg bg-primary px-2 py-1 text-xs font-semibold text-primaryText disabled:opacity-50"
                          >
                            {savingEdit ? "..." : "OK"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingSessionId(null)}
                            className="rounded-lg border border-secondary px-2 py-1 text-xs text-secondaryText"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-secondaryText">{session.instanceName ?? session.id}</p>
                          <p className={`text-xs ${CONNECTION_COLOR[state]}`}>{CONNECTION_LABEL[state]}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyInstanceName(session.instanceName ?? session.id)}
                        className="rounded-lg bg-secondaryText/10 p-2 text-secondaryText transition hover:text-primary"
                        title="Copiar nome"
                      >
                        <FiCopy size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditSession(session)}
                        className="rounded-lg bg-secondaryText/10 p-2 text-secondaryText transition hover:text-primary"
                        title="Editar"
                      >
                        <FiRefreshCw size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenQrModal()}
                        disabled={!isSelected}
                        className="rounded-lg bg-secondaryText/10 p-2 text-secondaryText transition hover:text-primary disabled:opacity-50"
                        title="QR Code"
                      >
                        <FiMessageSquare size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLogout(session.id)}
                        className="rounded-lg bg-secondaryText/10 p-2 text-secondaryText transition hover:text-primary"
                        title="Desconectar"
                      >
                        <FiRefreshCw size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(session.id)}
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                        title="Excluir"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-secondaryText/10 flex flex-col min-h-150">
          <div className="p-5 border-b border-secondaryText/10">
            <h2 className="text-primary font-semibold">
              {selectedSession?.instanceName ?? "Sessão WhatsApp"}
            </h2>
            <span className={`text-sm ${CONNECTION_COLOR[connectionState]}`}>
              {CONNECTION_LABEL[connectionState]}
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
                ? `Conversa: ${selectedConversation.contactName ?? "Contato"}`
                : "Selecione uma conversa para enviar uma mensagem."}
            </div>

            {messageStatus && <p className="text-sm text-primary">{messageStatus}</p>}
          </div>

          <MessageBox
            value={messageText}
            onChange={setMessageText}
            onSend={handleSendMessage}
            disabled={sendingMessage || !selectedSessionId || !selectedConversation}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <div className="bg-card rounded-2xl border border-secondaryText/10 p-4 space-y-3">
          <h2 className="font-semibold text-lg text-primary">Conversas</h2>

          {loading && (
            <p className="text-sm text-secondaryText/70">Carregando conversas...</p>
          )}
          {!loading && !error && conversations.length === 0 && (
            <p className="text-sm text-secondaryText/70">Nenhuma conversa encontrada.</p>
          )}
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
          )}

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {conversations.map((item) => (
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
        </div>

        <div className="bg-card rounded-2xl border border-secondaryText/10 flex flex-col min-h-150">
          <div className="p-5 border-b border-secondaryText/10">
            <h2 className="text-primary font-semibold">
              {selectedConversation?.contactName ?? "Conversa"}
            </h2>
            <p className="text-xs text-secondaryText/60">
              {selectedConversation?.phone ?? ""}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-[60vh]">
            {messages.length === 0 && (
              <p className="text-sm text-secondaryText/60">Nenhuma mensagem.</p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl p-3 text-sm ${
                  msg.sender === "USER"
                    ? "bg-primary/10 text-primary ml-auto max-w-[80%]"
                    : msg.sender === "CUSTOMER"
                      ? "bg-secondaryText/10 text-secondaryText max-w-[80%]"
                      : "bg-secondaryText/5 text-secondaryText/70 max-w-[80%]"
                }`}
              >
                {msg.body}
                {msg.createdAt && (
                  <p className="mt-1 text-[10px] text-secondaryText/50">
                    {new Date(msg.createdAt).toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
            ))}
          </div>

          <MessageBox
            value={messageText}
            onChange={setMessageText}
            onSend={handleSendMessage}
            disabled={sendingMessage || !selectedSessionId || !selectedConversation}
          />
        </div>
      </div>

      {/* Modal QR Code */}
      <Modal open={qrModalOpen} title="Conectar WhatsApp" width="md" onClose={() => setQrModalOpen(false)}>
        <div className="space-y-5">
          <p className="text-sm text-secondaryText/70">
            Escaneie o QR Code abaixo com o WhatsApp do seu celular para conectar esta sessão.
          </p>

          {qrLoading && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-secondaryText/70">Carregando QR Code...</p>
            </div>
          )}

          {qrError && !qrLoading && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{qrError}</div>
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
                <p className="break-all rounded-xl border border-secondary bg-bg p-4 text-xs text-secondaryText">{qrCode}</p>
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
