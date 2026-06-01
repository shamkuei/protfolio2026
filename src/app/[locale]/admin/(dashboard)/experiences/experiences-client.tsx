"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";

interface Experience {
  id: string;
  type: string;
  titleEn: string;
  titleFa: string;
  companyEn: string | null;
  startDate: string;
  endDate: string | null;
  order: number;
}

const TYPES = ["WORK", "EDUCATION", "CERTIFICATION"];

export function ExperiencesClient() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("WORK");

  useEffect(() => {
    fetch("/api/experiences")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((i) => i.type === activeType);

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{t("experiences")}</h1>
        <Link
          href="/admin/experiences/new"
          className="flex items-center gap-2 rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon"
        >
          <HiOutlinePlus size={16} />
          {t("newExperience")}
        </Link>
      </div>

      <div className="flex gap-2">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${
              activeType === type
                ? "border-neon bg-neon/10 text-neon"
                : "border-carbon-border text-text-muted hover:border-neon/50 hover:text-text-secondary"
            }`}
          >
            {t(type.toLowerCase())}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded border border-carbon-border bg-carbon-light p-4">
              <div className="h-4 w-1/3 rounded bg-carbon-lighter" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-carbon-border bg-carbon-light p-8 text-center">
          <p className="font-mono text-sm text-text-muted">{t("noItems")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-carbon-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-carbon-border bg-carbon-light">
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Title</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">{t("company")}</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Period</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">{t("order")}</th>
                <th className="px-4 py-3 text-right font-mono text-xs text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-carbon-border last:border-0">
                  <td className="px-4 py-3 font-mono text-sm text-text-primary">{item.titleEn}</td>
                  <td className="px-4 py-3 font-mono text-sm text-text-muted">{item.companyEn || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">
                    {new Date(item.startDate).toLocaleDateString()} —{" "}
                    {item.endDate ? new Date(item.endDate).toLocaleDateString() : "Present"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{item.order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/experiences/${item.id}/edit`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-neon"
                      >
                        <HiOutlinePencil size={14} />
                        {t("edit")}
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-red-400"
                      >
                        <HiOutlineTrash size={14} />
                        {t("delete")}
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
