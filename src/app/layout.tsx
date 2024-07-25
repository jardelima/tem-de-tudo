import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
    title: "Tem de Tudo",
    description: "Aplicativo tem de tudo"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <html lang="pt-br">
                <body className={montserrat.className}>{children}</body>
            </html>
        </Providers>
    );
}
