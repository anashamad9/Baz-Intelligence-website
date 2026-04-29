import type { Metadata } from "next";
import Home from "../(marketing)/(home)/page";

const siteName = "AI Labs+";
const siteTitle = "AI Labs+ | AI Technologies Lab";
const siteDescription =
  "AI Labs+ is an AI technologies lab that designs, trains, and deploys advanced AI systems for startups, businesses, and teams.";
const previewImage = "/IntEng.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
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
        url: previewImage,
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
    images: [previewImage],
  },
};

export default function EnglishPage() {
  return <Home initialLanguage="en" />;
}
