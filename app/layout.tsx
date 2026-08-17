import type { Metadata } from "next";
import "./globals.css";

const description =
  "Centralize clientes, documentos, pendências e rotinas em uma operação contábil mais clara, organizada e previsível.";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.nexo.com.br"),
  title: "NEXO | Operação contábil com outra clareza",
  description,
  applicationName: "NEXO",
  openGraph: {
    title: "NEXO | Operação contábil com outra clareza",
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
        alt: "NEXO — software operacional para escritórios contábeis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXO | Operação contábil com outra clareza",
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
