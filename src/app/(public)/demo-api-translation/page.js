import { getLocale } from "next-intl/server";
import { LocalizedText } from "@/components/shared/localized-text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Demo — Translating Backend Data — SandiLink",
};

/**
 * SIMULATED BACKEND CALL
 * In real life this is a `fetch("/api/providers")` to your backend.
 * Note how each translatable field is an OBJECT keyed by locale code,
 * not a plain string. That is the contract the backend must honour.
 */
async function fetchProviders() {
  await new Promise((r) => setTimeout(r, 50));
  return [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatarInitials: "SJ",
      city: "Houston, TX",
      specialty: {
        en: "Family Medicine",
        es: "Medicina familiar",
        fr: "Médecine familiale",
        pt: "Medicina de família",
        ar: "طب الأسرة",
        sw: "Tiba ya familia",
        zh: "家庭医学",
        hi: "पारिवारिक चिकित्सा",
      },
      bio: {
        en: "Board-certified family physician with 15 years of experience in preventive care.",
        es: "Médica de familia certificada con 15 años de experiencia en cuidado preventivo.",
        fr: "Médecin de famille certifiée avec 15 ans d'expérience en soins préventifs.",
        pt: "Médica de família certificada com 15 anos de experiência em cuidados preventivos.",
        ar: "طبيبة عائلة معتمدة بخبرة 15 عامًا في الرعاية الوقائية.",
        sw: "Daktari wa familia aliyethibitishwa na uzoefu wa miaka 15 katika huduma ya kuzuia.",
        zh: "经认证的家庭医生，拥有 15 年的预防保健经验。",
        hi: "निवारक देखभाल में 15 वर्षों के अनुभव के साथ बोर्ड-प्रमाणित पारिवारिक चिकित्सक।",
      },
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      avatarInitials: "AH",
      city: "Cairo, EG",
      specialty: {
        en: "Interventional Cardiology",
        es: "Cardiología intervencionista",
        fr: "Cardiologie interventionnelle",
        ar: "أمراض القلب التداخلية",
      },
      // bio intentionally only in en + ar so we can demo fallback for other locales
      bio: {
        en: "Interventional cardiologist focused on minimally invasive coronary procedures.",
        ar: "طبيب قلب تداخلي يركز على إجراءات القلب الأقل تدخلًا.",
      },
    },
  ];
}

export default async function ApiTranslationDemoPage() {
  const locale = await getLocale();
  const providers = await fetchProviders();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="outline">Demo</Badge>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
          Translating data that comes from the backend
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          The mock <code className="rounded bg-muted px-1 py-0.5 text-sm">fetchProviders()</code>{" "}
          returns objects whose translatable fields are <em>maps</em> of locale → string. The page
          renders them with <code className="rounded bg-muted px-1 py-0.5 text-sm">&lt;LocalizedText /&gt;</code>,
          which picks the active locale or falls back gracefully.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Active locale: <Badge variant="secondary" className="ml-1">{locale}</Badge>{" "}
          — switch it from the language picker in the header to see this page re-render in another language.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {providers.map((p) => (
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
                  specialty
                </p>
                <p className="mt-1 text-sm font-medium">
                  <LocalizedText value={p.specialty} fallback={<em>Not provided</em>} />
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  bio
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <LocalizedText value={p.bio} fallback={<em>No bio</em>} />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border bg-muted/30 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Raw API response (this is what the backend would return)
        </p>
        <pre className="mt-3 overflow-auto rounded-lg bg-background p-4 text-xs leading-relaxed">
          {JSON.stringify(providers, null, 2)}
        </pre>
        <p className="mt-3 text-xs text-muted-foreground">
          Notice <code>specialty</code> and <code>bio</code> are <strong>objects</strong>, not strings.
          The second provider has <code>bio</code> only in <code>en</code> and <code>ar</code> — for
          other locales the component falls back to English (the default locale) instead of showing nothing.
        </p>
      </div>
    </div>
  );
}
