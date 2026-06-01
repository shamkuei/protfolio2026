"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { slugify } from "@/lib/utils";

interface ProjectEditorProps {
  project: {
    id: string;
    titleEn: string;
    titleFa: string;
    slug: string;
    descriptionEn: string;
    descriptionFa: string;
    repoUrl: string;
    liveUrl: string;
    status: string;
    techStack: string[];
  } | null;
}

export function ProjectEditorClient({ project }: ProjectEditorProps) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEditing = !!project;

  const [form, setForm] = useState({
    titleEn: project?.titleEn || "",
    titleFa: project?.titleFa || "",
    slug: project?.slug || "",
    descriptionEn: project?.descriptionEn || "",
    descriptionFa: project?.descriptionFa || "",
    repoUrl: project?.repoUrl || "",
    liveUrl: project?.liveUrl || "",
    status: project?.status || "ACTIVE",
    techStack: project?.techStack || [],
    newTech: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTech = () => {
    if (form.newTech.trim()) {
      setForm((prev) => ({
        ...prev,
        techStack: [...prev.techStack, prev.newTech.trim()],
        newTech: "",
      }));
    }
  };

  const removeTech = (index: number) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const slug = form.slug || slugify(form.titleEn);
    const { newTech: _nt, ...body } = form;
    const payload = { ...body, slug };

    try {
      const res = await fetch(
        isEditing ? `/api/projects/${project!.id}` : "/api/projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("saveError"));
      }

      router.push("/admin/projects");
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
          {isEditing ? t("editProject") : t("newProject")}
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
            className="rounded border border-neon-cyan bg-neon-cyan/10 px-4 py-2 font-mono text-sm text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-carbon disabled:opacity-50"
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
          <label className="mb-1 block font-mono text-xs text-text-muted">Description (EN)</label>
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
          <label className="mb-1 block font-mono text-xs text-text-muted">توضیحات (FA)</label>
          <textarea
            value={form.descriptionFa}
            onChange={(e) => handleChange("descriptionFa", e.target.value)}
            rows={4}
            className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon">[Links & Status]</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Repo URL</label>
            <input
              type="url"
              value={form.repoUrl}
              onChange={(e) => handleChange("repoUrl", e.target.value)}
              placeholder="https://github.com/user/repo"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Live URL</label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => handleChange("liveUrl", e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-text-muted">Status</label>
          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="FEATURED">FEATURED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon-cyan">[Tech Stack]</h3>
        <div className="flex flex-wrap gap-2">
          {form.techStack.map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded border border-carbon-border bg-carbon px-3 py-1 font-mono text-xs text-text-secondary"
            >
              {tech}
              <button type="button" onClick={() => removeTech(i)}>
                <HiOutlineTrash size={12} className="text-text-muted hover:text-red-400" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.newTech}
            onChange={(e) => setForm((prev) => ({ ...prev, newTech: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            placeholder="Add technology..."
            className="flex-1 rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
          />
          <button
            type="button"
            onClick={addTech}
            className="rounded border border-carbon-border px-3 py-2 text-text-muted transition-colors hover:border-neon hover:text-neon"
          >
            <HiOutlinePlus size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
