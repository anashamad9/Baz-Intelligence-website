import type { Metadata } from "next";
import Home from "../(marketing)/(home)/page";

const siteName = "باز إينتيليجنس";
const siteTitle = "باز إينتيليجنس | مختبر تقنيات الذكاء الاصطناعي";
const siteDescription =
  "باز إينتيليجنس هو مختبر تقنيات ذكاء اصطناعي يصمم ويدرّب وينشر أنظمة ذكاء اصطناعي متقدمة للشركات والناشئين والمؤسسين.";
const previewImage = "/Baz Intelligence Prev Ara.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    url: "/ar",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "ar_JO",
    alternateLocale: ["en_US"],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Baz Intelligence Arabic preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
};

export default function ArabicPage() {
  return <Home initialLanguage="ar" />;
}
