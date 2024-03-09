import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import FooterComponent from "@/components/Footer";

export const metadata: Metadata = {
  title: "قهوه آلفا",
  description: "خاص ترین فروشگاه قهوه در ایران",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 font-Payda dark:bg-gray-500">
      <Navbar />
      {children}
      <FooterComponent />
    </div>
  );
}
