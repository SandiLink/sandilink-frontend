"use client";

import { useMemo, useState } from "react";
import { Globe, Languages, Plus, ShieldAlert } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { buildCoverageReport } from "@/lib/i18n-coverage";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
import ar from "@/messages/ar.json";
import sw from "@/messages/sw.json";
import zh from "@/messages/zh.json";
import hi from "@/messages/hi.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MESSAGES_BY_LOCALE = { en, es, fr, pt, ar, sw, zh, hi };

const EMPTY_FORM = {
  code: "",
  label: "",
  native: "",
  flag: "",
  tier: "2",
  dir: "ltr",
};

export function LanguagesAdmin() {
  const [locales, setLocales] = useState(LOCALES);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);

  const coverage = useMemo(
    () => buildCoverageReport(MESSAGES_BY_LOCALE),
    [],
  );

  const stats = [
    { label: "Locales", value: locales.length, icon: Globe, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
    { label: "Tier 1", value: locales.filter((l) => l.tier === 1).length, icon: ShieldAlert, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
    { label: "Tier 2", value: locales.filter((l) => l.tier === 2).length, icon: Languages, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
    { label: "RTL", value: locales.filter((l) => l.dir === "rtl").length, icon: Languages, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  ];

  function resetForm() {
    setForm(EMPTY_FORM);
    setError(null);
  }

  function handleAdd() {
    const code = form.code.trim().toLowerCase();
    if (!/^[a-z]{2,5}(-[a-z]{2,5})?$/i.test(code)) {
      setError("Locale code must be 2–5 letters (BCP-47 style, e.g. 'ja' or 'pt-br').");
      return;
    }
    if (locales.some((l) => l.code === code)) {
      setError(`Locale '${code}' already exists.`);
      return;
    }
    if (!form.label.trim() || !form.native.trim()) {
      setError("English label and native name are both required.");
      return;
    }
    setLocales((prev) => [
      ...prev,
      {
        code,
        label: form.label.trim(),
        native: form.native.trim(),
        flag: form.flag.trim() || "🌐",
        tier: Number(form.tier),
        dir: form.dir,
      },
    ]);
    resetForm();
    setOpen(false);
  }

  function toggleDir(code) {
    setLocales((prev) =>
      prev.map((l) =>
        l.code === code ? { ...l, dir: l.dir === "rtl" ? "ltr" : "rtl" } : l,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground">
            Add new locale slots and manage tier / direction. Translations for
            each key are edited in <span className="font-medium">Translations</span>.
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Add language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new language</DialogTitle>
              <DialogDescription>
                Creates a locale slot. The new locale starts at 0% coverage —
                fill it in via the Translations editor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="code">Locale code</Label>
                  <Input
                    id="code"
                    placeholder="e.g. ja, pt-br"
                    value={form.code}
                    onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="flag">Flag emoji</Label>
                  <Input
                    id="flag"
                    placeholder="🌐"
                    value={form.flag}
                    onChange={(e) => setForm((f) => ({ ...f, flag: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="label">English label</Label>
                  <Input
                    id="label"
                    placeholder="Japanese"
                    value={form.label}
                    onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="native">Native name</Label>
                  <Input
                    id="native"
                    placeholder="日本語"
                    value={form.native}
                    onChange={(e) => setForm((f) => ({ ...f, native: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>Tier</Label>
                  <RadioGroup
                    value={form.tier}
                    onValueChange={(v) => setForm((f) => ({ ...f, tier: v }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="tier-1" />
                      <Label htmlFor="tier-1" className="font-normal">
                        Tier 1 — launch
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id="tier-2" />
                      <Label htmlFor="tier-2" className="font-normal">
                        Tier 2 — pending
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="dir">Direction</Label>
                  <Select
                    value={form.dir}
                    onValueChange={(v) => setForm((f) => ({ ...f, dir: v }))}
                  >
                    <SelectTrigger id="dir">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ltr">Left-to-right</SelectItem>
                      <SelectItem value="rtl">Right-to-left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Create locale</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Locale</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>RTL</TableHead>
                <TableHead className="w-[200px]">Coverage</TableHead>
                <TableHead className="text-right">Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locales.map((l) => {
                const isDefault = l.code === DEFAULT_LOCALE;
                const cov = coverage.byLocale[l.code]?.coverage;
                const value = isDefault ? 100 : (cov ?? 0);
                return (
                  <TableRow key={l.code}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{l.flag}</span>
                        <div>
                          <p className="text-sm font-medium">{l.native}</p>
                          <p className="text-xs text-muted-foreground">{l.label}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{l.code}</TableCell>
                    <TableCell>
                      <Badge variant={l.tier === 1 ? "default" : "secondary"} className="text-xs">
                        Tier {l.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={l.dir === "rtl"}
                        onCheckedChange={() => toggleDir(l.code)}
                        disabled={isDefault}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={value} className="h-1.5" />
                        <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                          {value.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {isDefault ? (
                        <Badge variant="outline" className="text-[10px]">Source</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
