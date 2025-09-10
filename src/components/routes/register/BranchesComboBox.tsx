"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";

import { apiRoutes, cn, debounce, translate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { axiosInstance } from "@/api";
import type { Branch } from "@/types";
import SearchInput from "@/components/SearchInput";

interface ComboboxProps {
  disabled?: boolean;
  province: string;
  onChange?: (newVal?: Branch | undefined) => void;
  value: Branch;
}

export function BranchesCombobox({ disabled, province, value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchInsuranceBranches = useCallback(async (search: string, province: string) => {
    const res = await axiosInstance.get(apiRoutes.insuranceBranch, {
      params: { insurance: "DEY", province, name: search },
    });
    setBranches(res.data?.response);
  }, []);

  useEffect(() => {
    if (!disabled) fetchInsuranceBranches(search, province);
  }, [disabled, province]);

  const debouncedFetch = useMemo(() => debounce(fetchInsuranceBranches), [fetchInsuranceBranches]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    debouncedFetch(e.target.value, province);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="disabled:bg-black-ep ">
        <Button
          variant="outlineGray"
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !px-4 !py-3 !font-light disabled:text-black-90 disabled:opacity-100 text-sm"
        >
          {value ? (
            `${value.name}`
          ) : (
            <div className="text-muted-foreground text-xs">
              {translate("selectInsuranceBranch")}
            </div>
          )}

          <ChevronDown size={24} color="oklch(0.6534 0 0)" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[290px] p-0">
        <Command>
          {/* <CommandInput placeholder={translate("searchBranch")} onValueChange={setSearch} /> */}
          <SearchInput
            placeholder={translate("searchBranch")}
            value={search}
            onChange={handleSearchChange}
          />
          <CommandList>
            <CommandEmpty>{translate("emptyBranch")}</CommandEmpty>
            <CommandGroup>
              {branches.map(branch => (
                <CommandItem
                  key={branch.id}
                  value={branch.id.toString()}
                  onSelect={currentValue => {
                    const newValue = currentValue === value?.id.toString() ? undefined : branch;
                    onChange?.(newValue);
                    setOpen(false);
                  }}
                  className="justify-between cursor-pointer"
                >
                  {branch.name}
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.toString() === branch.id.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
