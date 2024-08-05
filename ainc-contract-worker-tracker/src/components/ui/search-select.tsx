import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { SearchInput } from "../block/search-input";
import { Input } from "./input";
import React, { useEffect } from "react";
import { filterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { Label } from "./label";

type SearchSelectProps = {
  onChange: (option: Option) => void;
  value: string;
  searchForKey: (key: string) => Promise<Option[]>;
  name?: string;
};

export type Option = {
  label: string;
  value: string;
};

export const SearchSelect = ({
  onChange,
  value,
  searchForKey,
  name,
}: SearchSelectProps) => {
  const [options, setOptions] = React.useState<Option[]>([]);
  const [open, setOpen] = React.useState(false);

  const onValueSelect = (newValue: Option) => {
    setOpen(false);
    onChange(newValue);
  };

  const searchChange = async (key: string) => {
    const data = await searchForKey(key);

    setOptions(data);
  };

  useEffect(() => {
    searchChange(value);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger className="w-full">
        <Input
          placeholder="Search..."
          value={value}
          name={name}
          data-testid={`search-select-${name}`}
        />
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="flex flex-col gap-4 bg-background mt-1 ml-2 rounded-md">
          <SearchInput onKeyChange={searchChange} />
          <div className="w-full max-h-[20vh] overflow-hidden flex flex-col">
            <div className="divide-y-2 gap-2 flex-1 flex flex-col w-full overflow-scroll">
              {options.map((option) => (
                <Label
                  className="text-sm p-2 hover:bg-muted w-full"
                  key={option.value}
                  data-testid={`option-${option.value}`}
                  onClick={() => onValueSelect(option)}
                >
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
