export type ActiveRole = 'guest' | 'host';

const STORAGE_KEY = 'deskly.active-role';

export const roleStorage = {
  get(): ActiveRole {
    return localStorage.getItem(STORAGE_KEY) === 'host' ? 'host' : 'guest';
  },

  set(role: ActiveRole): void {
    localStorage.setItem(STORAGE_KEY, role);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
