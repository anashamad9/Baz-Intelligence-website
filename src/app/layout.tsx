import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = GeistSans;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bazintelligence.com";
const siteName = "Baz Intelligence";
const siteTitle = "Baz Intelligence | AI Technologies Lab";
const siteDescription =
  "Baz Intelligence is an AI technologies lab that designs, trains, and deploys advanced AI systems for startups, businesses, and founders.";
const englishPreviewImage = "/Baz Intelligence Prev Eng.png";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      alternateName: "باز إينتيليجنس",
      url: siteUrl,
      logo: `${siteUrl}/baz-logo.png`,
      email: "hi@bazintelligence.com",
      telephone: "+962795874662",
    },
    {
      "@type": "WebSite",
      name: siteName,
      alternateName: "باز إينتيليجنس",
      url: siteUrl,
      inLanguage: ["en", "ar"],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Baz Intelligence",
  },
  description: siteDescription,
  applicationName: siteName,
  icons: {
    icon: [{ url: "/baz-int-fav-icon.png", type: "image/png", sizes: "330x451" }],
    shortcut: ["/baz-int-fav-icon.png"],
    apple: [{ url: "/baz-int-fav-icon-square.png", type: "image/png", sizes: "512x512" }],
  },
  keywords: [
    "Baz Intelligence",
    "باز إينتيليجنس",
    "AI lab",
    "machine learning",
    "LLM solutions",
    "AI agents",
    "automation",
    "Jordan AI company",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["ar_JO"],
    images: [
      {
        url: englishPreviewImage,
        width: 1200,
        height: 630,
        alt: "Baz Intelligence English preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [englishPreviewImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
