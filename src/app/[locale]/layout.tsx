import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Lora, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Masthead } from "@/components/layout/masthead";
import { Footer } from "@/components/layout/footer";
import { QuickAccessBar } from "@/components/layout/quick-access-bar";
import { isLocale, SUPPORTED_LOCALES } from "@/lib/i18n/config";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "vietnamese"], weight: ["400", "600", "700", "900"], style: ["normal", "italic"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin", "vietnamese"], weight: ["400", "600"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "vietnamese"], weight: ["400", "500"] });

export const metadata: Metadata = { metadataBase: new URL("https://giaoxuhoian.vn") };
export const generateStaticParams = () => SUPPORTED_LOCALES.map((locale) => ({ locale }));

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  return (
    <html lang="vi" className={`${playfair.variable} ${lora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Masthead />
        <main className="flex-1">{children}</main>
        <Footer />
        <QuickAccessBar />
      </body>
    </html>
  );
}
