import type { Metadata } from "next";
import "../../globals.css";

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
    <div className="bg-gray-50 font-Payda dark:bg-gray-500">{children}</div>
  );
}
