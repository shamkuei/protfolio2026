"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { HiOutlinePlus, HiOutlinePencil } from "react-icons/hi";

const placeholderPosts = [
  { id: "1", titleEn: "Building Scalable Apps", status: "PUBLISHED", date: "2025-05-01" },
  { id: "2", titleEn: "Docker in Production", status: "PUBLISHED", date: "2025-04-15" },
  { id: "3", titleEn: "TypeScript Patterns", status: "DRAFT", date: "" },
];

export function PostsAdminClient() {
  const t = useTranslations("admin");

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

      {/* Posts table */}
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
            {placeholderPosts.map((post) => (
              <tr key={post.id} className="border-b border-carbon-border last:border-0">
                <td className="px-4 py-3 font-mono text-sm text-text-primary">
                  {post.titleEn}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs ${
                      post.status === "PUBLISHED"
                        ? "bg-neon/10 text-neon"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-text-muted">
                  {post.date || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-neon"
                  >
                    <HiOutlinePencil size={14} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
