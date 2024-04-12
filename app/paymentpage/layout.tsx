import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "صفحه پرداخت سفارش",
  description: "پرداخت اینترنتی",
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
