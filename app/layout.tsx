import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXO | Operação fiscal em um só lugar",
  description:
    "Centralize documentos, obrigações, pendências e rotinas fiscais em uma operação contábil mais previsível.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
