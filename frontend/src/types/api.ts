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
  plan?: string;
  automationLimit?: number;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
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

export interface Lead {
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

export interface Pipeline {
  id: string;
  companyId: string;
  name: string;
  description?: string | null;
  status?: string;
  isDefault?: boolean;
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
  body?: string;
  type?: string;
  sender?: string;
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

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  company: Company;
  role: string;
}

export interface ImageItem {
  id: string;
  name: string;
  url: string;
  price: number;
  isActive: boolean;
  fileName?: string | null;
  fileSize?: string | null;
  mimeType?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface StorageInfo {
  plan: string;
  storageLimit: number;
  storageUsed: number;
  storageAvailable: number;
  percentageUsed: number;
}

export interface ImageFolder {
  id: string;
  companyId: string;
  name: string;
  description?: string | null;
  price: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  images?: FolderImage[];
}

export interface FolderImage {
  id: string;
  folderId: string;
  imageId: string;
  position: number;
  createdAt?: string;
  image?: ImageItem;
}

export interface CheckoutSession {
  id: string;
  mode: string | null;
  paymentStatus: string | null;
  amountTotal: number | null;
  currency: string | null;
  subscription: string | null;
  customerId: string | null;
}

export interface Plan {
  key: string;
  name: string;
  price: number;
  storageLimitBytes: number;
  storageLimitGb: number;
}

export interface CurrentPlan {
  key: string;
  name: string;
  price: number;
  storageLimitBytes: number;
  storageLimitGb: number;
  storageUsed: number;
  storageAvailable: number;
  percentageUsed: number;
}

export interface SubscriptionInfo {
  plan: string;
  status: string;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  nextBillingDate: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface BillingInfo {
  plan: string;
  planPrice: number;
  storageLimitGb: number;
  status: string;
  nextBillingDate: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
}

export interface PaymentHistoryEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
  method: string;
}

export interface OrderItem {
  id: string;
  imageId?: string | null;
  folderId?: string | null;
  quantity: number;
  unitPrice: number;
  image?: { id: string; name: string; url: string } | null;
  folder?: { id: string; name: string } | null;
}

export interface OrderPayment {
  id: string;
  status: string;
  amount: number;
  method: string;
  transactionId?: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  paymentMethod?: string | null;
  paidAt: string | null;
  createdAt: string;
  customerName?: string | null;
  customerEmail?: string | null;
  items: OrderItem[];
  payment: OrderPayment | null;
}
