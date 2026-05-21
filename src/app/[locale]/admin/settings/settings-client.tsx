"use client";

import { useState } from "react";

export function SettingsClient() {
  const [settings, setSettings] = useState({
    siteNameEn: "Portfolio",
    siteNameFa: "پورتفولیو",
    siteDescriptionEn: "Full-Stack Developer & DevOps Specialist",
    siteDescriptionFa: "توسعه‌دهنده فول‌استک و متخصص دواپس",
    githubUsername: "",
    email: "",
    linkedinUrl: "",
    xUrl: "",
  });

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Site Identity */}
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

        {/* Social Links */}
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
            className="rounded border border-neon bg-neon/10 px-6 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
