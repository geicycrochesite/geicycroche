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
  title: "Geicy Crochê | Crochê com Estilo e Elegância",
  description:
    "Peças em crochê feitas à mão com qualidade e sofisticação. Roupas, acessórios e itens para casa sob encomenda. Atendimento para todo o Brasil.",
  authors: [
    {
      name: "Geicy Crochê",
    },
  ],
  keywords: [
    "crochê artesanal",
    "crochê sob encomenda",
    "roupas de crochê",
    "acessórios de crochê",
    "jogo de banheiro crochê",
    "crochê para casa",
    "artesanato em crochê",
    "crochê personalizado",
    "crochê Brasil",
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
