"use client";
import AdminLoginForm from "@/components/forms/AdminLoginForm";
import { getToken } from "@/libs/tokenManager";
import { DarkThemeToggle } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const token = getToken();
  const refreshToken = getToken("refresh_token");

  // if (token && refreshToken) router.push("admin/admin_panel");

  return (
    <>
      <div className="absolute left-11 top-5">
        <DarkThemeToggle />
      </div>
      <AdminLoginForm />
    </>
  );
}
