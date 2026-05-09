"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, CircleDashed, Search } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import {
  ALLOW_SAME,
  buildCoverageReport,
  coveragePercent,
  compareLocale,
  flatten,
} from "@/lib/i18n-coverage";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
import ar from "@/messages/ar.json";
import sw from "@/messages/sw.json";
import zh from "@/messages/zh.json";
import hi from "@/messages/hi.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const RAW_MESSAGES = { en, es, fr, pt, ar, sw, zh, hi };

const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);

function statusOf(key, sourceFlat, targetFlat) {
  if (!(key in targetFlat)) return "missing";
  const s = sourceFlat[key];
  const t = targetFlat[key];
  if (typeof s === "string" && typeof t === "string" && s === t && !ALLOW_SAME.has(s.trim())) {
    return "same";
  }
  return "translated";
}

const STATUS_META = {
  translated: { label: "Translated", icon: CheckCircle2, badge: "default", className: "text-emerald-600" },
  missing: { label: "Missing", icon: CircleAlert, badge: "destructive", className: "text-destructive" },
  same: { label: "Same as English", icon: CircleDashed, badge: "secondary", className: "text-amber-600" },
};

export function TranslationsAdmin() {
  const sourceFlat = useMemo(() => flatten(RAW_MESSAGES.en), []);
  const allKeys = useMemo(() => Object.keys(sourceFlat), [sourceFlat]);
  const totalKeys = allKeys.length;
  const initialReport = useMemo(() => buildCoverageReport(RAW_MESSAGES), []);

  const initialEdits = useMemo(() => {
    const out = {};
    for (const code of Object.keys(RAW_MESSAGES)) {
      out[code] = flatten(RAW_MESSAGES[code]);
    }
    return out;
  }, []);
  const [edits, setEdits] = useState(initialEdits);

  const [activeLocale, setActiveLocale] = useState(NON_DEFAULT_LOCALES[0].code);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const targetFlat = edits[activeLocale] ?? {};
  const liveReport = useMemo(
    () => compareLocale(sourceFlat, targetFlat),
    [sourceFlat, targetFlat],
  );
  const liveCoverage = coveragePercent(liveReport, totalKeys);

  const q = search.trim().toLowerCase();
  const filteredKeys = allKeys.filter((key) => {
    const status = statusOf(key, sourceFlat, targetFlat);
    if (statusFilter !== "all" && status !== statusFilter) return false;
    if (!q) return true;
    if (key.toLowerCase().includes(q)) return true;
    const en = sourceFlat[key];
    if (typeof en === "string" && en.toLowerCase().includes(q)) return true;
    const t = targetFlat[key];
    if (typeof t === "string" && t.toLowerCase().includes(q)) return true;
    return false;
  });

  function setValue(code, key, value) {
    setEdits((prev) => ({ ...prev, [code]: { ...prev[code], [key]: value } }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Translations</h1>
        <p className="text-muted-foreground">
          Edit per-locale UI strings. Coverage updates live as you edit; no
          changes are persisted until you publish.
        </p>
      </div>

      <Tabs value={activeLocale} onValueChange={setActiveLocale}>
        <TabsList className="flex flex-wrap h-auto justify-start gap-1">
          {NON_DEFAULT_LOCALES.map((l) => {
            const cov = initialReport.byLocale[l.code]?.coverage ?? 0;
            return (
              <TabsTrigger key={l.code} value={l.code} className="gap-2">
                <span>{l.flag}</span>
                <span>{l.native}</span>
                <Badge variant="outline" className="text-[10px] tabular-nums">
                  {cov.toFixed(0)}%
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {NON_DEFAULT_LOCALES.map((l) => (
          <TabsContent key={l.code} value={l.code} className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {l.native} <span className="text-muted-foreground">— {l.label}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{liveCoverage.toFixed(1)}%</span> translated ·{" "}
                      <span className="text-destructive">{liveReport.missing.length} missing</span> ·{" "}
                      <span className="text-amber-600">{liveReport.same.length} same as English</span> ·{" "}
                      total {totalKeys} keys
                    </p>
                  </div>
                  <div className="w-48">
                    <Progress value={liveCoverage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search keys, English source, or this locale…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All keys</SelectItem>
                  <SelectItem value="missing">Missing only</SelectItem>
                  <SelectItem value="same">Same as English</SelectItem>
                  <SelectItem value="translated">Translated</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground ml-auto">
                {filteredKeys.length} / {totalKeys} keys
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="max-h-[60vh] overflow-y-auto divide-y">
                  {filteredKeys.length === 0 ? (
                    <p className="p-8 text-center text-sm text-muted-foreground">
                      No keys match this filter.
                    </p>
                  ) : (
                    filteredKeys.map((key) => {
                      const status = statusOf(key, sourceFlat, targetFlat);
                      const meta = STATUS_META[status];
                      const value = targetFlat[key] ?? "";
                      return (
                        <div key={key} className="grid gap-2 p-4 md:grid-cols-[1fr_2fr] md:gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={meta.badge} className="gap-1 text-[10px]">
                                <meta.icon className={`size-2.5 ${meta.className}`} />
                                {meta.label}
                              </Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground break-all">{key}</p>
                            <div>
                              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">English</p>
                              <p className="text-sm">{sourceFlat[key]}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                              {l.native}
                            </p>
                            <Textarea
                              value={value}
                              onChange={(e) => setValue(l.code, key, e.target.value)}
                              dir={l.dir}
                              rows={Math.min(5, Math.max(1, Math.ceil((sourceFlat[key]?.length ?? 0) / 60)))}
                              placeholder={status === "missing" ? "Add translation…" : ""}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
