"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  RefreshCw,
  Save,
  ShieldCheck,
  Webhook,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  GATEWAY_CATALOG,
  usePaymentGatewayStore,
} from "@/store/use-payment-gateway-store";

function formatRelative(iso) {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function CredentialField({ field, value, onChange, mode }) {
  const [reveal, setReveal] = useState(false);
  const isSecret = field.secret;
  const placeholder = field.prefix
    ? `${field.prefix}${mode === "live" ? "live_" : "test_"}…`
    : `${mode === "live" ? "live_" : "test_"}…`;

  function copyToClipboard() {
    navigator.clipboard?.writeText(value || "");
  }

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={field.key} className="flex items-center gap-2">
        {field.label}
        {isSecret ? (
          <Badge variant="outline" className="text-[10px]">
            Secret
          </Badge>
        ) : null}
      </Label>
      <div className="flex gap-2">
        <Input
          id={field.key}
          type={isSecret && !reveal ? "password" : "text"}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="font-mono text-sm"
          autoComplete="off"
        />
        {isSecret ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide value" : "Reveal value"}
          >
            {reveal ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          disabled={!value}
          aria-label="Copy to clipboard"
        >
          <Copy className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function GatewayCard({ gateway }) {
  const state = usePaymentGatewayStore((s) => s.gateways[gateway.id]);
  const setEnabled = usePaymentGatewayStore((s) => s.setEnabled);
  const setMode = usePaymentGatewayStore((s) => s.setMode);
  const setCredential = usePaymentGatewayStore((s) => s.setCredential);
  const setWebhookUrl = usePaymentGatewayStore((s) => s.setWebhookUrl);
  const simulateWebhookEvent = usePaymentGatewayStore(
    (s) => s.simulateWebhookEvent,
  );
  const reset = usePaymentGatewayStore((s) => s.reset);

  if (!state) return null;

  const { enabled, mode, credentials, webhookUrl, webhookHealth, lastEventAt } =
    state;
  const credentialsFilled = gateway.credentialFields.every(
    (f) => credentials[f.key]?.length > 0,
  );

  function copyWebhook() {
    navigator.clipboard?.writeText(webhookUrl);
  }

  return (
    <Card className={enabled ? "" : "border-muted opacity-90"}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={
                enabled
                  ? "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  : "flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"
              }
            >
              <CreditCard className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{gateway.name}</CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Phase {gateway.phase}
                </Badge>
                {enabled ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
              </div>
              <CardDescription className="mt-1 flex items-center gap-1.5 text-xs">
                <Globe className="size-3" />
                {gateway.region} · {gateway.note}
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={(v) => setEnabled(gateway.id, v)}
            aria-label={`Enable ${gateway.name}`}
          />
        </div>
      </CardHeader>

      {enabled ? (
        <CardContent className="grid gap-5">
          {/* Mode toggle */}
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Live mode</p>
              <p className="text-xs text-muted-foreground">
                {mode === "live"
                  ? "Real charges will be processed."
                  : "Test mode active. No real charges."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={mode === "live" ? "default" : "secondary"}
                className="text-[10px] uppercase"
              >
                {mode}
              </Badge>
              <Switch
                checked={mode === "live"}
                onCheckedChange={(v) =>
                  setMode(gateway.id, v ? "live" : "test")
                }
                aria-label={`Toggle ${gateway.name} live mode`}
              />
            </div>
          </div>

          {/* Credentials */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">API credentials</p>
              {credentialsFilled ? (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                >
                  <Check className="size-3" />
                  Complete
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                >
                  <AlertTriangle className="size-3" />
                  Incomplete
                </Badge>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {gateway.credentialFields.map((field) => (
                <CredentialField
                  key={field.key}
                  field={field}
                  value={credentials[field.key]}
                  onChange={(v) => setCredential(gateway.id, field.key, v)}
                  mode={mode}
                />
              ))}
            </div>
          </div>

          {/* Webhook */}
          <div className="grid gap-3 rounded-lg border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Webhook className="size-4 text-primary" />
                <p className="text-sm font-medium">Webhook endpoint</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {webhookHealth === "healthy" ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    Healthy
                  </span>
                ) : webhookHealth === "failed" ? (
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <XCircle className="size-3.5" />
                    Failed
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                    No events yet
                  </span>
                )}
                <span>· last event {formatRelative(lastEventAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(gateway.id, e.target.value)}
                className="font-mono text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyWebhook}
                aria-label="Copy webhook URL"
              >
                <Copy className="size-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add this URL to your {gateway.name} dashboard to receive payment
              events.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => simulateWebhookEvent(gateway.id)}
              >
                <RefreshCw className="size-3.5" />
                Send test event
              </Button>
              <Button type="button" variant="outline" size="sm" asChild>
                <a
                  href={gateway.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-3.5" />
                  {gateway.name} docs
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => reset(gateway.id)}
                className="ml-auto text-muted-foreground"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This gateway is disabled. Enable to configure credentials and
            webhooks.
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export default function PaymentConfig() {
  const gateways = usePaymentGatewayStore((s) => s.gateways);
  const [tab, setTab] = useState("phase1");

  const allList = GATEWAY_CATALOG;
  const phase1 = allList.filter((g) => g.phase === 1);
  const phase2 = allList.filter((g) => g.phase === 2);
  const enabledList = allList.filter((g) => gateways[g.id]?.enabled);
  const liveList = enabledList.filter((g) => gateways[g.id]?.mode === "live");
  const incompleteList = enabledList.filter((g) =>
    g.credentialFields.some((f) => !gateways[g.id]?.credentials?.[f.key]),
  );

  const stats = [
    {
      label: "Gateways",
      value: allList.length,
      detail: `${phase1.length} Phase 1 · ${phase2.length} Phase 2`,
      icon: CreditCard,
    },
    {
      label: "Enabled",
      value: enabledList.length,
      detail:
        enabledList.length === 0
          ? "No gateway active"
          : enabledList.map((g) => g.name).join(", "),
      icon: ShieldCheck,
    },
    {
      label: "Live mode",
      value: liveList.length,
      detail:
        liveList.length === 0
          ? "All in test mode"
          : `${liveList.length} processing real charges`,
      icon: Globe,
    },
    {
      label: "Needs attention",
      value: incompleteList.length,
      detail:
        incompleteList.length === 0
          ? "All credentials filled"
          : `${incompleteList.map((g) => g.name).join(", ")} missing keys`,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CreditCard className="size-5" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Payment Gateways
          </h1>
          <p className="text-sm text-muted-foreground">
            Enable or disable payment providers, manage credentials, and
            monitor webhook health. Enabled gateways appear on the provider
            checkout.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{s.label}</CardDescription>
              <CardTitle className="font-heading text-2xl">
                {s.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {s.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="phase1">
            Phase 1 — Launch
            <Badge variant="secondary" className="ml-2 text-[10px]">
              {phase1.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="phase2">
            Phase 2 — Global expansion
            <Badge variant="secondary" className="ml-2 text-[10px]">
              {phase2.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2 text-[10px]">
              {allList.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phase1" className="mt-6">
          <div className="grid gap-4">
            {phase1.map((g) => (
              <GatewayCard key={g.id} gateway={g} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="phase2" className="mt-6">
          <div className="grid gap-4">
            {phase2.map((g) => (
              <GatewayCard key={g.id} gateway={g} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {allList.map((g) => (
              <GatewayCard key={g.id} gateway={g} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Persistence</CardTitle>
          <CardDescription>
            Changes are persisted locally for the demo. In production these
            would write to a backend config service and propagate to the
            checkout via a feature-flag fetch on every page load.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Save className="size-4" />
            Save settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
