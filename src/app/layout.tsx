import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Bungalov Kiralama",
  description: "Özel havuzlu, doğa içindeki premium bungalovları keşfedin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
