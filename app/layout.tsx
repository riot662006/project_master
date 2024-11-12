import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Providers";

export const metadata: Metadata = {
  title: "Project Master",
  description: "Project Manangement Software",
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <div className="v-screen poppins flex h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
