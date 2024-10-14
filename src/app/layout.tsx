import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { IBM_Plex_Sans } from "next/font/google";

const inter = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: " %s | JobHunt",
    absolute: "JobHunt"
  },
  description: "Get Your first job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} flex min-h-screen min-w-[350px] flex-col `}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className="flex-grow">{children}</main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
