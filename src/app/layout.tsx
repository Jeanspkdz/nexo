import type { Metadata } from "next";
import "./styles.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "Nexo | Organiza tu evento con claridad",
  description: "Descubre proveedores, compara cotizaciones y organiza los contratos y pagos de tu evento desde un solo lugar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
