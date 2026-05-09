import {
  LegalDocument,
  LegalList,
  LegalListItem,
  LegalSection,
} from "@/components/shared/legal-document";

export const metadata = {
  title: "Cookie Policy — SandiLink",
  description:
    "How SandiLink uses cookies and similar technologies, and how you can manage your preferences.",
};

const META = [
  { label: "Effective date", value: "May 12, 2026" },
  { label: "Platform", value: "SandiLink" },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      intro="What cookies we use, why we use them, and how you can manage them."
      meta={META}
    >
      <LegalSection number={1} title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device to help websites
          function and improve user experience.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Types of Cookies We Use">
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground">Essential cookies</strong> — for
            login and core functionality
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground">Performance & analytics</strong>{" "}
            — to understand usage
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground">Functionality</strong> — to
            remember preferences
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={3} title="Why We Use Cookies">
        <p>We use cookies to:</p>
        <LegalList>
          <LegalListItem>Keep you signed in</LegalListItem>
          <LegalListItem>Improve Platform performance</LegalListItem>
          <LegalListItem>Analyze usage and trends</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={4} title="Managing Cookies">
        <p>
          You can manage or disable cookies through your browser settings. Some
          features of the Platform may not work properly if cookies are
          disabled.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Contact Information">
        <p>
          For questions about this Cookie Policy, contact us at{" "}
          <a
            href="mailto:contact@onesandiplatform.com"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            contact@onesandiplatform.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
