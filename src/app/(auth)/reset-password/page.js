import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { logos } from "@/config/theme";

export const metadata = {
  title: "Reset Password — SandiLink",
  description: "Set a new password for your SandiLink account",
};

export default async function ResetPasswordPage() {
  const t = await getTranslations("auth.resetPassword");
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
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
