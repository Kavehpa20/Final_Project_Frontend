import AdminLoginForm from "@/components/forms/AdminLoginForm";
import { DarkThemeToggle } from "flowbite-react";

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
