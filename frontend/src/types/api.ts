export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  role?: {
    name: string;
  };
  company?: {
    id: string;
    name: string;
    status?: string;
  };
  createdAt?: string;
}

export interface Company {
  id: string;
  name: string;
  fantasyName?: string | null;
  document?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  logo?: string | null;
  timezone?: string | null;
  status?: string;
}

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  document?: string | null;
  birthDate?: string | null;
  status?: string;
  avatar?: string | null;
  notes?: string | null;
}

export interface Pipeline {
  id: string;
  companyId: string;
  name: string;
  description?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PipelineStage {
  id: string;
  pipelineId: string;
  name: string;
  color?: string | null;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Deal {
  id: string;
  companyId: string;
  title?: string;
  value?: number | null;
  status?: string;
  pipelineId?: string | null;
  stageId?: string | null;
  customerId?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatsappSession {
  id: string;
  companyId: string;
  instanceName?: string | null;
  status?: string;
  phone?: string | null;
  profileName?: string | null;
  profilePicUrl?: string | null;
  lastActivity?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatsappConversation {
  id: string;
  companyId: string;
  contactName?: string | null;
  phone?: string | null;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatsappMessage {
  id: string;
  conversationId?: string;
  sessionId?: string;
  number?: string;
  text?: string;
  type?: string;
  createdAt?: string;
}

export interface Automation {
  id: string;
  companyId: string;
  name: string;
  keyword: string;
  response: string;
  active: boolean;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
}
