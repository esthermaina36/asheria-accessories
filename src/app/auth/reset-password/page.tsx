"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been updated successfully.");

    setTimeout(() => {
      router.push("/admin/login");
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b52]">
          Asheria Accessories
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#2d2522]">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter your new admin password below.
        </p>

        <form onSubmit={handleUpdatePassword} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#2d2522]">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
              required
              className="w-full rounded-xl border border-[#eaded7] px-4 py-3 outline-none focus:border-[#9b6b52]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#2d2522]">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full rounded-xl border border-[#eaded7] px-4 py-3 outline-none focus:border-[#9b6b52]"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {message && (
            <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#9b6b52] px-6 py-3 font-medium text-white transition hover:bg-[#76503e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}