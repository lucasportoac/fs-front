import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import LayoutWrapper from "../components/LayoutWrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Porto Watches",
  description: "Loja de relógios Porto Watches",
  icons: {
    icon: "/porto_watches_favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <LayoutWrapper>
            <Header />

            <main>{children}</main>

            <Footer />
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}