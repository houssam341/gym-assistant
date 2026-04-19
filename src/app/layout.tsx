import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "Gym Assistant",
  description: "Professional bodybuilding and fitness management application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true, 
    statusBarStyle: "default",
    title: "Gym Assistant",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}