import { meAPI, MeResponse } from "@/api/me";
import { init } from "next/dist/compiled/webpack/webpack";
import { create } from "zustand";

type UseAuth = {
  user: MeResponse | null;
  setUser: (user: MeResponse) => void;
  isAuthenticated: boolean;
  loading: boolean;
  init: (token?: string, user?: any) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<UseAuth>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: (user: any) => set({ user }),
  init: async (token?: string, user?: any) => {
    if (!token) {
      token = localStorage.getItem("token") ?? undefined;
      if (!token) {
        // if token is not there in the localstorage then the user is not authenticated
        set({
          loading: false,
          isAuthenticated: false,
        });
      } else {
        // if token is there in the localstorage then the user might be authenticated, we have to ask the server for the user

        const meRespone = await meAPI();
        if (meRespone.status === 200) {
          set({
            loading: false,
            isAuthenticated: true,
            user: meRespone.data,
          });
        } else {
          set({
            loading: false,
            isAuthenticated: false,
          });
        }
      }
    } else {
      localStorage.setItem("token", token);
      set({
        loading: false,
        user,
        isAuthenticated: true,
      });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({
      loading: false,
      isAuthenticated: false,
      user: null,
    });
  },
}));
