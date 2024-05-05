import type { Metadata } from "next";
import "../globals.css";
import { AdminPanelProvider } from "@/contexts/AdminPanelContext";

export const metadata: Metadata = {
  title: "پنل مدیریت قهوه آلفا",
  description: "پنل مدیریت فروشگاه اینترنتی قهوه آلفا",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminPanelProvider>{children}</AdminPanelProvider>;
}
