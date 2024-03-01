import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
  title: "Alpha Coffee",
  description: "Generated by Kaveh Pajhouhesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className=" bg-gray-50 font-Payda dark:bg-gray-500">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
