"use client";

import { useMemo, useState } from "react";
import { Mail, Plus, Stethoscope, Trash2, Wrench } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { SPECIALTIES, SERVICE_TYPES } from "@/lib/catalogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SEED_TEMPLATES = [
  {
    id: "welcome",
    name: "Welcome email",
    description: "Sent to a new user immediately after sign-up.",
    body: {
      en: { subject: "Welcome to SandiLink", body: "Hi {firstName},\n\nWelcome to SandiLink — we're glad to have you." },
      es: { subject: "Bienvenido a SandiLink", body: "Hola {firstName},\n\nBienvenido a SandiLink — nos alegra tenerte." },
      fr: { subject: "Bienvenue sur SandiLink", body: "Bonjour {firstName},\n\nBienvenue sur SandiLink — nous sommes ravis de vous accueillir." },
    },
  },
  {
    id: "booking-confirmation",
    name: "Booking confirmation",
    description: "Sent when a service user confirms an appointment.",
    body: {
      en: { subject: "Your appointment is confirmed", body: "Your appointment with {providerName} on {date} is confirmed." },
      es: { subject: "Tu cita está confirmada", body: "Tu cita con {providerName} el {date} está confirmada." },
      fr: { subject: "Votre rendez-vous est confirmé", body: "Votre rendez-vous avec {providerName} le {date} est confirmé." },
    },
  },
  {
    id: "password-reset",
    name: "Password reset",
    description: "Sent when a user requests a password reset link.",
    body: {
      en: { subject: "Reset your password", body: "Click the link below to reset your SandiLink password.\n\n{link}" },
      es: { subject: "Restablece tu contraseña", body: "Haz clic en el enlace para restablecer tu contraseña.\n\n{link}" },
      fr: { subject: "Réinitialiser votre mot de passe", body: "Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe.\n\n{link}" },
    },
  },
];

function fillEmptyLabels(catalog) {
  return catalog.map((entry) => {
    const label = { ...entry.label };
    for (const l of LOCALES) {
      if (label[l.code] == null) label[l.code] = "";
    }
    return { ...entry, label };
  });
}

function CatalogEditor({ entries, setEntries, idPlaceholder }) {
  const [draft, setDraft] = useState({ id: "", labelEn: "" });
  const [error, setError] = useState(null);

  function addEntry() {
    const id = draft.id.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || !draft.labelEn.trim()) {
      setError("ID and English label are both required.");
      return;
    }
    if (entries.some((e) => e.id === id)) {
      setError(`'${id}' already exists.`);
      return;
    }
    const label = Object.fromEntries(LOCALES.map((l) => [l.code, ""]));
    label[DEFAULT_LOCALE] = draft.labelEn.trim();
    setEntries((prev) => [...prev, { id, label }]);
    setDraft({ id: "", labelEn: "" });
    setError(null);
  }

  function setLabel(id, code, value) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, label: { ...e.label, [code]: value } } : e)),
    );
  }

  function remove(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4">
          <div className="grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-end">
            <div className="grid gap-1.5">
              <Label htmlFor="new-id">New ID</Label>
              <Input
                id="new-id"
                placeholder={idPlaceholder}
                value={draft.id}
                onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-label">English label</Label>
              <Input
                id="new-label"
                placeholder="e.g. Cardiology"
                value={draft.labelEn}
                onChange={(e) => setDraft((d) => ({ ...d, labelEn: e.target.value }))}
              />
            </div>
            <Button onClick={addEntry}>
              <Plus className="size-4" />
              Add
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {entries.map((entry) => {
              const filled = LOCALES.filter((l) => entry.label[l.code]?.trim()).length;
              return (
                <div key={entry.id} className="p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{entry.label[DEFAULT_LOCALE] || entry.id}</p>
                      <p className="font-mono text-xs text-muted-foreground">{entry.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {filled}/{LOCALES.length} locales
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => remove(entry.id)}
                        aria-label={`Remove ${entry.id}`}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {LOCALES.map((l) => (
                      <div key={l.code} className="grid gap-1">
                        <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {l.flag} {l.native}
                          {l.code === DEFAULT_LOCALE && (
                            <span className="ml-1 text-muted-foreground">(default)</span>
                          )}
                        </Label>
                        <Input
                          value={entry.label[l.code] ?? ""}
                          onChange={(e) => setLabel(entry.id, l.code, e.target.value)}
                          dir={l.dir}
                          className="h-8 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {entries.length === 0 && (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No entries yet. Add the first one above.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmailTemplatesEditor({ templates, setTemplates }) {
  function setField(id, code, field, value) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              body: {
                ...t.body,
                [code]: { ...(t.body[code] ?? { subject: "", body: "" }), [field]: value },
              },
            }
          : t,
      ),
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          {templates.map((tpl) => {
            const filledLocales = LOCALES.filter(
              (l) => tpl.body[l.code]?.subject?.trim() && tpl.body[l.code]?.body?.trim(),
            ).length;
            return (
              <AccordionItem key={tpl.id} value={tpl.id} className="px-4">
                <AccordionTrigger className="py-3">
                  <div className="flex flex-1 items-center justify-between pr-3">
                    <div className="text-left">
                      <p className="text-sm font-medium">{tpl.name}</p>
                      <p className="text-xs text-muted-foreground">{tpl.description}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {filledLocales}/{LOCALES.length} locales
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pb-4">
                    {LOCALES.map((l) => {
                      const v = tpl.body[l.code] ?? { subject: "", body: "" };
                      return (
                        <div key={l.code} className="rounded-lg border bg-muted/20 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {l.flag} {l.native}
                              <span className="ml-2 text-xs font-normal text-muted-foreground">
                                {l.label}
                                {l.code === DEFAULT_LOCALE && " · default"}
                              </span>
                            </p>
                            {(!v.subject?.trim() || !v.body?.trim()) && (
                              <Badge variant="destructive" className="text-[10px]">
                                Incomplete
                              </Badge>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <div className="grid gap-1">
                              <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                Subject
                              </Label>
                              <Input
                                value={v.subject ?? ""}
                                onChange={(e) => setField(tpl.id, l.code, "subject", e.target.value)}
                                dir={l.dir}
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="grid gap-1">
                              <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                Body
                              </Label>
                              <Textarea
                                value={v.body ?? ""}
                                onChange={(e) => setField(tpl.id, l.code, "body", e.target.value)}
                                dir={l.dir}
                                rows={4}
                                className="text-sm font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function LocalizedContentAdmin() {
  const [specialties, setSpecialties] = useState(() => fillEmptyLabels(SPECIALTIES));
  const [serviceTypes, setServiceTypes] = useState(() => fillEmptyLabels(SERVICE_TYPES));
  const [templates, setTemplates] = useState(SEED_TEMPLATES);

  const stats = useMemo(
    () => [
      { label: "Specialties", value: specialties.length, icon: Stethoscope },
      { label: "Service types", value: serviceTypes.length, icon: Wrench },
      { label: "Email templates", value: templates.length, icon: Mail },
    ],
    [specialties.length, serviceTypes.length, templates.length],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Localized content</h1>
        <p className="text-muted-foreground">
          Manage per-locale labels for catalogs (specialties, service types) and
          email templates. The default locale is required; other locales fall
          back to it when empty.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className="flex size-8 min-w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="specialties">
        <TabsList>
          <TabsTrigger value="specialties">Specialties</TabsTrigger>
          <TabsTrigger value="services">Service types</TabsTrigger>
          <TabsTrigger value="emails">Email templates</TabsTrigger>
        </TabsList>
        <TabsContent value="specialties" className="mt-4">
          <CatalogEditor
            entries={specialties}
            setEntries={setSpecialties}
            idPlaceholder="e.g. cardiology"
          />
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <CatalogEditor
            entries={serviceTypes}
            setEntries={setServiceTypes}
            idPlaceholder="e.g. virtual-visit"
          />
        </TabsContent>
        <TabsContent value="emails" className="mt-4">
          <EmailTemplatesEditor templates={templates} setTemplates={setTemplates} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
