import { PreceptorSchedule } from "@/features/preceptor/components/preceptor-schedule";
export const metadata = { title: "Schedule — SandiLink" };
export default function SchedulePage() { return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Availability Calendar</h2><p className="text-sm text-muted-foreground">Manage when students can schedule rotations.</p></div><PreceptorSchedule /></div>); }
