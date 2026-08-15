import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afzal Ahmad AI HQ",
  description: "Afzal Ahmad's Personal AI Headquarters",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
