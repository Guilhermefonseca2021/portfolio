import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Company, User } from "../types/api";
import fonsecaApi from "../services/fonsecaApi";
import { isAuthenticated } from "../utils/session";

interface UserContextValue {
  user: User | null;
  company: Company | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setCompany(null);
      setLoading(false);
      return;
    }

    try {
      const [userResult, companyResult] = await Promise.allSettled([
        fonsecaApi.user.getMe(),
        fonsecaApi.company.getMe(),
      ]);

      if (userResult.status === "fulfilled") {
        setUser(userResult.value);
      } else {
        setUser(null);
      }

      if (companyResult.status === "fulfilled") {
        setCompany(companyResult.value);
      } else {
        setCompany(null);
      }
    } catch {
      setUser(null);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    await load();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const value = useMemo(
    () => ({
      user,
      company,
      loading,
      refresh,
    }),
    [user, company, loading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}
