"use client";

import { useState } from "react";
import { GripVertical, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const SPECIALTIES = [
  "Family Medicine", "Internal Medicine", "Pediatrics", "Emergency Medicine",
  "Surgery", "OB/GYN", "Psychiatry", "Orthopedics", "Cardiology",
  "Dermatology", "Neurology", "Oncology", "Radiology", "Pathology",
];

export function SpecialtyPreferences() {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(["Family Medicine", "Pediatrics", "Emergency Medicine"]);

  function toggle(specialty) {
    setSelected((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Specialty selection */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Specialties</CardTitle>
          <CardDescription>Select the clinical areas you're most interested in (ranked by preference)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Selected */}
            {selected.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Your selections (in order of preference)</p>
                <div className="grid gap-1.5">
                  {selected.map((s, i) => (
                    <div key={s} className="flex items-center gap-2 rounded-lg border bg-primary/5 p-2.5">
                      <GripVertical className="size-4 text-muted-foreground/40" />
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{i + 1}</span>
                      <span className="flex-1 text-sm font-medium">{s}</span>
                      <Button type="button" variant="ghost" size="icon-xs" onClick={() => toggle(s)}>
                        <Trash2 className="size-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available */}
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Available specialties</p>
              <div className="flex flex-wrap gap-1.5">
                {SPECIALTIES.filter((s) => !selected.includes(s)).map((s) => (
                  <button key={s} type="button" onClick={() => toggle(s)} className="rounded-lg border px-3 py-1.5 text-xs transition-colors hover:border-primary/40 hover:bg-primary/5">
                    <Plus className="mr-1 inline size-3" />{s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placement criteria */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Criteria</CardTitle>
          <CardDescription>Additional preferences for matching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Preferred location</Label>
                <Select defaultValue="any">
                  <SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="community">Community Health Center</SelectItem>
                    <SelectItem value="private">Private Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Max commute distance</Label>
                <Select defaultValue="25">
                  <SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="25">25 miles</SelectItem>
                    <SelectItem value="50">50 miles</SelectItem>
                    <SelectItem value="any">Any distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div>
                <p className="text-sm font-medium">Open to relocation</p>
                <p className="text-xs text-muted-foreground">Willing to relocate for the right placement</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div>
                <p className="text-sm font-medium">Paid placements only</p>
                <p className="text-xs text-muted-foreground">Only show stipend or paid opportunities</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? <><Loader2 className="size-4 animate-spin" />Saving...</> : <><Save className="size-4" data-icon="inline-start" />Save preferences</>}
        </Button>
      </div>
    </form>
  );
}
