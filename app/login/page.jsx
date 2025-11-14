import React from "react";
import LoginPage from "@/components/login/Login";

export const metadata = {
  title: "Login - Sales CRM",
  description: "Sign in to your account",
};

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginPage />
    </div>
  );
}
