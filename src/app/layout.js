import { Cormorant_Garamond, Sora } from "next/font/google";
import localFont from "next/font/local";

import Providers from "./providers";
import {
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_TITLE,
  SITE_NAME,
  SITE_URL,
  getStructuredData,
  toJsonLd,
} from "@/lib/seo";
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY, THEME_CYCLE } from "@/constants";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const logoFont = localFont({
  src: "../assets/fonts/Halimun.ttf",
  variable: "--font-logo",
  display: "swap",
});

const heroFont = localFont({
  src: "../assets/fonts/BrushKing-MVVPp.otf",
  variable: "--font-hero",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SEO_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Somyaranjan Sethy", url: SITE_URL }],
  creator: "Somyaranjan Sethy",
  publisher: "Somyaranjan Sethy",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Somyaranjan Sethy portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/opengraph-image"],
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
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#040408" },
  ],
};

const themeInitScript = `
  (function() {
    try {
      var savedTheme = window.localStorage.getItem(${JSON.stringify(
        LOCAL_STORAGE_THEME_KEY,
      )});
      var allowedThemes = ${JSON.stringify(THEME_CYCLE)};

      if (allowedThemes.indexOf(savedTheme) !== -1) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    } catch (error) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${logoFont.variable} ${heroFont.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: toJsonLd(getStructuredData()),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
