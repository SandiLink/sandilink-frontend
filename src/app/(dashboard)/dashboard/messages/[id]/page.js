import { getTranslations } from "next-intl/server";
import { MessagesList } from "@/features/service-user/components/messages-list";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function MessageThreadPage({ params }) {
  const { id } = await params;
  const t = await getTranslations("serviceUserPages.messages");
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <MessagesList initialContactId={id} />
    </div>
  );
}
