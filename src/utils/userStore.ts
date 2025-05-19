import { create } from "zustand";
import type { State } from "../interfaces/State";

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  setToken: (token) => set({ token }),
}));
