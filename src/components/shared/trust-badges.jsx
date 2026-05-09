import {
  BadgeCheck,
  Building,
  Clock,
  Globe,
  MapPin,
  PenTool,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * TrustBadges — Structured trust signals for professional cards and profiles.
 *
 * @param {object} props
 * @param {string}  [props.profession]    — e.g. "Physician", "Grant Writer"
 * @param {string}  [props.specialty]     — e.g. "General Practice", "NIH Proposals"
 * @param {string}  [props.country]       — e.g. "United States"
 * @param {string}  [props.location]      — e.g. "Downtown Medical Center"
 * @param {string}  [props.distance]      — e.g. "2.3 mi"
 * @param {string}  [props.responseTime]  — e.g. "< 1 hour"
 * @param {boolean} [props.verified]      — show verified badge
 * @param {string[]} [props.languages]    — e.g. ["English", "Spanish"]
 * @param {boolean} [props.virtual]       — supports virtual delivery
 * @param {boolean} [props.inPerson]      — supports in-person delivery
 * @param {boolean} [props.projectBased]  — supports project-based delivery
 * @param {"inline"|"badges"|"compact"} [props.variant] — display style (default: "inline")
 */
export function TrustBadges({
  profession,
  specialty,
  country,
  location,
  distance,
  responseTime,
  verified,
  languages,
  virtual,
  inPerson,
  projectBased,
  variant = "inline",
}) {
  if (variant === "badges") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {verified && <Badge variant="outline" className="text-[10px] gap-1"><BadgeCheck className="size-3 text-primary" />Verified</Badge>}
        {profession && <Badge variant="secondary" className="text-[10px]">{profession}</Badge>}
        {specialty && <Badge variant="outline" className="text-[10px]">{specialty}</Badge>}
        {country && <Badge variant="outline" className="text-[10px] gap-1"><Globe className="size-2.5" />{country}</Badge>}
        {responseTime && <Badge variant="outline" className="text-[10px] gap-1"><Clock className="size-2.5" />{responseTime}</Badge>}
        {languages?.length > 1 && <Badge variant="outline" className="text-[10px]">{languages.join(", ")}</Badge>}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        {country && <span className="flex items-center gap-1"><Globe className="size-3" />{country}</span>}
        {responseTime && <span className="flex items-center gap-1"><Clock className="size-3" />{responseTime}</span>}
        {languages?.length > 1 && <span>{languages.join(", ")}</span>}
      </div>
    );
  }

  // Default: inline
  return (
    <div className="flex flex-col gap-2">
      {/* Location + trust details row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {(location || distance) && (
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {distance ? `${distance} — ${location}` : location}
          </span>
        )}
        {country && <span className="flex items-center gap-1"><Globe className="size-3" />{country}</span>}
        {responseTime && <span className="flex items-center gap-1"><Clock className="size-3" />{responseTime}</span>}
        {languages?.length > 0 && <span>{languages.join(", ")}</span>}
      </div>

      {/* Delivery model badges */}
      {(virtual || inPerson || projectBased) && (
        <div className="flex flex-wrap gap-1.5">
          {virtual && <Badge variant="outline" className="text-[10px] gap-1"><Video className="size-3" />Virtual</Badge>}
          {inPerson && <Badge variant="outline" className="text-[10px] gap-1"><Building className="size-3" />In-person</Badge>}
          {projectBased && <Badge variant="outline" className="text-[10px] gap-1"><PenTool className="size-3" />Project-based</Badge>}
        </div>
      )}
    </div>
  );
}

/**
 * VerifiedName — Name with optional verified badge inline.
 */
export function VerifiedName({ children, verified, className = "text-sm font-medium" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      {verified && <BadgeCheck className="size-4 text-primary" />}
    </span>
  );
}
