/**
 * Translated, admin-configurable catalogs that drive provider profiles,
 * directory filters, and search.
 *
 * Each entry has:
 *   - `id`     — stable key used everywhere (filter state, foreign keys, etc.)
 *   - `label`  — `{ en, es, fr, ... }` localized map, rendered via <LocalizedText>
 *   - `status` — "active" | "deactivated" — deactivated entries stay in the
 *                catalog so existing references keep resolving, but they no
 *                longer surface in pickers / filters
 *
 * Catalog-specific fields (category, country, customAllowed, etc.) extend the
 * base shape and are documented at each constant.
 *
 * Static for now; once admin persistence lands, this constant becomes the
 * seed and consumers swap to a server-state hook returning the same shape.
 */

const active = "active";

/**
 * Top-level provider category — the broad grouping a provider role belongs
 * to. Section 9: clinical / allied / CAM / wellness / supportive / community
 * health / non-clinical / country-specific. Specialties reference these via
 * `categoryId`.
 */
export const PROVIDER_CATEGORIES = [
  { id: "clinical", status: active, label: { en: "Clinical", es: "Clínico", fr: "Clinique" } },
  { id: "allied-health", status: active, label: { en: "Allied Health", es: "Salud Aliada", fr: "Professions paramédicales" } },
  { id: "cam", status: active, label: { en: "Complementary & Alternative Medicine", es: "Medicina Complementaria y Alternativa", fr: "Médecine complémentaire et alternative" } },
  { id: "wellness", status: active, label: { en: "Wellness", es: "Bienestar", fr: "Bien-être" } },
  { id: "supportive-care", status: active, label: { en: "Supportive Care", es: "Cuidados de Apoyo", fr: "Soins de soutien" } },
  { id: "community-health", status: active, label: { en: "Community Health", es: "Salud Comunitaria", fr: "Santé communautaire" } },
  { id: "non-clinical", status: active, label: { en: "Non-Clinical", es: "No Clínico", fr: "Non-clinique" } },
  { id: "country-specific", status: active, label: { en: "Country-specific / Emerging", es: "Específico por país / Emergente", fr: "Spécifique au pays / Émergent" } },
];

export function getProviderCategory(id) {
  return PROVIDER_CATEGORIES.find((c) => c.id === id) ?? null;
}

/**
 * Specialty — fine-grained scope of practice, multi-selectable on a provider
 * profile. References `categoryId`. `country` is optional and only set for
 * country-specific specialties (e.g. roles that exist only in one regulatory
 * regime). `tags` lets admins flag wellness/alternative entries.
 */
export const SPECIALTIES = [
  { id: "general-practice", status: active, categoryId: "clinical", label: { en: "General Practice", es: "Medicina General", fr: "Médecine générale" } },
  { id: "family-medicine", status: active, categoryId: "clinical", label: { en: "Family Medicine", es: "Medicina Familiar", fr: "Médecine familiale" } },
  { id: "internal-medicine", status: active, categoryId: "clinical", label: { en: "Internal Medicine", es: "Medicina Interna", fr: "Médecine interne" } },
  { id: "pediatrics", status: active, categoryId: "clinical", label: { en: "Pediatrics", es: "Pediatría", fr: "Pédiatrie" } },
  { id: "emergency-medicine", status: active, categoryId: "clinical", label: { en: "Emergency Medicine", es: "Medicina de Emergencia", fr: "Médecine d'urgence" } },
  { id: "surgery", status: active, categoryId: "clinical", label: { en: "Surgery", es: "Cirugía", fr: "Chirurgie" } },
  { id: "ob-gyn", status: active, categoryId: "clinical", label: { en: "OB/GYN", es: "Ginecología y Obstetricia", fr: "Gynéco-obstétrique" } },
  { id: "psychiatry", status: active, categoryId: "clinical", label: { en: "Psychiatry", es: "Psiquiatría", fr: "Psychiatrie" } },
  { id: "cardiology", status: active, categoryId: "clinical", label: { en: "Cardiology", es: "Cardiología", fr: "Cardiologie" } },
  { id: "neurology", status: active, categoryId: "clinical", label: { en: "Neurology", es: "Neurología", fr: "Neurologie" } },
  { id: "orthopedics", status: active, categoryId: "clinical", label: { en: "Orthopedics", es: "Ortopedia", fr: "Orthopédie" } },
  { id: "dermatology", status: active, categoryId: "clinical", label: { en: "Dermatology", es: "Dermatología", fr: "Dermatologie" } },
  { id: "physical-therapy", status: active, categoryId: "allied-health", label: { en: "Physical Therapy", es: "Fisioterapia", fr: "Kinésithérapie" } },
  { id: "sports-rehabilitation", status: active, categoryId: "allied-health", label: { en: "Sports Rehabilitation", es: "Rehabilitación Deportiva", fr: "Rééducation sportive" } },
  { id: "occupational-therapy", status: active, categoryId: "allied-health", label: { en: "Occupational Therapy", es: "Terapia Ocupacional", fr: "Ergothérapie" } },
  { id: "mental-health", status: active, categoryId: "clinical", label: { en: "Mental Health", es: "Salud Mental", fr: "Santé mentale" } },
  { id: "acupuncture", status: active, categoryId: "cam", tags: ["alternative"], label: { en: "Acupuncture", es: "Acupuntura", fr: "Acupuncture" } },
  { id: "naturopathy", status: active, categoryId: "cam", tags: ["alternative"], label: { en: "Naturopathy", es: "Naturopatía", fr: "Naturopathie" } },
  { id: "yoga-therapy", status: active, categoryId: "wellness", tags: ["wellness"], label: { en: "Yoga Therapy", es: "Yogaterapia", fr: "Yoga-thérapie" } },
  { id: "nutrition-coaching", status: active, categoryId: "wellness", tags: ["wellness"], label: { en: "Nutrition Coaching", es: "Asesoría Nutricional", fr: "Coaching nutritionnel" } },
  { id: "doula-services", status: active, categoryId: "supportive-care", label: { en: "Doula Services", es: "Servicios de Doula", fr: "Services de doula" } },
  { id: "chw-outreach", status: active, categoryId: "community-health", label: { en: "Community Health Outreach", es: "Alcance de Salud Comunitaria", fr: "Intervention en santé communautaire" } },
  { id: "public-health", status: active, categoryId: "community-health", label: { en: "Public Health", es: "Salud Pública", fr: "Santé publique" } },
  { id: "home-health-care", status: active, categoryId: "supportive-care", label: { en: "Home Health Care", es: "Atención Domiciliaria", fr: "Soins à domicile" } },
  { id: "nih-nsf-proposals", status: active, categoryId: "non-clinical", label: { en: "NIH & NSF Proposals", es: "Propuestas NIH y NSF", fr: "Propositions NIH & NSF" } },
];

export function getSpecialty(id) {
  return SPECIALTIES.find((s) => s.id === id) ?? null;
}

/**
 * Service type — what a provider offers for booking. `customAllowed` lets
 * providers add their own description for this service (e.g. an "Other"
 * slot); `customMaxLength` is the admin-set ceiling on that custom text.
 */
export const SERVICE_TYPES = [
  { id: "in-person-visit", status: active, customAllowed: false, label: { en: "In-person visit", es: "Visita presencial", fr: "Visite en personne" } },
  { id: "virtual-visit", status: active, customAllowed: false, label: { en: "Virtual visit", es: "Consulta virtual", fr: "Consultation virtuelle" } },
  { id: "home-visit", status: active, customAllowed: false, label: { en: "Home visit", es: "Visita a domicilio", fr: "Visite à domicile" } },
  { id: "project-engagement", status: active, customAllowed: true, customMaxLength: 240, label: { en: "Project engagement", es: "Compromiso por proyecto", fr: "Mission par projet" } },
  { id: "mentorship", status: active, customAllowed: false, label: { en: "Mentorship", es: "Mentoría", fr: "Mentorat" } },
  { id: "custom", status: active, customAllowed: true, customMaxLength: 200, label: { en: "Custom service", es: "Servicio personalizado", fr: "Service personnalisé" } },
];

export function getServiceType(id) {
  return SERVICE_TYPES.find((s) => s.id === id) ?? null;
}

/**
 * Credential — license / qualification a provider can list. `country` scopes
 * a credential to a specific regulatory regime (e.g. NP exists in US, RGN in
 * UK, IEN as bridge designation). Empty `country` means the credential is
 * generally recognized.
 */
export const CREDENTIALS = [
  { id: "md", status: active, country: null, label: { en: "MD (Doctor of Medicine)", es: "Médico (MD)", fr: "Docteur en médecine (MD)" } },
  { id: "do", status: active, country: "US", label: { en: "DO (Doctor of Osteopathic Medicine)", es: "DO — Doctor en Medicina Osteopática", fr: "Docteur en ostéopathie (DO)" } },
  { id: "np", status: active, country: "US", label: { en: "NP (Nurse Practitioner)", es: "Enfermera de Práctica Avanzada (NP)", fr: "Infirmière praticienne (NP)" } },
  { id: "rn", status: active, country: null, label: { en: "RN (Registered Nurse)", es: "Enfermera Registrada (RN)", fr: "Infirmière diplômée (RN)" } },
  { id: "pa", status: active, country: "US", label: { en: "PA (Physician Assistant)", es: "Asistente Médico (PA)", fr: "Assistant médical (PA)" } },
  { id: "rgn", status: active, country: "UK", label: { en: "RGN (Registered General Nurse)", es: "Enfermera General Registrada (RGN)", fr: "Infirmière générale agréée (RGN)" } },
  { id: "lcsw", status: active, country: "US", label: { en: "LCSW (Licensed Clinical Social Worker)", es: "Trabajador Social Clínico Licenciado (LCSW)", fr: "Travailleur social clinique licencié (LCSW)" } },
  { id: "pt", status: active, country: null, label: { en: "PT (Physical Therapist)", es: "Fisioterapeuta (PT)", fr: "Kinésithérapeute (PT)" } },
  { id: "phd", status: active, country: null, label: { en: "PhD", es: "Doctorado (PhD)", fr: "Doctorat (PhD)" } },
];

export function getCredential(id) {
  return CREDENTIALS.find((c) => c.id === id) ?? null;
}

/**
 * Delivery mode — how a service is delivered. Open-ended: admins can add
 * future modes (group, asynchronous, mobile clinic, etc.).
 */
export const DELIVERY_MODES = [
  { id: "in-person", status: active, label: { en: "In-person", es: "Presencial", fr: "En personne" } },
  { id: "virtual", status: active, label: { en: "Virtual", es: "Virtual", fr: "Virtuel" } },
  { id: "hybrid", status: active, label: { en: "Hybrid", es: "Híbrido", fr: "Hybride" } },
  { id: "asynchronous", status: active, label: { en: "Asynchronous (messaging)", es: "Asincrónico (mensajería)", fr: "Asynchrone (messagerie)" } },
];

export function getDeliveryMode(id) {
  return DELIVERY_MODES.find((m) => m.id === id) ?? null;
}

/**
 * Active-only views. Use these in pickers and search filters so deactivated
 * entries don't show up to end users (but still resolve when displaying
 * historical data referencing their id).
 */
export const activeOnly = (catalog) => catalog.filter((e) => e.status === "active");

/**
 * Regions used by the global healthcare role mapping table. Mix of countries
 * and continent-scopes — admins can add either kind. `kind` is "country" for
 * single-jurisdiction entries and "continent" for broader scopes that cover
 * multiple countries (used as a default until a more granular country entry
 * is added).
 */
export const REGIONS = [
  { code: "US", status: active, kind: "country", label: { en: "United States", es: "Estados Unidos", fr: "États-Unis" } },
  { code: "UK", status: active, kind: "country", label: { en: "United Kingdom", es: "Reino Unido", fr: "Royaume-Uni" } },
  { code: "CA", status: active, kind: "country", label: { en: "Canada", es: "Canadá", fr: "Canada" } },
  { code: "AU", status: active, kind: "country", label: { en: "Australia", es: "Australia", fr: "Australie" } },
  { code: "AF", status: active, kind: "continent", label: { en: "Africa", es: "África", fr: "Afrique" } },
  { code: "CB", status: active, kind: "continent", label: { en: "Caribbean", es: "Caribe", fr: "Caraïbes" } },
  { code: "AS", status: active, kind: "continent", label: { en: "Asia", es: "Asia", fr: "Asie" } },
];

export function getRegion(code) {
  return REGIONS.find((r) => r.code === code) ?? null;
}

/**
 * Canonical global role concept — the hub in the hub-and-spoke role-mapping
 * model. Local jurisdictions map their named roles + credentials to one of
 * these. Adding a new country only means adding mappings, not duplicating
 * the role concept.
 */
export const GLOBAL_ROLES = [
  { id: "physician-general", status: active, label: { en: "Physician (general)", es: "Médico general", fr: "Médecin généraliste" } },
  { id: "nurse-practitioner", status: active, label: { en: "Nurse Practitioner", es: "Enfermera de Práctica Avanzada", fr: "Infirmière praticienne" } },
  { id: "registered-nurse", status: active, label: { en: "Registered Nurse", es: "Enfermera Registrada", fr: "Infirmière diplômée" } },
  { id: "physician-assistant", status: active, label: { en: "Physician Assistant", es: "Asistente Médico", fr: "Assistant médical" } },
  { id: "midwife", status: active, label: { en: "Midwife", es: "Partera", fr: "Sage-femme" } },
  { id: "physical-therapist", status: active, label: { en: "Physical Therapist", es: "Fisioterapeuta", fr: "Kinésithérapeute" } },
  { id: "pharmacist", status: active, label: { en: "Pharmacist", es: "Farmacéutico", fr: "Pharmacien" } },
  { id: "mental-health-counselor", status: active, label: { en: "Mental Health Counselor", es: "Consejero de Salud Mental", fr: "Conseiller en santé mentale" } },
  { id: "community-health-worker", status: active, label: { en: "Community Health Worker", es: "Promotor de Salud Comunitaria", fr: "Agent de santé communautaire" } },
  { id: "doula", status: active, label: { en: "Doula", es: "Doula", fr: "Doula" } },
];

export function getGlobalRole(id) {
  return GLOBAL_ROLES.find((r) => r.id === id) ?? null;
}

/**
 * Per-region role mapping. Identifies what a `globalRoleId` is *called*
 * locally and which credentials apply. `localName` is a localized map so the
 * directory can show the locally-recognized name to a viewer in their own
 * language. `notes` is a free-text admin scratchpad (e.g., licensure
 * peculiarities or scope-of-practice differences).
 */
export const ROLE_MAPPINGS = [
  { globalRoleId: "physician-general", regionCode: "US", credentialIds: ["md", "do"], localName: { en: "Doctor of Medicine (MD) / Osteopathic (DO)", es: "Médico (MD) / Osteópata (DO)", fr: "Médecin (MD) / Ostéopathe (DO)" }, notes: "Allopathic and osteopathic physicians both hold full practice rights." },
  { globalRoleId: "physician-general", regionCode: "UK", credentialIds: ["md"], localName: { en: "Registered Medical Practitioner", es: "Médico Registrado", fr: "Médecin inscrit" }, notes: "GMC registration required." },
  { globalRoleId: "physician-general", regionCode: "CA", credentialIds: ["md"], localName: { en: "Doctor of Medicine (MD)", es: "Médico (MD)", fr: "Docteur en médecine (MD)" }, notes: "Provincial College registration required." },
  { globalRoleId: "physician-general", regionCode: "AU", credentialIds: ["md"], localName: { en: "Registered Medical Practitioner", es: "Médico Registrado", fr: "Médecin inscrit" }, notes: "AHPRA registration." },

  { globalRoleId: "nurse-practitioner", regionCode: "US", credentialIds: ["np"], localName: { en: "Nurse Practitioner (NP)", es: "Enfermera de Práctica Avanzada (NP)", fr: "Infirmière praticienne (NP)" }, notes: "Independent practice varies by state." },
  { globalRoleId: "nurse-practitioner", regionCode: "UK", credentialIds: ["rgn"], localName: { en: "Advanced Nurse Practitioner (ANP)", es: "Enfermera de Práctica Avanzada (ANP)", fr: "Infirmière praticienne avancée (ANP)" }, notes: "Title varies by employer; underpinned by RGN registration." },
  { globalRoleId: "nurse-practitioner", regionCode: "CA", credentialIds: ["np"], localName: { en: "Nurse Practitioner", es: "Enfermera de Práctica Avanzada", fr: "Infirmière praticienne" }, notes: "" },
  { globalRoleId: "nurse-practitioner", regionCode: "AU", credentialIds: [], localName: { en: "Nurse Practitioner", es: "Enfermera de Práctica Avanzada", fr: "Infirmière praticienne" }, notes: "Endorsed by NMBA." },

  { globalRoleId: "registered-nurse", regionCode: "US", credentialIds: ["rn"], localName: { en: "Registered Nurse (RN)", es: "Enfermera Registrada (RN)", fr: "Infirmière diplômée (RN)" }, notes: "" },
  { globalRoleId: "registered-nurse", regionCode: "UK", credentialIds: ["rgn"], localName: { en: "Registered General Nurse (RGN)", es: "Enfermera General Registrada (RGN)", fr: "Infirmière générale agréée (RGN)" }, notes: "NMC registration." },
  { globalRoleId: "registered-nurse", regionCode: "CA", credentialIds: ["rn"], localName: { en: "Registered Nurse (RN)", es: "Enfermera Registrada (RN)", fr: "Infirmière autorisée (RN)" }, notes: "" },
  { globalRoleId: "registered-nurse", regionCode: "AU", credentialIds: ["rn"], localName: { en: "Registered Nurse (RN)", es: "Enfermera Registrada (RN)", fr: "Infirmière diplômée (RN)" }, notes: "" },

  { globalRoleId: "physician-assistant", regionCode: "US", credentialIds: ["pa"], localName: { en: "Physician Assistant (PA)", es: "Asistente Médico (PA)", fr: "Assistant médical (PA)" }, notes: "" },
  { globalRoleId: "physician-assistant", regionCode: "UK", credentialIds: [], localName: { en: "Physician Associate (PA)", es: "Asociado Médico (PA)", fr: "Associé médical (PA)" }, notes: "Title differs from US — same scope concept." },

  { globalRoleId: "physical-therapist", regionCode: "US", credentialIds: ["pt"], localName: { en: "Physical Therapist (PT)", es: "Fisioterapeuta (PT)", fr: "Kinésithérapeute (PT)" }, notes: "" },
  { globalRoleId: "physical-therapist", regionCode: "UK", credentialIds: [], localName: { en: "Physiotherapist", es: "Fisioterapeuta", fr: "Kinésithérapeute" }, notes: "HCPC registration." },
];

/**
 * Lookup helper — returns the mapping for a (globalRoleId, regionCode) pair
 * or null when no mapping exists yet.
 */
export function getRoleMapping(mappings, globalRoleId, regionCode) {
  return (
    mappings.find(
      (m) => m.globalRoleId === globalRoleId && m.regionCode === regionCode,
    ) ?? null
  );
}
