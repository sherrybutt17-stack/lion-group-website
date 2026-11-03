import { ClipboardList, HandHeart } from "lucide-react";
import type { ServiceContent } from "@/content/services";

const icons = { "hand-heart": HandHeart, "clipboard-list": ClipboardList } as const;

export function ServiceIcon({ name, className }: { name: ServiceContent["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" focusable="false" className={className} strokeWidth={1.75} />;
}
