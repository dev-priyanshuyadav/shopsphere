import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  register: (input: { name: string; email: string; password?: string }) => User;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      register: ({ name, email }) => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "customer",
        };

        set({ user: newUser, isAuthenticated: true });
        return newUser;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "shopsphere-auth-storage",
    },
  ),
);
