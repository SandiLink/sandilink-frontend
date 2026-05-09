import { getTranslations } from "next-intl/server";
import { PaymentHistory } from "@/features/service-user/components/payment-history";

export const metadata = {
  title: "Payment History — SandiLink",
  description: "View your payment history and invoices",
};

export default async function PaymentsPage() {
  const t = await getTranslations("serviceUserPages.payments");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>

      <PaymentHistory />
    </div>
  );
}
