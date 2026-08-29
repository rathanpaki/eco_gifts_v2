import type { Metadata } from "next";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import "./auth.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AppSplash } from "@/components/features/splash/app-splash";

export const metadata: Metadata = {
  title: "EcoGifts | Thoughtfully crafted gifts",
  description: "Sustainable, personal gifts crafted with care for a better planet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <QueryProvider>
          <AppSplash />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
