import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline} in ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name} is a warm, brick-and-timber celebration hall in ${site.city} for birthdays, baby showers, naming ceremonies, engagements and family gatherings.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col pb-[4.5rem] font-sans md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactBar />
      </body>
    </html>
  );
}
