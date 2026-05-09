import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MfaSetupForm } from "@/features/auth/components/mfa-setup-form";
import { logos } from "@/config/theme";

export const metadata = {
  title: "Two-Factor Authentication — SandiLink",
  description: "Set up two-factor authentication for your account",
};

export default async function MfaSetupPage() {
  const t = await getTranslations("auth.mfaSetup");
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex justify-center lg:hidden">
        <Image
          src={logos.light}
          alt="SandiLink"
          width={180}
          height={50}
          className="object-contain dark:hidden"
          priority
        />
        <Image
          src={logos.dark}
          alt="One Sandi"
          width={180}
          height={50}
          className="hidden object-contain dark:block"
          priority
        />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("pageTitle")}</CardTitle>
          <CardDescription>{t("pageDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <MfaSetupForm />
        </CardContent>
      </Card>
    </div>
  );
}
