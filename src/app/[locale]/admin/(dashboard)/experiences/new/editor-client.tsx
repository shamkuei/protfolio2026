"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ExperienceEditorProps {
  experience: {
    id: string;
    type: string;
    titleEn: string;
    titleFa: string;
    companyEn: string;
    companyFa: string;
    locationEn: string;
    locationFa: string;
    descriptionEn: string;
    descriptionFa: string;
    startDate: string;
    endDate: string;
    url: string;
    order: number;
  } | null;
}

const TYPES = ["WORK", "EDUCATION", "CERTIFICATION"];

export function ExperienceEditorClient({ experience }: ExperienceEditorProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEditing = !!experience;

  const [form, setForm] = useState({
    type: experience?.type || "WORK",
    titleEn: experience?.titleEn || "",
    titleFa: experience?.titleFa || "",
    companyEn: experience?.companyEn || "",
    companyFa: experience?.companyFa || "",
    locationEn: experience?.locationEn || "",
    locationFa: experience?.locationFa || "",
    descriptionEn: experience?.descriptionEn || "",
    descriptionFa: experience?.descriptionFa || "",
    startDate: experience?.startDate ? experience.startDate.split("T")[0] : "",
    endDate: experience?.endDate ? experience.endDate.split("T")[0] : "",
    url: experience?.url || "",
    order: experience?.order || 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        isEditing ? `/api/experiences/${experience!.id}` : "/api/experiences",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("saveError"));
      }

      router.push("/admin/experiences");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">
          {isEditing ? t("editExperience") : t("newExperience")}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-carbon-border px-4 py-2 font-mono text-sm text-text-muted"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon disabled:opacity-50"
          >
            {submitting ? t("saving") : t("save")}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon">[Details]</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("type")}</label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            >
              {TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("order")}</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("url")}</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => handleChange("url", e.target.value)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("startDate")}</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("endDate")}</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              placeholder="Leave empty for present"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon">[English]</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Title (EN)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              required
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("company")} (EN)</label>
            <input
              type="text"
              value={form.companyEn}
              onChange={(e) => handleChange("companyEn", e.target.value)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">{t("location")} (EN)</label>
          <input
            type="text"
            value={form.locationEn}
            onChange={(e) => handleChange("locationEn", e.target.value)}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">{t("description")} (EN)</label>
          <textarea
            value={form.descriptionEn}
            onChange={(e) => handleChange("descriptionEn", e.target.value)}
            rows={4}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4" dir="rtl">
        <h3 className="font-mono text-sm text-neon-cyan">[فارسی]</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">عنوان (FA)</label>
            <input
              type="text"
              value={form.titleFa}
              onChange={(e) => handleChange("titleFa", e.target.value)}
              required
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">شرکت (FA)</label>
            <input
              type="text"
              value={form.companyFa}
              onChange={(e) => handleChange("companyFa", e.target.value)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">موقعیت (FA)</label>
          <input
            type="text"
            value={form.locationFa}
            onChange={(e) => handleChange("locationFa", e.target.value)}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">توضیحات (FA)</label>
          <textarea
            value={form.descriptionFa}
            onChange={(e) => handleChange("descriptionFa", e.target.value)}
            rows={4}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
