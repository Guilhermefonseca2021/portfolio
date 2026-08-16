const TOKEN_KEY = "fonseca_token";
const TOKEN_EXPIRY_KEY = "fonseca_token_expiry";
const SESSION_DURATION_MS = 15 * 24 * 60 * 60 * 1000; // 15 dias

export function saveSession(token: string, remember: boolean = true) {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem(TOKEN_KEY, token);
  storage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
}

export function getToken(): string | null {
  const storage = localStorage.getItem(TOKEN_KEY)
    ? localStorage
    : sessionStorage.getItem(TOKEN_KEY)
      ? sessionStorage
      : null;

  if (!storage) return null;

  const token = storage.getItem(TOKEN_KEY);
  const expiry = storage.getItem(TOKEN_EXPIRY_KEY);

  if (!token) return null;

  // Se não houver data de expiração, considera válido (compatibilidade)
  if (!expiry) return token;

  // Se expirou, limpa a sessão
  if (Date.now() > Number(expiry)) {
    clearSession();
    return null;
  }

  return token;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
