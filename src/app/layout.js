import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { getLocaleConfig } from "@/i18n/config";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: "SandiLink",
  description: "Connecting healthcare professionals, students, and institutions",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const { dir } = getLocaleConfig(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${sora.variable} h-full scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
