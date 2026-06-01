"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export function LoginClient() {
  const t = useTranslations("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("loginError"));
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-carbon px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <span className="font-mono text-3xl text-neon">&gt;_</span>
          <h1 className="mt-2 font-mono text-lg text-text-primary">
            {t("login")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-carbon-border bg-carbon-light px-3 py-2 font-mono text-sm text-text-primary placeholder-text-muted focus:border-neon focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-carbon-border bg-carbon-light px-3 py-2 font-mono text-sm text-text-primary placeholder-text-muted focus:border-neon focus:outline-none"
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon disabled:opacity-50"
          >
            {loading ? t("loggingIn") : t("login")}
          </button>
        </form>
      </div>
    </div>
  );
}
