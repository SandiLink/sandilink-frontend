import {
  LegalContact,
  LegalDocument,
  LegalList,
  LegalListItem,
  LegalPlaceholder,
  LegalSection,
} from "@/components/shared/legal-document";

export const metadata = {
  title: "Provider Agreement — SandiLink",
  description:
    "The agreement between independent providers and One Sandi Platform LLC for the SandiLink marketplace.",
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

export default function ProviderAgreementPage() {
  return (
    <LegalDocument
      title="Provider Agreement"
      intro="Terms governing the relationship between independent Providers and One Sandi Platform LLC on the SandiLink marketplace."
      meta={META}
    >
      <LegalSection number={1} title="Provider Eligibility">
        <p>
          Providers must meet all legal, professional, and licensing
          requirements applicable to the services they offer.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Credential Requirements">
        <p>
          Providers must submit accurate and current credentials and agree to
          update them as needed.
        </p>
        <LegalPlaceholder>
          Backend will define the credential verification workflow and any
          automated checks.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={3} title="Service Delivery Expectations">
        <p>Providers agree to:</p>
        <LegalList>
          <LegalListItem>
            Deliver services professionally, ethically, and in accordance with
            applicable laws
          </LegalListItem>
          <LegalListItem>Maintain clear communication with Clients</LegalListItem>
          <LegalListItem>Respect Client privacy and confidentiality</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection number={4} title="Payment Terms">
        <p>
          Providers will receive payouts through third-party payment
          processors.
        </p>
        <LegalPlaceholder>
          Specific payout schedule, fees, and minimum thresholds will be
          finalized after backend integration and documented here.
        </LegalPlaceholder>
      </LegalSection>

      <LegalSection number={5} title="Dispute Resolution with Clients">
        <p>
          Providers agree to make reasonable efforts to resolve disputes with
          Clients in good faith. The Platform may, but is not obligated to,
          assist in dispute resolution.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Suspension & Removal">
        <p>
          We may suspend or remove Providers who violate this Agreement,
          Platform policies, or applicable laws.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Intellectual Property">
        <p>
          Providers retain ownership of their content but grant the Platform a
          license to host, display, and use such content as necessary to
          operate and promote the Platform.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Liability">
        <p>
          Providers are solely responsible for the services they deliver. One
          Sandi Platform LLC is not liable for Provider actions, omissions, or
          outcomes.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Governing Law">
        <p>This Agreement is governed by the laws of the State of Texas.</p>
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
