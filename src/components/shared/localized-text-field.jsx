"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getLocaleConfig,
} from "@/i18n/config";

/**
 * Tabbed editor for per-locale text content. Pass a `value` map keyed by
 * locale code, an `onChange(nextMap)` to receive updates, and a `kind`
 * (`textarea` | `input`).
 *
 * The default locale tab is required (the form schema enforces minimum
 * length); other tabs are optional with subtle "optional" + "translated"
 * indicators so the provider knows what's done at a glance.
 *
 * Set `tier1Only` to hide Tier 2 locales until translations are ready.
 */
export function LocalizedTextField({
  value,
  onChange,
  kind = "textarea",
  rows = 4,
  placeholder,
  label,
  description,
  required = true,
  minLength = 10,
  tier1Only = false,
  className,
}) {
  const visibleLocales = tier1Only
    ? LOCALES.filter((l) => l.tier === 1)
    : LOCALES;
  const [active, setActive] = useState(DEFAULT_LOCALE);

  function setLocaleValue(code, next) {
    onChange?.({ ...value, [code]: next });
  }

  function isFilled(code) {
    return typeof value?.[code] === "string" && value[code].trim().length > 0;
  }

  const filledCount = visibleLocales.filter((l) => isFilled(l.code)).length;

  return (
    <div className={cn("grid gap-2", className)}>
      {label ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label className="flex items-center gap-1.5">
            <Languages className="size-3.5 text-primary" />
            {label}
          </Label>
          <Badge variant="outline" className="text-[10px]">
            {filledCount}/{visibleLocales.length} languages
          </Badge>
        </div>
      ) : null}
      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}

      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="flex h-auto flex-wrap justify-start gap-1.5 bg-transparent p-0">
          {visibleLocales.map((locale) => {
            const filled = isFilled(locale.code);
            const isDefault = locale.code === DEFAULT_LOCALE;
            const isActive = active === locale.code;
            return (
              <TabsTrigger
                key={locale.code}
                value={locale.code}
                title={
                  isDefault
                    ? `${locale.native} — required`
                    : filled
                      ? `${locale.native} — translated`
                      : `${locale.native} — optional`
                }
                className={cn(
                  "h-8 gap-1.5 rounded-full border bg-background px-3 text-xs whitespace-nowrap",
                  "data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:font-medium",
                )}
              >
                <span aria-hidden className="text-sm leading-none">{locale.flag}</span>
                <span className={cn(!isActive && "text-muted-foreground")}>
                  {isActive ? locale.native : locale.code.toUpperCase()}
                </span>
                {/* Compact status dot — tells the author at a glance which
                    locales are filled, required, or still pending. */}
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full",
                    filled
                      ? "bg-emerald-500"
                      : isDefault
                        ? "bg-amber-500"
                        : "bg-muted-foreground/30",
                  )}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-amber-500" />
            Required
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
            Translated
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground/30" />
            Optional
          </span>
        </div>

        {visibleLocales.map((locale) => {
          const isDefault = locale.code === DEFAULT_LOCALE;
          const fieldId = `${locale.code}-field`;
          const fieldDir = locale.dir === "rtl" ? "rtl" : "ltr";
          return (
            <TabsContent
              key={locale.code}
              value={locale.code}
              className="mt-3"
            >
              {kind === "input" ? (
                <Input
                  id={fieldId}
                  dir={fieldDir}
                  value={value?.[locale.code] ?? ""}
                  onChange={(e) => setLocaleValue(locale.code, e.target.value)}
                  placeholder={placeholder ?? `${label ?? "Text"} (${locale.native})`}
                />
              ) : (
                <Textarea
                  id={fieldId}
                  dir={fieldDir}
                  rows={rows}
                  value={value?.[locale.code] ?? ""}
                  onChange={(e) => setLocaleValue(locale.code, e.target.value)}
                  placeholder={
                    placeholder ?? `${label ?? "Text"} (${locale.native})`
                  }
                />
              )}
              <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <span>
                  {isDefault ? (
                    required ? (
                      <>
                        Default language ·{" "}
                        <span className="font-medium">required</span> · min{" "}
                        {minLength} chars
                      </>
                    ) : (
                      <>Default language</>
                    )
                  ) : isFilled(locale.code) ? (
                    <>
                      Showing for visitors using{" "}
                      <span className="font-medium">{locale.native}</span>
                    </>
                  ) : (
                    <>
                      Optional · falls back to default if left blank
                    </>
                  )}
                </span>
                <span>{(value?.[locale.code] ?? "").length} chars</span>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
