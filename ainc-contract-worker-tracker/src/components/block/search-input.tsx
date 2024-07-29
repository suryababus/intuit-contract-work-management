import { Search } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";

type Props = {
  onKeyChange: (key: string) => void;
};

export const SearchInput = (props: Props) => {
  const { onKeyChange } = props;

  const [key, setKey] = React.useState<string>("");

  React.useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      onKeyChange(key);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [key]);

  return (
    <div className=" max-w-96 w-[90%] flex flex-row items-center rounded-md border border-input bg-background">
      <Search className="m-2" />
      <Input
        className="border-0"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};
