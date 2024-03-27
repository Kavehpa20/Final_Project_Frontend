import type { Metadata } from "next";
import "../globals.css";
import FooterComponent from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavbar";
import { AdminPanelProvider } from "@/contexts/AdminPanelContext";
import TabsComponent from "@/components/TabsComponent";
import LogoutModal from "@/components/modals/LogoutModal";
import AddingProductModal from "@/components/modals/addingProductModal/AddingProductModal";
import EditingProductModal from "@/components/modals/editingProductModal/EditingProductModal";

export const metadata: Metadata = {
  title: "پنل مدیریت قهوه آلفا",
  description: "پنل مدیریت فروشگاه اینترنتی قهوه آلفا",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminPanelProvider>
      <div className="bg-gray-50 font-Payda dark:bg-gray-500">
        <AdminNavbar />
        <TabsComponent />
        {children}
        <LogoutModal />
        <AddingProductModal />
        <EditingProductModal />
        <FooterComponent />
      </div>
    </AdminPanelProvider>
  );
}
