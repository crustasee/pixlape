"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("✕✕✕ BAD USER CREDENTIALS ✕✕✕");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat otentikasi");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soft-linen p-4 font-mono admin-grid-bg">
      <div className="max-w-md w-full bg-yellow-green text-darkteal border-1 border-border-color rounded-2xl p-6 sm:p-8 shadow-hard-lg relative overflow-hidden">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-xl bg-white border-2 border-border-color flex items-center justify-center p-1 mb-3 shadow-hard-sm">
            <Image
              src="/logo1.svg"
              alt="PIXLApe Logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-head font-black tracking-tight text-darkteal uppercase">
            +++++ADMIN++DASHBOARD++++++
          </h1>
          <p className="text-xs font-mono font-bold text-darkteal mt-1">
            ADMININISTRATOR ENTRY GATEWAY NOT FOR PUBLIC
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-cayenne text-white p-3 rounded-xl border-2 border-border-color text-xs font-mono font-bold text-center shadow-hard-sm animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-mono font-black uppercase text-white mb-1.5">
              ●●● Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-yellow-100 text-evergreen border-2 border-border-color rounded-xl font-mono text-sm placeholder-white/40 focus:outline-none focus:bg-cayenne focus:text-black transition-colors"
              placeholder="admin@store.com"
            />
          </div>

          <div>
            <label className="block text-sm font-mono font-black uppercase text-white mb-1.5">
              ●●● Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-yellow-100 text-darkteal border-2 border-border-color rounded-xl font-mono text-sm placeholder-white/40 focus:outline-none focus:bg-cayenne focus:text-black transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-cayenne text-white border-2 border-border-color rounded-xl font-mono font-black text-sm uppercase shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "LOADING ●●●●●○○○○" : "ENTER ▶▶"}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t-2 border-white/20 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-darkteal hover:underline"
          >
            <span>← BACK TO PUBLIC SITE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}