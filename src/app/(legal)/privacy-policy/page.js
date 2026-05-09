import {
  LegalContact,
  LegalDocument,
  LegalList,
  LegalListItem,
  LegalPlaceholder,
  LegalSection,
} from "@/components/shared/legal-document";

export const metadata = {
  title: "Privacy Policy — SandiLink",
  description:
    "How One Sandi Platform LLC collects, uses, and protects information on the SandiLink marketplace.",
};

const META = [
  { label: "Effective date", value: "May 12, 2026" },
  { label: "Owner", value: "One Sandi Platform LLC" },
  { label: "Platform", value: "SandiLink" },
  {
    label: "Contact",
    value: "contact@onesandiplatform.com",
    href: "mailto:contact@onesandiplatform.com",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="How we collect, use, store, and protect your information when you use the SandiLink marketplace."
      meta={META}
    >
      <LegalSection number={1} title="Information We Collect">
        <p>We may collect:</p>
        <LegalList>
          <LegalListItem>Account and profile information</LegalListItem>
          <LegalListItem>Service listings and related content</LegalListItem>
          <LegalListItem>Communications and messages</LegalListItem>
          <LegalListItem>Usage data (pages visited, actions taken)</LegalListItem>
          <LegalListItem>Technical data (IP address, device, browser)</LegalListItem>
          <LegalListItem>Cookies and similar technologies</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={2} title="How We Collect Information">
        <LegalList>
          <LegalListItem>
            Directly from users when they create accounts, update profiles, or
            communicate
          </LegalListItem>
          <LegalListItem>
            Automatically through cookies and analytics tools
          </LegalListItem>
          <LegalListItem>
            Through third-party integrations (e.g., payment processors, email
            services)
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={3} title="How We Use Information">
        <p>We use information to:</p>
        <LegalList>
          <LegalListItem>Operate and maintain the Platform</LegalListItem>
          <LegalListItem>Facilitate bookings and interactions</LegalListItem>
          <LegalListItem>Improve user experience and features</LegalListItem>
          <LegalListItem>
            Communicate with users about their accounts and services
          </LegalListItem>
          <LegalListItem>Comply with legal obligations</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={4} title="Data Storage & Security">
        <p>
          We use reasonable technical and organizational measures to protect
          information.
        </p>
        <LegalPlaceholder>
          Backend implementation will determine exact storage locations,
          encryption standards, and retention periods, which will be documented
          here.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={5} title="Third-Party Services">
        <p>We may use third-party services such as:</p>
        <LegalList>
          <LegalListItem>Payment processors (e.g., Stripe, Paystack)</LegalListItem>
          <LegalListItem>Email and notification providers</LegalListItem>
          <LegalListItem>Analytics tools</LegalListItem>
        </LegalList>
        <p>These providers have their own privacy policies.</p>
      </LegalSection>

      <LegalSection number={6} title="Cookies">
        <p>
          We use cookies and similar technologies for authentication, security,
          analytics, and performance. Users may adjust browser settings to
          limit cookies, but some features may not function properly. See our{" "}
          <a
            href="/cookie-policy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Cookie Policy
          </a>{" "}
          for details.
        </p>
      </LegalSection>

      <LegalSection number={7} title="User Rights">
        <p>Subject to applicable law, users may request:</p>
        <LegalList>
          <LegalListItem>Access to their personal data</LegalListItem>
          <LegalListItem>Correction of inaccurate data</LegalListItem>
          <LegalListItem>Deletion of certain data</LegalListItem>
        </LegalList>
        <p>
          Requests can be submitted to{" "}
          <a
            href="mailto:contact@onesandiplatform.com"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            contact@onesandiplatform.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number={8} title="Children's Privacy">
        <p>
          The Platform is not intended for children under 18. We do not
          knowingly collect data from children under 18.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted with an updated Effective Date.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Contact Information">
        <LegalContact
          address="5900 Balcones Drive, Ste 100, Austin, Travis County, TX 78731, USA"
          email="contact@onesandiplatform.com"
        />
      </LegalSection>
    </LegalDocument>
  );
}
