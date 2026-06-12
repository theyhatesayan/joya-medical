"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  async function forgotPassword() {
    if (!email) {
      alert("Enter Email First");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/admin/change-password",
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password Reset Email Sent ✅");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-black text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-teal-700 text-white py-4 rounded-xl font-bold"
        >
          Login
        </button>

        <button
          onClick={forgotPassword}
          className="w-full mt-3 text-blue-600 font-semibold"
        >
          Forgot Password?
        </button>

      </div>
    </div>
  );
}