"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b52]">
            Asheria Accessories
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#2d2522]">
            Admin Login
          </h1>

          <p className="mt-2 text-gray-600">
            Sign in to manage your store.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#2d2522]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#2d2522]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-[#ded2cb] px-4 py-3 outline-none transition focus:border-[#9b6b52]"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#9b6b52] px-6 py-3 font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#9b6b52]"
          >
            ← Back to Asheria
          </a>
        </div>
      </div>
    </main>
  );
}