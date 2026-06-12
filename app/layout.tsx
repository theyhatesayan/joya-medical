import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "JOYA Medical & General Store | Veterinary Medicines & Animal Healthcare",

  description:
    "Buy genuine veterinary medicines, feed supplements, animal healthcare products, calcium, dewormers and livestock medicines from JOYA Medical & General Store, Niwali.",

  keywords: [
    "Veterinary Medicines",
    "Animal Healthcare",
    "Feed Supplements",
    "Cattle Medicine",
    "Goat Medicine",
    "Livestock Products",
    "JOYA Medical",
    "Niwali Veterinary Store",
    "Veterinary Store MP",
  ],

  openGraph: {
    title: "JOYA Medical & General Store",
    description:
      "Trusted Veterinary Medicines & Animal Healthcare Products in Niwali.",
    siteName: "JOYA Medical & General Store",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
