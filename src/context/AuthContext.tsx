import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_URL = 'https://functions.poehali.dev/b5d51b01-867b-48fd-80d4-4467109f4f7d';
const STORAGE_KEY = 'hmh_token';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  membershipTier: string;
  createdAt: string | null;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  register: (data: { name: string; email: string; password: string; phone?: string; role?: string }) => Promise<{ ok: boolean; error?: string }>;
  login: (data: { email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async (token: string) => {
    try {
      const res = await fetch(`${AUTH_URL}?action=me`, {
        headers: { 'X-Authorization': `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, []);

  const register: AuthCtx['register'] = async (data) => {
    try {
      const res = await fetch(`${AUTH_URL}?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return { ok: false, error: json.error || 'Ошибка регистрации' };
      localStorage.setItem(STORAGE_KEY, json.token);
      setUser(json.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Ошибка сети, попробуйте снова' };
    }
  };

  const login: AuthCtx['login'] = async (data) => {
    try {
      const res = await fetch(`${AUTH_URL}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return { ok: false, error: json.error || 'Ошибка входа' };
      localStorage.setItem(STORAGE_KEY, json.token);
      setUser(json.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Ошибка сети, попробуйте снова' };
    }
  };

  const logout = () => {
    const token = localStorage.getItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    if (token) {
      fetch(`${AUTH_URL}?action=logout`, {
        method: 'POST',
        headers: { 'X-Authorization': `Bearer ${token}` },
      }).catch(() => {});
    }
  };

  return (
    <Ctx.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};