import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = GeistSans;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bazintelligence.com").replace(
  /\/+$/,
  "",
);
const siteName = "AI Labs+";
const siteNameArabic = "إي آي لابس+";
const siteTitle = "AI Labs+ | AI Technologies Lab";
const siteDescription =
  "AI Labs+ is an AI technologies lab that designs, trains, and deploys advanced AI systems for startups, businesses, and teams.";
const englishPreviewImage = "/IntEng.png";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: siteName,
      alternateName: siteNameArabic,
      url: siteUrl,
      logo: `${siteUrl}/AI%20Labs%20%2B%20Main.png`,
      email: "hi@intelligence.com",
      telephone: "+962795874662",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hi@intelligence.com",
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
      name: "إي آي لابس+ | مختبر تقنيات ذكاء إصطناعي",
      description:
        "إي آي لابس+ هو مختبر تقنيات ذكاء اصطناعي يصمم ويدرّب وينشر أنظمة ذكاء اصطناعي متقدمة للشركات والناشئين والمؤسسات.",
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
    template: "%s | AI Labs+",
  },
  description: siteDescription,
  applicationName: siteName,
  icons: {
    icon: [{ url: "/Fav%20icon.png", type: "image/png" }],
    shortcut: ["/Fav%20icon.png"],
    apple: [{ url: "/Fav%20icon.png", type: "image/png" }],
  },
  keywords: [
    "AI Labs+",
    "AI Labs Plus",
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
        alt: "AI Labs+ English preview",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('baz-theme');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
