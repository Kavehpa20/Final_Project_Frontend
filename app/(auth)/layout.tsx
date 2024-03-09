import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Alpha Coffee",
  description: "Generated by Kaveh Pajhouhesh",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 font-Payda dark:bg-gray-500">{children}</div>
  );
}
