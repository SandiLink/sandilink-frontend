"use client";

import { useState } from "react";
import { MapPin, Search, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { LocalizedText } from "@/components/shared/localized-text";
import { localizedHaystack } from "@/lib/localized-text";
import { SPECIALTIES } from "@/lib/catalogs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PRECEPTORS = [
  { id: "1", name: "Dr. Robert Williams", initials: "RW", specialty: "Family Medicine", location: "City Health Clinic", distance: "3.2 mi", rating: 4.9, reviews: 42, slots: 1, maxSlots: 4, programs: ["BSN", "MSN"] },
  { id: "2", name: "Dr. Maria Garcia", initials: "MG", specialty: { en: "Pediatrics", es: "Pediatría", fr: "Pédiatrie" }, location: "Children's Hospital", distance: "5.8 mi", rating: 4.8, reviews: 36, slots: 1, maxSlots: 3, programs: ["BSN", "MSN", "DNP"] },
  { id: "3", name: "Dr. Kevin Park", initials: "KP", specialty: "Emergency Medicine", location: "Metro General ER", distance: "8.1 mi", rating: 4.7, reviews: 28, slots: 1, maxSlots: 2, programs: ["BSN"] },
  { id: "4", name: "Dr. Anna Chen", initials: "AC", specialty: "OB/GYN", location: "Women's Health Clinic", distance: "4.5 mi", rating: 4.9, reviews: 31, slots: 1, maxSlots: 3, programs: ["BSN", "MSN"] },
  { id: "5", name: "Dr. James Martinez", initials: "JM", specialty: "Surgery", location: "Regional Surgical Center", distance: "12.4 mi", rating: 4.6, reviews: 22, slots: 1, maxSlots: 2, programs: ["BSN", "PA"] },
];

export function InstitutionPreceptorSearch() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  function toggleSelect(id) { setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }

  function requestSingle(preceptor) {
    toast.success(`Placement request sent to ${preceptor.name}`, {
      description: "They have 3 business days to respond.",
    });
  }

  function requestBulk() {
    if (selected.length === 0) return;
    const names = PRECEPTORS.filter((p) => selected.includes(p.id)).map((p) => p.name);
    toast.success(`Bulk placement request sent to ${selected.length} preceptor${selected.length > 1 ? "s" : ""}`, {
      description: names.slice(0, 3).join(", ") + (names.length > 3 ? `, +${names.length - 3} more` : ""),
    });
    setSelected([]);
  }

  const q = search.trim().toLowerCase();
  const filtered = !q
    ? PRECEPTORS
    : PRECEPTORS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          localizedHaystack(p.specialty).includes(q) ||
          p.location.toLowerCase().includes(q),
      );

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search preceptors, specialties..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialties</SelectItem>
            {SPECIALTIES.map((s) => <SelectItem key={s.id} value={s.id}><LocalizedText value={s.label} /></SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-3">
          <span className="text-sm">{selected.length} preceptor(s) selected</span>
          <Button size="sm" onClick={requestBulk}>Request bulk placement</Button>
        </div>
      )}

      <div className="grid gap-3">
        {filtered.map((p) => (
          <Card key={p.id} className={`transition-colors hover:bg-muted/30 ${selected.includes(p.id) ? "border-primary ring-1 ring-primary" : ""}`}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggleSelect(p.id)} className="mt-1" />
                <Avatar className="size-12 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-sm">{p.initials}</AvatarFallback></Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground"><LocalizedText value={p.specialty} /></p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => requestSingle(p)}>Request placement</Button>
                  </div>
                  <div className="flex items-center gap-1"><Star className="size-3.5 fill-amber-400 text-amber-400" /><span className="text-sm font-medium">{p.rating}</span><span className="text-xs text-muted-foreground">({p.reviews})</span></div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="size-3" />{p.distance} — {p.location}</span>
                    <span className="flex items-center gap-1"><Users className="size-3" />{p.slots} slot(s) open</span>
                  </div>
                  <div className="flex gap-1.5">{p.programs.map(pr => <Badge key={pr} variant="secondary" className="text-xs">{pr}</Badge>)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No preceptors match your search.
          </div>
        )}
      </div>
    </div>
  );
}
