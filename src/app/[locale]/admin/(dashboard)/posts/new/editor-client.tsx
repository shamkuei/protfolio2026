"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

interface PostEditorProps {
  post: {
    id: string;
    titleEn: string;
    titleFa: string;
    slug: string;
    contentEn: string;
    contentFa: string;
    excerptEn: string;
    excerptFa: string;
    status: string;
  } | null;
}

export function PostEditorClient({ post }: PostEditorProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEditing = !!post;

  const [form, setForm] = useState({
    titleEn: post?.titleEn || "",
    titleFa: post?.titleFa || "",
    slug: post?.slug || "",
    excerptEn: post?.excerptEn || "",
    excerptFa: post?.excerptFa || "",
    contentEn: post?.contentEn || "",
    contentFa: post?.contentFa || "",
    status: post?.status || "DRAFT",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const slug = form.slug || slugify(form.titleEn);
    const body = { ...form, slug };

    try {
      const res = await fetch(
        isEditing ? `/api/posts/${post!.id}` : "/api/posts",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("saveError"));
      }

      router.push("/admin/posts");
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
          {isEditing ? t("editPost") : t("newPost")}
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
        <h3 className="font-mono text-sm text-neon">[English]</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Title (EN)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="auto-generated from title"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">Excerpt (EN)</label>
          <textarea
            value={form.excerptEn}
            onChange={(e) => handleChange("excerptEn", e.target.value)}
            rows={2}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">Content (EN) — Markdown/MDX</label>
          <textarea
            value={form.contentEn}
            onChange={(e) => handleChange("contentEn", e.target.value)}
            rows={12}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4" dir="rtl">
        <h3 className="font-mono text-sm text-neon-cyan">[فارسی]</h3>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">عنوان (FA)</label>
          <input
            type="text"
            value={form.titleFa}
            onChange={(e) => handleChange("titleFa", e.target.value)}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">خلاصه (FA)</label>
          <textarea
            value={form.excerptFa}
            onChange={(e) => handleChange("excerptFa", e.target.value)}
            rows={2}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">محتوا (FA) — Markdown/MDX</label>
          <textarea
            value={form.contentFa}
            onChange={(e) => handleChange("contentFa", e.target.value)}
            rows={12}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-4">
        <label className="mb-2 block font-mono text-xs text-text-muted">Status</label>
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
      </div>
    </form>
  );
}
