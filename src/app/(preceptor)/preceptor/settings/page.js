import { PreceptorSettings } from "@/features/preceptor/components/preceptor-settings";
export const metadata = { title: "Settings — SandiLink" };
export default function SettingsPage() { return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Settings</h2><p className="text-sm text-muted-foreground">Manage your account security and notifications.</p></div><PreceptorSettings /></div>); }
