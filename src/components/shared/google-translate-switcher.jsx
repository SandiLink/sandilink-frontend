"use client";

import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCALES, getLocaleConfig } from "@/i18n/config";
import { useLanguage } from "@/contexts/language-provider";

export function GoogleTranslateSwitcher({ className }) {
  const { currentLanguage, changeLanguage } = useLanguage();
  const current = getLocaleConfig(currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger
        size="sm"
        aria-label={`Language: ${current.native}`}
        className={className}
      >
        <Globe className="size-4 text-muted-foreground" />
        <SelectValue>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="text-base leading-none">
              {current.flag}
            </span>
            <span className="hidden lg:inline">{current.native}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-48">
        {LOCALES.map((locale) => (
          <SelectItem key={locale.code} value={locale.code}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="text-base leading-none">
                {locale.flag}
              </span>
              <span className="text-sm">{locale.native}</span>
              <span className="text-[10px] text-muted-foreground">
                {locale.label}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
