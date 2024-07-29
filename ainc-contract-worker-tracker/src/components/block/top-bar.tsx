import { toast } from "sonner";
import { Button } from "../ui/button";

export const TopBar = () => {
  const onLogout = () => {
    toast.error("Contract worker added successfully");
  };
  return (
    <div className="flex p-2 px-5 border-b w-full bg-muted/40 items-center">
      <h4 className="flex-1 text-2xl font-bold">A. Inc.</h4>
      <Button size={"sm"} onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};
