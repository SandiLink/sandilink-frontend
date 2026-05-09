import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { logos } from "@/config/theme";

export const metadata = {
  title: "Create Account — SandiLink",
  description: "Create your SandiLink account",
};

export default async function RegisterPage() {
  const t = await getTranslations("auth.register");
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
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
