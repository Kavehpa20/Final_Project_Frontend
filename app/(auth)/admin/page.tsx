"use client";

import dynamic from "next/dynamic";
// import AdminLoginForm from "@/components/forms/AdminLoginForm";
import { DarkThemeToggle } from "flowbite-react";

const AdminLoginForm = dynamic(
  () => import("@/components/forms/AdminLoginForm"),
  {
    ssr: false,
  },
);

export default function Login() {
  return (
    <>
      <div className="absolute left-11 top-5">
        <DarkThemeToggle />
      </div>
      <AdminLoginForm />
    </>
  );
}
