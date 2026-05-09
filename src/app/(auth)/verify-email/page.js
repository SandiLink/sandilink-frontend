import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";
import { logos } from "@/config/theme";

export const metadata = {
  title: "Verify Email — SandiLink",
  description: "Verify your email address to continue",
};

export default async function VerifyEmailPage({ searchParams }) {
  const { email } = await searchParams;
  const t = await getTranslations("auth.verifyEmail");

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}
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
          <VerifyEmailForm email={email} />
        </CardContent>
      </Card>
    </div>
  );
}
