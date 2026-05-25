import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopNav from "@/components/layout/top-nav";
import AuthWrapper from "@/components/layout/auth-wrapper";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TheERP - Enterprise Suite",
  description: "Next-generation Enterprise Resource Planning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans scroll-smooth", inter.variable)}>
      <body className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 font-sans antialiased text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthWrapper>
            <div className="flex flex-col min-h-screen">
              {/* Sticky Top-Nav Bar */}
              <TopNav />
              
              {/* Main Content */}
              <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
                <div className="fade-in">
                  {children}
                </div>
              </main>
            </div>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
