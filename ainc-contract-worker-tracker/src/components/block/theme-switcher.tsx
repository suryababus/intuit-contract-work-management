import { useTheme } from "@/state/theme";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <span className="mr-4 border rounded-md p-2" onClick={toggleTheme}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </span>
  );
};
