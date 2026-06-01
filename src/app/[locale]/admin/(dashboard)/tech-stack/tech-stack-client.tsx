"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

interface TechItem {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  category: string;
  order: number;
}

const CATEGORIES = ["LANGUAGE", "FRAMEWORK", "DATABASE", "DEVOPS", "TOOL", "DESIGN"];

export function TechStackClient() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    icon: "",
    color: "",
    category: "TOOL",
    order: 0,
  });

  useEffect(() => {
    fetch("/api/tech-stack")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm({ name: "", icon: "", color: "", category: "TOOL", order: 0 });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editing;

    try {
      const res = await fetch(
        isEdit ? `/api/tech-stack/${editing}` : "/api/tech-stack",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      const saved = await res.json();

      if (isEdit) {
        setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
      } else {
        setItems((prev) => [...prev, saved]);
      }

      resetForm();
    } catch {
      /* ignore */
    }
  };

  const handleEdit = (item: TechItem) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      icon: item.icon || "",
      color: item.color || "",
      category: item.category,
      order: item.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/tech-stack/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editing === id) resetForm();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">{t("techStack")}</h1>

      <form onSubmit={handleSubmit} className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon">
          {editing ? t("editTech") : t("newTech")}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("icon")}</label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              placeholder="SiTypescript or si:typescript"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("color")}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.color || "#3178c6"}
                onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                className="h-9 w-10 rounded border border-carbon-border bg-carbon"
              />
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                placeholder="#3178c6"
                className="flex-1 rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("category")}</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">{t("order")}</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon"
          >
            {editing ? t("save") : t("newTech")}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded border border-carbon-border px-4 py-2 font-mono text-sm text-text-muted"
            >
              {t("cancel")}
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded border border-carbon-border bg-carbon-light p-4">
              <div className="h-4 w-1/3 rounded bg-carbon-lighter" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-carbon-border bg-carbon-light p-8 text-center">
          <p className="font-mono text-sm text-text-muted">{t("noItems")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-carbon-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-carbon-border bg-carbon-light">
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Name</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">{t("category")}</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">{t("color")}</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">{t("order")}</th>
                <th className="px-4 py-3 text-right font-mono text-xs text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-carbon-border last:border-0">
                  <td className="px-4 py-3 font-mono text-sm text-text-primary">
                    <span className="flex items-center gap-2">
                      {item.color && (
                        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      )}
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-neon/10 px-2 py-0.5 font-mono text-xs text-neon">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.color || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="text-text-muted hover:text-neon">
                        <HiOutlinePencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-text-muted hover:text-red-400">
                        <HiOutlineTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
