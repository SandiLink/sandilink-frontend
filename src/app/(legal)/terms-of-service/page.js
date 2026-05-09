import {
  LegalContact,
  LegalDocument,
  LegalList,
  LegalListItem,
  LegalPlaceholder,
  LegalSection,
} from "@/components/shared/legal-document";

export const metadata = {
  title: "Terms of Service — SandiLink",
  description:
    "SandiLink Terms of Service — the agreement between users and One Sandi Platform LLC.",
};

const META = [
  { label: "Effective date", value: "May 12, 2026" },
  { label: "Platform", value: "SandiLink" },
  { label: "Owner", value: "One Sandi Platform LLC" },
  {
    label: "Contact",
    value: "contact@onesandiplatform.com",
    href: "mailto:contact@onesandiplatform.com",
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="The agreement between you and One Sandi Platform LLC when you use the SandiLink marketplace."
      meta={META}
    >
      <LegalSection number={1} title="Introduction">
        <p>
          Welcome to SandiLink (&ldquo;Platform&rdquo;), a digital marketplace
          connecting users seeking healthcare, education, and research-related
          services with independent providers. By accessing or using the
          Platform, you agree to these Terms of Service (&ldquo;Terms&rdquo;).
        </p>
      </LegalSection>

      <LegalSection number={2} title="Definitions">
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground">Client</strong> — A user
            seeking services.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground">Provider</strong> — A user
            offering services.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground">Platform</strong> — SandiLink
            marketplace and related services.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground">We / Us / Our</strong> — One
            Sandi Platform LLC.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={3} title="Eligibility">
        <p>
          Users must be at least 18 years old and legally able to enter into
          contracts.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Account Creation">
        <p>
          Users must create an account and provide accurate information. We
          may suspend or terminate accounts for violations.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Provider Responsibilities">
        <p>Providers agree to:</p>
        <LegalList>
          <LegalListItem>Deliver services professionally and ethically</LegalListItem>
          <LegalListItem>Maintain accurate credentials</LegalListItem>
          <LegalListItem>Comply with all applicable laws and regulations</LegalListItem>
          <LegalListItem>Not misrepresent qualifications or services</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={6} title="Client Responsibilities">
        <p>Clients agree to:</p>
        <LegalList>
          <LegalListItem>Provide accurate information</LegalListItem>
          <LegalListItem>Use the Platform respectfully</LegalListItem>
          <LegalListItem>
            Not misuse, abuse, or attempt to exploit the Platform or Providers
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={7} title="Booking Rules">
        <p>
          Bookings are agreements between Clients and Providers. The Platform
          is not a party to the service contract between them.
        </p>
        <LegalPlaceholder>
          Backend-dependent booking logic (e.g., automated confirmations,
          rescheduling rules) will be inserted here once the booking engine is
          finalized.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={8} title="Payment Terms">
        <p>
          Payments are processed through third-party payment processors on
          behalf of Providers.
        </p>
        <LegalPlaceholder>
          Detailed payment flow, fees, and payout schedule will be finalized
          after backend integration with Stripe / Paystack or other
          processors.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={9} title="Cancellations & Refunds">
        <p>
          Cancellation and refund rules may depend on Provider policies and
          Platform rules.
        </p>
        <LegalPlaceholder>
          Automated cancellation windows, refund logic, and fee handling will
          be added after backend development.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={10} title="Prohibited Activities">
        <p>Users may not:</p>
        <LegalList>
          <LegalListItem>Engage in fraud or misrepresentation</LegalListItem>
          <LegalListItem>Harass, threaten, or harm others</LegalListItem>
          <LegalListItem>
            Upload or transmit harmful, illegal, or infringing content
          </LegalListItem>
          <LegalListItem>
            Attempt to bypass the Platform or interfere with its operation
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={11} title="Intellectual Property">
        <p>
          All Platform content, branding, and design are owned by One Sandi
          Platform LLC or its licensors. Users retain ownership of their
          uploaded content but grant us a non-exclusive, worldwide license to
          host, display, and use such content as needed to operate the
          Platform.
        </p>
      </LegalSection>

      <LegalSection number={12} title="No Medical Advice Disclaimer">
        <p>
          SandiLink does not provide medical advice, diagnosis, or treatment.
          Any healthcare-related information or services are provided solely by
          independent Providers. The Platform does not replace professional
          medical judgment.
        </p>
      </LegalSection>

      <LegalSection number={13} title="No Employment Relationship">
        <p>
          Providers are independent contractors. Nothing in these Terms creates
          an employment, partnership, joint venture, or agency relationship
          between Providers and One Sandi Platform LLC.
        </p>
      </LegalSection>

      <LegalSection number={14} title="Limitation of Liability">
        <p>To the maximum extent permitted by law, we are not liable for:</p>
        <LegalList>
          <LegalListItem>Provider actions or omissions</LegalListItem>
          <LegalListItem>Service outcomes or quality</LegalListItem>
          <LegalListItem>User interactions on or off the Platform</LegalListItem>
          <LegalListItem>
            Data loss, security incidents, or unauthorized access
          </LegalListItem>
          <LegalListItem>Platform downtime or technical issues</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={15} title="Indemnification">
        <p>
          Users agree to indemnify and hold harmless One Sandi Platform LLC
          from any claims, damages, or losses arising from their use of the
          Platform, violation of these Terms, or infringement of any rights of
          a third party.
        </p>
      </LegalSection>

      <LegalSection number={16} title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Texas, without
          regard to conflict of law principles.
        </p>
      </LegalSection>

      <LegalSection number={17} title="Dispute Resolution">
        <p>
          Any dispute arising out of or relating to these Terms or the Platform
          will be resolved through binding arbitration in Harris County, Texas,
          except where prohibited by law.
        </p>
      </LegalSection>

      <LegalSection number={18} title="Contact Information">
        <LegalContact
          address="5900 Balcones Drive, Ste 100, Austin, Travis County, TX 78731, USA"
          email="contact@onesandiplatform.com"
        />
      </LegalSection>
    </LegalDocument>
  );
}
