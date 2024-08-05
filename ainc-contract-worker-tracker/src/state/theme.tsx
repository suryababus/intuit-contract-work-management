import { create } from "zustand";
import { setCookie } from "cookies-next";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => {
      const changedTheme = state.theme === "light" ? "dark" : "light";
      setCookie("theme", changedTheme);
      localStorage.setItem("theme", changedTheme);
      return { theme: state.theme === "light" ? "dark" : "light" };
    }),
  setTheme: (theme) => set({ theme }),
}));
