"use client";

import { useTranslations } from "next-intl";
import { UptimeWidget } from "./uptime-widget";
import { DeployBadges } from "./deploy-badges";

export function DevOpsSection() {
  const t = useTranslations("devops");

  return (
    <section className="border-t border-carbon-border bg-grid px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-neon">05.</span>
          <h2 className="text-3xl font-bold text-text-primary">
            {t("title")}
          </h2>
          <div className="h-px flex-1 bg-carbon-border" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <UptimeWidget />
          <DeployBadges />
        </div>
      </div>
    </section>
  );
}
