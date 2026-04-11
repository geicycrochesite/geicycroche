import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from '@/context/CartContext';
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import CategoriasMenu from "@/components/CategoriasMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artesanaio | Artesanato feito à mão",
  description:
    "Pulseiras de miçanga, macramê artesanal e acessórios feitos à mão. Peças artesanais exclusivas e presentes criativos.",
  authors: [
    {
      name: "Artesanaio",
      url: "https://artesanaio.com.br",
    },
  ],
  keywords: [
    "artesanato feito à mão",
    "pulseiras de miçanga",
    "macramê artesanal",
    "acessórios artesanais",
    "presentes artesanais",
    "artesanato personalizado",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
         <CartProvider>
          
          <CategoriasMenu />
          {children}
          
          </CartProvider>
      </body>
    </html>
  );
}
