"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { HiOutlineUpload, HiOutlineTrash, HiOutlineX } from "react-icons/hi";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altEn: string | null;
  altFa: string | null;
  createdAt: string;
}

export function MediaClient() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [editForm, setEditForm] = useState({ altEn: "", altFa: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    if (selected) {
      setEditForm({ altEn: selected.altEn || "", altFa: selected.altFa || "" });
    }
  }, [selected]);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) setItems(await res.json());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const media = await res.json();
          setItems((prev) => [media, ...prev]);
        }
      }
    } catch {
      /* ignore */
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAlt = async () => {
    if (!selected) return;
    const res = await fetch(`/api/media/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setSelected(updated);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{t("media")}</h1>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon disabled:opacity-50"
        >
          <HiOutlineUpload size={16} />
          {uploading ? t("saving") : t("upload")}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg border border-carbon-border bg-carbon-light" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-carbon-border bg-carbon-light p-8 text-center">
              <p className="font-mono text-sm text-text-muted">{t("noItems")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg border transition-colors ${
                    selected?.id === item.id
                      ? "border-neon ring-1 ring-neon"
                      : "border-carbon-border hover:border-neon/50"
                  }`}
                >
                  {isImage(item.mimeType) ? (
                    <img
                      src={item.url}
                      alt={item.altEn || item.originalName}
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-square items-center justify-center bg-carbon-light">
                      <span className="font-mono text-xs text-text-muted">{item.mimeType}</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/90 to-transparent p-2">
                    <p className="truncate font-mono text-xs text-text-secondary">{item.originalName}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    className="absolute right-1 top-1 rounded bg-carbon/80 p-1 text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
                  >
                    <HiOutlineTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="w-72 shrink-0 space-y-4 rounded-lg border border-carbon-border bg-carbon-light p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm text-neon">{t("details")}</h3>
              <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary">
                <HiOutlineX size={16} />
              </button>
            </div>

            {isImage(selected.mimeType) && (
              <img
                src={selected.url}
                alt={selected.altEn || selected.originalName}
                className="w-full rounded border border-carbon-border"
              />
            )}

            <div className="space-y-2 font-mono text-xs text-text-muted">
              <p><span className="text-text-secondary">{t("filename")}:</span> {selected.originalName}</p>
              <p><span className="text-text-secondary">{t("type")}:</span> {selected.mimeType}</p>
              <p><span className="text-text-secondary">{t("size")}:</span> {formatSize(selected.size)}</p>
              <p><span className="text-text-secondary">URL:</span> <span className="break-all text-neon">{selected.url}</span></p>
            </div>

            <div className="space-y-3 border-t border-carbon-border pt-3">
              <div>
                <label className="mb-1 block font-mono text-xs text-text-muted">Alt (EN)</label>
                <input
                  type="text"
                  value={editForm.altEn}
                  onChange={(e) => setEditForm((p) => ({ ...p, altEn: e.target.value }))}
                  className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon focus:outline-none"
                />
              </div>
              <div dir="rtl">
                <label className="mb-1 block font-mono text-xs text-text-muted">Alt (FA)</label>
                <input
                  type="text"
                  value={editForm.altFa}
                  onChange={(e) => setEditForm((p) => ({ ...p, altFa: e.target.value }))}
                  className="w-full rounded border border-carbon-border bg-carbon px-3 py-2 font-mono text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <button
                onClick={handleSaveAlt}
                className="w-full rounded border border-neon bg-neon/10 px-3 py-2 font-mono text-xs text-neon transition-colors hover:bg-neon hover:text-carbon"
              >
                {t("save")}
              </button>
            </div>

            <button
              onClick={() => handleDelete(selected.id)}
              className="w-full rounded border border-red-500/30 px-3 py-2 font-mono text-xs text-red-400 transition-colors hover:bg-red-500/10"
            >
              {t("delete")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
