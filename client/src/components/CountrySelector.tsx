import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const countries = [
  { code: "JP", name: "일본", flag: "🇯🇵" },
  { code: "US", name: "미국", flag: "🇺🇸" },
  { code: "FR", name: "프랑스", flag: "🇫🇷" },
  { code: "GB", name: "영국", flag: "🇬🇧" },
  { code: "IT", name: "이탈리아", flag: "🇮🇹" },
  { code: "ES", name: "스페인", flag: "🇪🇸" },
  { code: "TH", name: "태국", flag: "🇹🇭" },
  { code: "VN", name: "베트남", flag: "🇻🇳" },
  { code: "SG", name: "싱가포르", flag: "🇸🇬" },
  { code: "AU", name: "호주", flag: "🇦🇺" },
];

export function CountrySelector({ onSelect }: { onSelect?: (country: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setOpen(false);
    onSelect?.(country.code);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          data-testid="button-country-selector"
        >
          <span className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="국가 검색..." />
          <CommandList>
            <CommandEmpty>국가를 찾을 수 없습니다.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => handleSelect(country)}
                  data-testid={`option-country-${country.code}`}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
