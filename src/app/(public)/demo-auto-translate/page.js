import { getLocale } from "next-intl/server";
import { autoTranslate } from "@/lib/auto-translate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Demo — Auto-Translating Backend Data — SandiLink",
};

/**
 * SIMULATED BACKEND CALL
 *
 * Notice every translatable field is a PLAIN ENGLISH STRING.
 * The backend stores only English. No multilingual JSON anywhere.
 */
async function fetchProviders() {
  return [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatarInitials: "SJ",
      city: "Houston, TX",
      specialty: "Family Medicine",
      bio: "Board-certified family physician with 15 years of experience in preventive care. Accepts SandiLink booking for virtual and in-person visits.",
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      avatarInitials: "AH",
      city: "Cairo, EG",
      specialty: "Interventional Cardiology",
      bio: "Cardiologist focused on minimally invasive coronary procedures. Accepts payments via Stripe, PayPal, and M-Pesa.",
    },
  ];
}

export default async function AutoTranslateDemoPage() {
  const locale = await getLocale();
  const providers = await fetchProviders();

  // Translate each card's translatable fields for the active locale.
  // This runs on the SERVER. Results are cached, so refreshing the page is instant.
  const translated = await Promise.all(
    providers.map(async (p) => {
      const [specialty, bio] = await Promise.all([
        autoTranslate(p.specialty, locale),
        autoTranslate(p.bio, locale),
      ]);
      return { ...p, specialty, bio };
    }),
  );

  const anyFailed = translated.some(
    (p) => p.specialty.source === "fallback-english" || p.bio.source === "fallback-english",
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="outline">Demo</Badge>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
          Auto-translating data straight from the backend
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          The mock <code className="rounded bg-muted px-1 py-0.5 text-sm">fetchProviders()</code>{" "}
          returns plain English strings — nothing multilingual stored anywhere. The page calls{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm">autoTranslate()</code> on the
          server for the active locale and caches the result.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Active locale:</span>
          <Badge variant="secondary">{locale}</Badge>
          <span>·</span>
          <span>Switch from the language picker in the header to see different translations.</span>
        </div>
        {anyFailed && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
            <strong>Heads up:</strong> some fields fell back to English — Google rate-limited the
            unofficial scraper for this IP. The library and code path work fine; cooldowns reset
            in an hour or two. In production you would use the official{" "}
            <code>@google-cloud/translate</code> SDK which has no IP throttle.
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {translated.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {p.avatarInitials}
                </div>
                <div>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <CardDescription className="text-xs">{p.city}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  specialty{" "}
                  <SourceBadge result={p.specialty} />
                </p>
                <p className="mt-1 text-sm font-medium">{p.specialty.text}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  bio <SourceBadge result={p.bio} />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.bio.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border bg-muted/30 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Raw API response (this is what the backend returns)
        </p>
        <pre className="mt-3 overflow-auto rounded-lg bg-background p-4 text-xs leading-relaxed">
          {JSON.stringify(providers, null, 2)}
        </pre>
        <p className="mt-3 text-xs text-muted-foreground">
          Notice <code>specialty</code> and <code>bio</code> are plain English strings. The
          translation happens at render time, on the server, with an in-memory cache. The first
          time this page loads in Arabic, every text field hits Google Translate; the second time,
          everything is served from cache and renders instantly.
        </p>
      </div>
    </div>
  );
}

function SourceBadge({ result }) {
  if (result.source === "original")
    return <span className="ml-1 text-[10px] font-normal text-muted-foreground/60">(source = en)</span>;
  if (result.source === "translated")
    return (
      <span className="ml-1 text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
        (auto-translated{result.cached ? ", cached" : ""})
      </span>
    );
  return (
    <span className="ml-1 text-[10px] font-normal text-amber-600 dark:text-amber-400">
      (rate-limited, showing English)
    </span>
  );
}
