import { toast } from "sonner";
import { Button } from "../ui/button";
import { useAuth } from "@/state/auth";

export const TopBar = () => {
  const { user, logout } = useAuth();

  const onLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  return (
    <div className="flex p-2 px-5 border-b w-full bg-muted/40 items-center">
      <h4 className="flex-1 text-2xl font-bold">A. Inc.</h4>
      <div className="flex flex-row items-center">
        <h4 className="mr-2">{user?.email}</h4>
        <div className="text-[0.5rem] px-2 py-1 rounded-md bg-primary/90 text-primary-foreground mr-4">
          {user?.role}
        </div>

        <Button size={"sm"} onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
