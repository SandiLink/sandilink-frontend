import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { logos } from "@/config/theme";

export default async function AuthLayout({ children }) {
  const t = await getTranslations("auth.shared");

  return (
    <div className="flex min-h-full flex-1">
      {/* Left panel — branding */}
      <div className="hidden flex-1 flex-col items-center justify-center gap-8 bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 lg:flex">
        <Image
          src={logos.light}
          alt="SandiLink"
          width={280}
          height={80}
          className="object-contain dark:hidden"
          priority
        />
        <Image
          src={logos.dark}
          alt="One Sandi"
          width={280}
          height={80}
          className="hidden object-contain dark:block"
          priority
        />
        <p className="max-w-sm text-center text-muted-foreground">
          {t("sidePanelTagline")}
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
