import { AuthSession, AuthUser } from '@/types/auth';

const STORAGE_KEY = 'deskly.auth.session';

export const tokenStorage = {
  save(session: AuthSession): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },

  get(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  getAccessToken(): string | null {
    return tokenStorage.get()?.accessToken ?? null;
  },

  updateUser(user: AuthUser): void {
    const session = tokenStorage.get();
    if (!session) return;
    tokenStorage.save({ ...session, user });
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
