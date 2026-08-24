import {
  deleteJson,
  getApiErrorMessage,
  getJson,
  patchJson,
  postJson,
  putJson,
} from "./api";

export const fonsecaApi = {
  auth: {
    login: (payload: { email: string; password: string }) =>
      postJson<AuthResponse>("/auth/login", payload),
    register: (payload: {
      companyName: string;
      username: string;
      email: string;
      password: string;
    }) => postJson<AuthResponse>("/auth/register", payload),
  },
  company: {
    getMe: () => getJson<Company>("/companies/me"),
    updateMe: (payload: Partial<Company>) =>
      patchJson<Company>("/companies/me", payload),
  },
  user: {
    getMe: () => getJson<User>("/users/me"),
  },
  customers: {
    list: () => getJson<Customer[]>("/customers"),
    get: (id: string) => getJson<Customer>(`/customers/${id}`),
    create: (payload: Omit<Customer, "id" | "companyId">) =>
      postJson<Customer>("/customers", payload),
    update: (id: string, payload: Partial<Customer>) =>
      patchJson<Customer>(`/customers/${id}`, payload),
    remove: (id: string) => deleteJson(`/customers/${id}`),
  },
  pipelines: {
    list: () =>
      getJson<ApiResponse<Pipeline[]>>("/pipelines").then(
        (res) => res.data ?? [],
      ),
    get: (id: string) =>
      getJson<ApiResponse<Pipeline>>(`/pipelines/${id}`).then(
        (res) => res.data as Pipeline,
      ),
    create: (payload: Partial<Pipeline>) =>
      postJson<ApiResponse<Pipeline>>("/pipelines", payload),
    update: (id: string, payload: Partial<Pipeline>) =>
      putJson<ApiResponse<Pipeline>>(`/pipelines/${id}`, payload),
    remove: (id: string) => deleteJson(`/pipelines/${id}`),
  },
  pipelineStages: {
    list: (pipelineId: string) =>
      getJson<ApiResponse<PipelineStage[]>>(
        `/pipelines/${pipelineId}/stages`,
      ).then((res) => res.data ?? []),
    create: (pipelineId: string, payload: Partial<PipelineStage>) =>
      postJson<ApiResponse<PipelineStage>>(
        `/pipelines/${pipelineId}/stages`,
        payload,
      ),
    update: (
      pipelineId: string,
      stageId: string,
      payload: Partial<PipelineStage>,
    ) =>
      putJson<ApiResponse<PipelineStage>>(
        `/pipelines/${pipelineId}/stages/${stageId}`,
        payload,
      ),
    remove: (pipelineId: string, stageId: string) =>
      deleteJson(`/pipelines/${pipelineId}/stages/${stageId}`),
  },
  deals: {
    list: () =>
      getJson<ApiResponse<Deal[]>>("/deals").then((res) => res.data ?? []),
    get: (id: string) =>
      getJson<ApiResponse<Deal>>(`/deals/${id}`).then(
        (res) => res.data as Deal,
      ),
    create: (payload: Partial<Deal>) =>
      postJson<ApiResponse<Deal>>("/deals", payload),
    update: (id: string, payload: Partial<Deal>) =>
      putJson<ApiResponse<Deal>>(`/deals/${id}`, payload),
    remove: (id: string) => deleteJson(`/deals/${id}`),
  },
  whatsapp: {
    sessions: {
      list: () =>
        getJson<ApiResponse<WhatsappSession[]>>("/whatsapp/sessions").then(
          (res) => res.data ?? [],
        ),
      get: (id: string) =>
        getJson<ApiResponse<WhatsappSession>>(`/whatsapp/sessions/${id}`).then(
          (res) => res.data as WhatsappSession,
        ),
      create: (payload: { instanceName: string }) =>
        postJson<ApiResponse<WhatsappSession>>("/whatsapp/sessions", payload),
      update: (id: string, payload: Partial<WhatsappSession>) =>
        putJson<ApiResponse<WhatsappSession>>(
          `/whatsapp/sessions/${id}`,
          payload,
        ),
      remove: (id: string) => deleteJson(`/whatsapp/sessions/${id}`),
      qrCode: (id: string) =>
        getJson<ApiResponse<string>>(`/whatsapp/sessions/${id}/qrcode`).then(
          (res) => res.data ?? "",
        ),
      status: (id: string) =>
        getJson<ApiResponse<string>>(`/whatsapp/sessions/${id}/status`).then(
          (res) => res.data ?? "DISCONNECTED",
        ),
      logout: (id: string) => postJson(`/whatsapp/sessions/${id}/logout`),
    },
    conversations: {
      list: () =>
        getJson<ApiResponse<WhatsappConversation[]>>(
          "/whatsapp/conversations",
        ).then((res) => res.data ?? []),
      get: (id: string) =>
        getJson<ApiResponse<WhatsappConversation>>(
          `/whatsapp/conversations/${id}`,
        ).then((res) => res.data as WhatsappConversation),
      create: (payload: Partial<WhatsappConversation>) =>
        postJson<ApiResponse<WhatsappConversation>>(
          "/whatsapp/conversations",
          payload,
        ),
      update: (id: string, payload: Partial<WhatsappConversation>) =>
        putJson<ApiResponse<WhatsappConversation>>(
          `/whatsapp/conversations/${id}`,
          payload,
        ),
      remove: (id: string) => deleteJson(`/whatsapp/conversations/${id}`),
    },
    messages: {
      listByConversation: (conversationId: string) =>
        getJson<WhatsappMessage[]>(
          `/whatsapp/messages/conversation/${conversationId}`,
        ),
      create: (payload: Partial<WhatsappMessage>) =>
        postJson<WhatsappMessage>("/whatsapp/messages", payload),
      send: (payload: { sessionId: string; number: string; text: string }) =>
        postJson(`/whatsapp/messages/send`, payload),
    },
  },
  automations: {
    list: () =>
      getJson<ApiResponse<Automation[]>>("/automations").then(
        (res) => res.data ?? [],
      ),
    get: (id: string) =>
      getJson<ApiResponse<Automation>>(`/automations/${id}`).then(
        (res) => res.data as Automation,
      ),
    create: (payload: Partial<Automation>) =>
      postJson<ApiResponse<Automation>>("/automations", payload),
    update: (id: string, payload: Partial<Automation>) =>
      patchJson<ApiResponse<Automation>>(`/automations/${id}`, payload),
    remove: (id: string) => deleteJson(`/automations/${id}`),
  },
  leads: {
    list: () =>
      getJson<ApiResponse<Lead[]>>("/leads").then(
        (res) => res.data ?? [],
      ),
    create: (payload: {
      name: string;
      email: string;
      whatsapp?: string;
      company?: string;
      instagram?: string;
      services?: string[];
      objective?: string;
      companySize?: string;
      budget?: string;
      deadline?: string;
      message?: string;
    }) => postJson<ApiResponse<Customer>>("/leads", payload),
    remove: (id: string) => deleteJson(`/leads/${id}`),
  },
  images: {
    list: () =>
      getJson<ApiResponse<ImageItem[]>>("/images").then(
        (res) => res.data ?? [],
      ),
    get: (id: string) =>
      getJson<ApiResponse<ImageItem>>(`/images/public/${id}`).then(
        (res) => res.data as ImageItem,
      ),
    create: (payload: { name: string; price: number; url: string }) =>
      postJson<ApiResponse<ImageItem>>("/images", payload),
    upload: (payload: { name: string; price: number; file: File }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", String(payload.price));
      formData.append("file", payload.file);
      return postJson<ApiResponse<ImageItem>>("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    storage: () =>
      getJson<ApiResponse<StorageInfo>>("/images/storage").then(
        (res) => res.data as StorageInfo,
      ),
    remove: (id: string) => deleteJson(`/images/${id}`),
  },
  utils: {
    getErrorMessage: getApiErrorMessage,
  },
};

export default fonsecaApi;
