import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { clearSession, getToken } from "../utils/session";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;

    if (status === 401) {
      const isAuthRoute =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";

      if (!isAuthRoute) {
        clearSession();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export async function getJson<T>(url: string, config?: AxiosRequestConfig) {
  const response = await api.get<T>(url, config);
  return response.data;
}

export async function postJson<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await api.post<T>(url, data, config);
  return response.data;
}

export async function patchJson<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await api.patch<T>(url, data, config);
  return response.data;
}

export async function putJson<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  const response = await api.put<T>(url, data, config);
  return response.data;
}

export async function deleteJson<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const response = await api.delete<T>(url, config);
  return response.data;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const serverMessage =
      error.response?.data?.message ?? error.response?.data?.error;

    if (typeof serverMessage === "string" && serverMessage.trim()) {
      return serverMessage;
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }

    return fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export default api;
