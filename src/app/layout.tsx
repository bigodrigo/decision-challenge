import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decision Challenge",
  description: "Desafio Dev Jr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center justify-start bg-white">
          <header className="border-b-2 border-qua w-full px-12 md:px-24 pt-10 pb-6 md:pt-16 md:pb-12">
            <Container className="flex items-center justify-center">
              <Image
                src="/logo_decision.png"
                alt="Decision Logo"
                width={240}
                height={100}
                priority
                className="my-4"
              />
            </Container>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
