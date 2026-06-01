"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const defaultSettings = {
  siteNameEn: "",
  siteNameFa: "",
  siteDescriptionEn: "",
  siteDescriptionFa: "",
  githubUsername: "",
  email: "",
  linkedinUrl: "",
  xUrl: "",
};

export function SettingsClient() {
  const t = useTranslations("admin");
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => setSettings({ ...defaultSettings, ...data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error();
      setMessage({ type: "success", text: t("saved") });
    } catch {
      setMessage({ type: "error", text: t("saveError") });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-carbon-lighter" />
        <div className="h-64 animate-pulse rounded-lg border border-carbon-border bg-carbon-light" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">{t("settings")}</h1>

      {message && (
        <div
          className={`rounded px-4 py-2 font-mono text-xs ${
            message.type === "success"
              ? "border border-neon/30 bg-neon/10 text-neon"
              : "border border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
          <h3 className="font-mono text-sm text-neon">[Site Identity]</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">Site Name (EN)</label>
              <input
                type="text"
                value={settings.siteNameEn}
                onChange={(e) => handleChange("siteNameEn", e.target.value)}
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">Site Name (FA)</label>
              <input
                type="text"
                value={settings.siteNameFa}
                onChange={(e) => handleChange("siteNameFa", e.target.value)}
                dir="rtl"
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">Description (EN)</label>
              <input
                type="text"
                value={settings.siteDescriptionEn}
                onChange={(e) => handleChange("siteDescriptionEn", e.target.value)}
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">Description (FA)</label>
              <input
                type="text"
                value={settings.siteDescriptionFa}
                onChange={(e) => handleChange("siteDescriptionFa", e.target.value)}
                dir="rtl"
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
          <h3 className="font-mono text-sm text-neon-cyan">[Social Links]</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">GitHub Username</label>
              <input
                type="text"
                value={settings.githubUsername}
                onChange={(e) => handleChange("githubUsername", e.target.value)}
                placeholder="your-username"
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedinUrl}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-text-muted">X (Twitter) URL</label>
              <input
                type="url"
                value={settings.xUrl}
                onChange={(e) => handleChange("xUrl", e.target.value)}
                className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded border border-neon bg-neon/10 px-6 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon disabled:opacity-50"
          >
            {saving ? t("saving") : t("saveSettings")}
          </button>
        </div>
      </form>
    </div>
  );
}
