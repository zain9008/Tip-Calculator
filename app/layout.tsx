import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tip Calculator",
  description: "Split the bill, keep the peace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster
          richColors
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#0c1828",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f0f4ff",
            },
          }}
        />
      </body>
    </html>
  );
}
