import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Masthead } from "@/components/layout/masthead";
import { Footer } from "@/components/layout/footer";
import { QuickAccessBar } from "@/components/layout/quick-access-bar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Hoi An Parish — Diocese of Da Nang",
    template: "%s | Hoi An Parish",
  },
  description:
    "Official website of Hoi An Parish: Mass times, visitor guide and contact information.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Masthead locale="en" />
        <main className="flex-1">{children}</main>
        <Footer />
        <QuickAccessBar />
      </body>
    </html>
  );
}
