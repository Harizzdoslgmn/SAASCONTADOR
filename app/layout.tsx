import type { Metadata } from "next";
import "./globals.css";

const description =
  "Centralize documentos fiscais, XMLs, conferências, declarações e pendências em uma operação mais simples para o seu escritório contábil.";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.nexo.com.br"),
  title: "NEXO | Operação fiscal centralizada para escritórios contábeis",
  description,
  applicationName: "NEXO",
  openGraph: {
    title: "NEXO | Operação fiscal centralizada para escritórios contábeis",
    description,
    locale: "pt_BR",
    type: "website",
    url: "/",
    siteName: "NEXO",
    images: [
      {
        url: "/og-premium.png",
        width: 1200,
        height: 630,
        alt: "NEXO — plataforma de operação fiscal para escritórios contábeis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXO | Operação fiscal centralizada para escritórios contábeis",
    description,
    images: ["/og-premium.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="geist_a71539c9-module__T19VSG__variable antialiased">{children}</body>
    </html>
  );
}
