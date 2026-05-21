"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

interface Category {
  id: string;
  nameEn: string;
  nameFa: string;
  slug: string;
}

const placeholderCategories: Category[] = [
  { id: "1", nameEn: "Next.js", nameFa: "نکست جی‌اس", slug: "nextjs" },
  { id: "2", nameEn: "Docker", nameFa: "داکر", slug: "docker" },
  { id: "3", nameEn: "DevOps", nameFa: "دواپس", slug: "devops" },
  { id: "4", nameEn: "TypeScript", nameFa: "تایپ‌اسکریپت", slug: "typescript" },
  { id: "5", nameEn: "Architecture", nameFa: "معماری", slug: "architecture" },
];

export function CategoriesAdminClient() {
  const [categories, setCategories] = useState(placeholderCategories);
  const [newCat, setNewCat] = useState({ nameEn: "", nameFa: "", slug: "" });
  const [editing, setEditing] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCat.nameEn || !newCat.slug) return;
    const cat: Category = {
      id: Date.now().toString(),
      ...newCat,
    };
    setCategories((prev) => [...prev, cat]);
    setNewCat({ nameEn: "", nameFa: "", slug: "" });
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Categories</h1>

      {/* Add new */}
      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6 space-y-4">
        <h3 className="font-mono text-sm text-neon">[Add Category]</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Name (EN)</label>
            <input
              type="text"
              value={newCat.nameEn}
              onChange={(e) => setNewCat((prev) => ({ ...prev, nameEn: e.target.value }))}
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Name (FA)</label>
            <input
              type="text"
              value={newCat.nameFa}
              onChange={(e) => setNewCat((prev) => ({ ...prev, nameFa: e.target.value }))}
              dir="rtl"
              className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-text-muted">Slug</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCat.slug}
                onChange={(e) => setNewCat((prev) => ({ ...prev, slug: e.target.value }))}
                className="flex-1 rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="rounded border border-neon bg-neon/10 px-3 py-2 text-neon transition-colors hover:bg-neon hover:text-carbon"
              >
                <HiOutlinePlus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-lg border border-carbon-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-carbon-border bg-carbon-light">
              <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Name (EN)</th>
              <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Name (FA)</th>
              <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Slug</th>
              <th className="px-4 py-3 text-right font-mono text-xs text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-carbon-border last:border-0">
                <td className="px-4 py-3 font-mono text-sm text-text-primary">{cat.nameEn}</td>
                <td className="px-4 py-3 font-mono text-sm text-text-secondary" dir="rtl">{cat.nameFa}</td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted">{cat.slug}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-text-muted transition-colors hover:text-red-400"
                  >
                    <HiOutlineTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
