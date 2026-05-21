"use client";

import { SiDigitalocean, SiDocker } from "react-icons/si";
import { useTranslations } from "next-intl";

const deployTargets = [
  {
    name: "DigitalOcean",
    icon: SiDigitalocean,
    color: "#0080FF",
    href: "#",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    href: "#",
  },
];

export function DeployBadges() {
  const t = useTranslations("devops");

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan">
        [{t("deploy")}]
      </h3>
      <div className="flex flex-wrap gap-3">
        {deployTargets.map((target) => (
          <a
            key={target.name}
            href={target.href}
            className="group flex items-center gap-2 rounded-lg border border-carbon-border bg-carbon-light px-4 py-3 transition-all hover:border-opacity-60"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = target.color;
              e.currentTarget.style.boxShadow = `0 0 15px ${target.color}22`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <target.icon size={20} color={target.color} />
            <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary">
              {t("deployTo", { platform: target.name })}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
