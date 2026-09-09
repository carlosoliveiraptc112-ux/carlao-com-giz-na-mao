import "./globals.css";

export const metadata = {
  title: "Carlão com Giz na Mão",
  description: "Seu professor de Matemática, sempre por perto.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d5c46",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
