"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PlacementAssignment() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) { e.preventDefault(); setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setIsLoading(false); }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl grid gap-6">
      <Card>
        <CardHeader><CardTitle>Student</CardTitle><CardDescription>Select the student to place</CardDescription></CardHeader>
        <CardContent>
          <Select><SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select a student" /></SelectTrigger><SelectContent>
            <SelectItem value="emily-davis">Emily Davis — BSN, 1st Year (Unplaced)</SelectItem>
            <SelectItem value="alex-wong">Alex Wong — BSN, 3rd Year (Unplaced)</SelectItem>
          </SelectContent></Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preceptor</CardTitle><CardDescription>Select or search for a preceptor</CardDescription></CardHeader>
        <CardContent>
          <Select><SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select a preceptor" /></SelectTrigger><SelectContent>
            <SelectItem value="dr-williams">Dr. Robert Williams — Family Medicine (1 slot open)</SelectItem>
            <SelectItem value="dr-garcia">Dr. Maria Garcia — Pediatrics (1 slot open)</SelectItem>
            <SelectItem value="dr-park">Dr. Kevin Park — Emergency Medicine (1 slot open)</SelectItem>
            <SelectItem value="dr-chen">Dr. Anna Chen — OB/GYN (1 slot open)</SelectItem>
          </SelectContent></Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Placement Details</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5"><Label>Start date</Label><Input type="date" required className="h-10" /></div>
              <div className="grid gap-1.5"><Label>End date</Label><Input type="date" required className="h-10" /></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5"><Label>Hours per week</Label><Select defaultValue="24-32"><SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="16-24">16-24</SelectItem><SelectItem value="24-32">24-32</SelectItem><SelectItem value="32-40">32-40</SelectItem></SelectContent></Select></div>
              <div className="grid gap-1.5"><Label>Total required hours</Label><Input type="number" defaultValue="640" className="h-10" /></div>
            </div>
            <div className="grid gap-1.5"><Label>Notes for preceptor</Label><Textarea placeholder="Any special instructions or requirements..." rows={3} /></div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>{isLoading ? <><Loader2 className="size-4 animate-spin" />Sending...</> : <><Send className="size-4" data-icon="inline-start" />Send placement request</>}</Button>
      </div>
    </form>
  );
}
