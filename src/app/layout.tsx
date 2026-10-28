import type { Metadata } from "next";
import { EB_Garamond, Jost, Manrope } from "next/font/google";
import { Header } from "@/components/header";
import { ContactBar } from "@/components/contact-bar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

// EB Garamond and Jost match the lettering in the Cozy Corner logo.
const display = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const label = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
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
      className={`${display.variable} ${label.variable} ${body.variable} antialiased`}
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
