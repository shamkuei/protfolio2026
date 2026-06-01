"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  titleEn: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

export function PostsAdminClient() {
  const t = useTranslations("admin");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?all=true")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{t("posts")}</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon"
        >
          <HiOutlinePlus size={16} />
          {t("newPost")}
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded border border-carbon-border bg-carbon-light p-4">
              <div className="h-4 w-1/3 rounded bg-carbon-lighter" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-lg border border-carbon-border bg-carbon-light p-8 text-center">
          <p className="font-mono text-sm text-text-muted">{t("noItems")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-carbon-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-carbon-border bg-carbon-light">
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Title</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Status</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Date</th>
                <th className="px-4 py-3 text-right font-mono text-xs text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-carbon-border last:border-0">
                  <td className="px-4 py-3 font-mono text-sm text-text-primary">{post.titleEn}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-xs ${
                        post.status === "PUBLISHED"
                          ? "bg-neon/10 text-neon"
                          : post.status === "ARCHIVED"
                          ? "bg-text-muted/10 text-text-muted"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-text-muted">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-neon"
                      >
                        <HiOutlinePencil size={14} />
                        {t("editPost")}
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
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
