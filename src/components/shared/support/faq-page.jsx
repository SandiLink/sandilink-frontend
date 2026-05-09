import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  Settings,
  Shield,
  UserCog,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_CATEGORIES = [
  { id: "getting-started", label: "Getting Started", icon: BookOpen },
  { id: "account", label: "Account", icon: UserCog },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "placements", label: "Placements", icon: Settings },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "troubleshooting", label: "Troubleshooting", icon: Wrench },
];

const FAQS = [
  {
    category: "getting-started",
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button on the homepage and choose your role (student, preceptor, institution, or care provider). Fill in your details, verify your email address, and complete your profile to get started.",
  },
  {
    category: "getting-started",
    question: "What documents do I need to complete my profile?",
    answer:
      "Requirements vary by role. Students typically need proof of enrollment, a valid ID, and any required certifications. Preceptors need professional licenses and credentials. You'll see specific requirements during the profile setup process.",
  },
  {
    category: "getting-started",
    question: "How long does account verification take?",
    answer:
      "Email verification is instant. Profile and credential verification typically takes 1–3 business days. You'll receive an email notification once your account has been fully verified.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot Password.' Enter your email address and we'll send you a reset link. The link expires after 24 hours. If you don't receive it, check your spam folder or contact support.",
  },
  {
    category: "account",
    question: "Can I change my account role?",
    answer:
      "Account roles cannot be changed after registration. If you need a different role, please contact support and we'll help you set up a new account with the correct role.",
  },
  {
    category: "account",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Settings > Security and toggle on Two-Factor Authentication. You can use an authenticator app or receive codes via SMS. We strongly recommend enabling 2FA for account security.",
  },
  {
    category: "billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as ACH bank transfers for US-based accounts. All payments are processed securely through our payment provider.",
  },
  {
    category: "billing",
    question: "How do I cancel my subscription?",
    answer:
      "Go to Settings > Subscription and click 'Cancel Subscription.' Your access will continue until the end of your current billing period. You can reactivate at any time without losing your data.",
  },
  {
    category: "billing",
    question: "Can I get a refund?",
    answer:
      "We offer refunds within 14 days of purchase if you haven't used the platform's matching services. After that period, partial refunds may be available on a case-by-case basis. Contact support to discuss your situation.",
  },
  {
    category: "placements",
    question: "How does the matching algorithm work?",
    answer:
      "Our matching algorithm considers specialty preferences, geographic location, schedule availability, learning objectives, and preceptor expertise. You can adjust your preferences in your profile to refine matches.",
  },
  {
    category: "placements",
    question: "How long does it take to get matched?",
    answer:
      "Most students receive initial matches within 5–7 business days after completing their profile and preferences. Matching times may vary based on specialty, location, and availability.",
  },
  {
    category: "placements",
    question: "Can I request a specific preceptor?",
    answer:
      "Yes. If you know a preceptor on the platform, you can send a direct placement request from their profile page. The preceptor will need to accept the request for the match to be confirmed.",
  },
  {
    category: "privacy",
    question: "Is my personal health information (PHI) protected?",
    answer:
      "Yes. We are fully HIPAA-compliant and use end-to-end encryption for all sensitive data. PHI is only accessible to authorized parties involved in your care or placement. Admin users cannot view PHI.",
  },
  {
    category: "privacy",
    question: "Who can see my profile information?",
    answer:
      "Your public profile (name, specialty, general availability) is visible to potential matches. Sensitive details like contact info and documents are only shared after a placement is confirmed. You can control visibility in your privacy settings.",
  },
  {
    category: "troubleshooting",
    question: "I'm not receiving email notifications.",
    answer:
      "First, check your spam or junk folder. Then verify your email address in Settings > Profile. Make sure notifications are enabled in Settings > Notifications. If the issue persists, contact support.",
  },
  {
    category: "troubleshooting",
    question: "The page isn't loading correctly.",
    answer:
      "Try clearing your browser cache and cookies, then refresh the page. Make sure you're using a supported browser (Chrome, Firefox, Safari, or Edge). If the issue continues, try disabling browser extensions or contact support.",
  },
  {
    category: "troubleshooting",
    question: "I can't upload my documents.",
    answer:
      "Ensure your files are in a supported format (PDF, JPG, PNG) and under 10MB each. If you're on a slow connection, try uploading one file at a time. Contact support if you continue to experience issues.",
  },
];

export function FaqPage() {
  const grouped = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: FAQS.filter((f) => f.category === cat.id),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground">
          Quick answers to the most common questions about our platform.
        </p>
      </div>

      {grouped.map((group) => (
        <div key={group.id} className="grid gap-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <group.icon className="size-4" />
            </div>
            <h3 className="font-heading text-base font-semibold">
              {group.label}
            </h3>
            <Badge variant="outline" className="text-[10px]">
              {group.items.length}
            </Badge>
          </div>

          <Card>
            <CardContent className="pt-2">
              <Accordion type="multiple" className="w-full">
                {group.items.map((faq, i) => (
                  <AccordionItem
                    key={`${group.id}-${i}`}
                    value={`${group.id}-${i}`}
                  >
                    <AccordionTrigger className="text-left text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      ))}

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center py-6 text-center sm:flex-row sm:text-left sm:justify-between">
          <div>
            <p className="text-sm font-medium">Still have questions?</p>
            <p className="text-sm text-muted-foreground">
              Our support team is ready to help you out.
            </p>
          </div>
          <Button size="sm" className="mt-3 sm:mt-0" asChild>
            <Link href="/support">Contact Support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
