import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = GeistSans;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bazintelligence.com").replace(
  /\/+$/,
  "",
);
const siteName = "Baz Intelligence";
const siteNameArabic = "باز إنتيليجينس";
const siteTitle = "Baz Intelligence | AI Technologies Lab";
const siteDescription =
  "Baz Intelligence is an AI technologies lab that designs, trains, and deploys advanced AI systems for startups, businesses, and teams.";
const englishPreviewImage = "/Baz Intelligence Prev Eng.png";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: siteName,
      alternateName: siteNameArabic,
      url: siteUrl,
      logo: `${siteUrl}/baz-logoo.png`,
      email: "hi@bazintelligence.com",
      telephone: "+962795874662",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hi@bazintelligence.com",
          availableLanguage: ["English", "Arabic"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: siteName,
      alternateName: siteNameArabic,
      url: siteUrl,
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/ar#webpage`,
      url: `${siteUrl}/ar`,
      name: "باز إنتيليجينس | مختبر تقنيات الذكاء الاصطناعي",
      description:
        "باز إنتيليجينس هو مختبر تقنيات ذكاء اصطناعي يصمم ويدرّب وينشر أنظمة ذكاء اصطناعي متقدمة للشركات والناشئين والمؤسسات.",
      inLanguage: "ar",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/services#webpage`,
      url: `${siteUrl}/services`,
      name: "Services | Baz Intelligence",
      description:
        "Browse Baz Intelligence services across ML models, AI agents, LLM systems, data engineering, automation, and generative AI.",
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/ar/services#webpage`,
      url: `${siteUrl}/ar/services`,
      name: "الخدمات | باز إنتيليجينس",
      description:
        "استكشف خدمات باز إنتيليجينس في نماذج تعلم الآلة ووكلاء الذكاء الاصطناعي وحلول LLM والبيانات والأتمتة والذكاء التوليدي.",
      inLanguage: "ar",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
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
    "باز إنتيليجينس",
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
      en: "/",
      ar: "/ar",
      "x-default": "/",
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
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "technology",
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
