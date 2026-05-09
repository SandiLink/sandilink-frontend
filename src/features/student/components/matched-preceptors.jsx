import Link from "next/link";
import { MapPin, Sparkles, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MATCHES = [
  { id: "dr-robert-williams", name: "Dr. Robert Williams", initials: "RW", specialty: "Family Medicine", location: "City Health Clinic", distance: "3.2 mi", rating: 4.9, reviews: 42, matchScore: 96, reasons: ["Top specialty match", "Within commute range", "Has open slots"], students: 3, max: 4 },
  { id: "dr-anna-chen", name: "Dr. Anna Chen", initials: "AC", specialty: "OB/GYN", location: "Women's Health Clinic", distance: "4.5 mi", rating: 4.9, reviews: 31, matchScore: 88, reasons: ["Accepts BSN students", "Top rated", "Schedule compatible"], students: 2, max: 3 },
  { id: "dr-maria-garcia", name: "Dr. Maria Garcia", initials: "MG", specialty: "Pediatrics", location: "Children's Hospital", distance: "5.8 mi", rating: 4.8, reviews: 36, matchScore: 85, reasons: ["2nd specialty preference", "Has open slots"], students: 2, max: 3 },
  { id: "dr-kevin-park", name: "Dr. Kevin Park", initials: "KP", specialty: "Emergency Medicine", location: "Metro General ER", distance: "8.1 mi", rating: 4.7, reviews: 28, matchScore: 78, reasons: ["3rd specialty preference", "Night shifts available"], students: 1, max: 2 },
  { id: "dr-james-martinez", name: "Dr. James Martinez", initials: "JM", specialty: "Surgery", location: "Regional Surgical Center", distance: "12.4 mi", rating: 4.6, reviews: 22, matchScore: 72, reasons: ["Paid stipend", "Has open slots"], students: 1, max: 2 },
];

export function MatchedPreceptors() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
        <Sparkles className="size-4 shrink-0 text-primary" />
        <span className="text-muted-foreground">
          These preceptors are ranked by how well they match your specialty preferences, location, availability, and program requirements.
        </span>
      </div>

      {MATCHES.map((match, i) => (
        <Card key={match.id} className="transition-colors hover:bg-muted/30">
          <CardContent className="pt-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {match.matchScore}%
                </div>
                <span className="text-[10px] text-muted-foreground">Match</span>
              </div>

              <Avatar className="size-12 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">{match.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/student/preceptors/${match.id}`} className="text-sm font-medium hover:text-primary hover:underline">{match.name}</Link>
                    <p className="text-xs text-muted-foreground">{match.specialty}</p>
                  </div>
                  <Button size="sm" asChild><Link href={`/student/preceptors/${match.id}`}>View profile</Link></Button>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{match.rating}</span>
                  <span className="text-xs text-muted-foreground">({match.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="size-3" />{match.distance} — {match.location}</span>
                  <span className="flex items-center gap-1"><Users className="size-3" />{match.students}/{match.max} students</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {match.reasons.map((r) => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
