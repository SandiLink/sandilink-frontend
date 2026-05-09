import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";
import { logos } from "@/config/theme";

export const metadata = {
  title: "Sign In — SandiLink",
  description: "Sign in to your SandiLink account",
};

export default async function LoginPage() {
  const t = await getTranslations("auth.login");
  return (
    <div className="w-full max-w-md">
      {/* Mobile logo — hidden on lg where the side panel shows it */}
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
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
