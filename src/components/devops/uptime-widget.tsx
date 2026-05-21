"use client";

import { useTranslations } from "next-intl";

export function UptimeWidget() {
  const t = useTranslations("devops");

  // Placeholder data — will integrate with Uptime Kuma API
  const services = [
    { name: "Main Website", status: "operational", uptime: "99.98%", ping: "45ms" },
    { name: "API Server", status: "operational", uptime: "99.95%", ping: "23ms" },
    { name: "Database", status: "operational", uptime: "99.99%", ping: "8ms" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan">
        [{t("systemStatus")}]
      </h3>
      <div className="overflow-hidden rounded-lg border border-carbon-border">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 border-b border-carbon-border bg-carbon-light px-4 py-2 font-mono text-xs text-text-muted">
          <span>Service</span>
          <span>Status</span>
          <span>{t("uptime")}</span>
          <span>{t("ping")}</span>
        </div>
        {/* Rows */}
        {services.map((service) => (
          <div
            key={service.name}
            className="grid grid-cols-4 gap-4 border-b border-carbon-border px-4 py-3 last:border-0"
          >
            <span className="font-mono text-sm text-text-primary">
              {service.name}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-sm">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              <span className="text-neon">{service.status}</span>
            </span>
            <span className="font-mono text-sm text-text-secondary">
              {service.uptime}
            </span>
            <span className="font-mono text-sm text-text-secondary">
              {service.ping}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
