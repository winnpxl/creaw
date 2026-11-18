import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creaw — Design & Development",
  description:
    "Creaw is a design and development studio building brands, products and websites.",
  // OS-adaptive favicon; ThemeToggle then points it at the light/dark variant
  // matching the site theme (see syncFavicon).
  icons: { icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }] },
};

// Runs before paint: apply the saved theme, else the OS preference. No flash.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Must be a plain inline script so it runs before first paint (no theme flash).
            React logs a dev-only notice about script tags here; it's harmless. */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
