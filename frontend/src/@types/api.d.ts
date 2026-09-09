interface User {
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

interface Company {
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
  plan?: string;
}

interface Customer {
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

interface Lead {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  status?: string;
  createdAt?: string;
  company?: {
    id: string;
    name: string;
  } | null;
  deals?: {
    id: string;
    pipelineId: string;
    stageId: string;
    title?: string;
    value?: number | null;
    status?: string;
    stage?: {
      id: string;
      name: string;
      color?: string | null;
      position?: number;
    } | null;
    pipeline?: {
      id: string;
      name: string;
    } | null;
  }[];
}

interface Pipeline {
  id: string;
  companyId: string;
  name: string;
  description?: string | null;
  status?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PipelineStage {
  id: string;
  pipelineId: string;
  name: string;
  color?: string | null;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Deal {
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
  customer?: Customer | null;
  pipeline?: {
    id: string;
    name: string;
  } | null;
  stage?: PipelineStage | null;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface WhatsappSession {
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

interface WhatsappConversation {
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

interface WhatsappMessage {
  id: string;
  conversationId?: string;
  sessionId?: string;
  number?: string;
  text?: string;
  type?: string;
  createdAt?: string;
}

interface Automation {
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


interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}

interface AuthResponse {
  token: string;
  user: User;
  company: Company;
  role: string;
}

interface ImageItem {
  id: string;
  name: string;
  url: string;
  price: number;
  isActive: boolean;
  fileName?: string | null;
  fileSize?: string | null;
  mimeType?: string | null;
  createdAt?: string;
}

interface StorageInfo {
  plan: string;
  storageLimit: number;
  storageUsed: number;
  storageAvailable: number;
  percentageUsed: number;
}
