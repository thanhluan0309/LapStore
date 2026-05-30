import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#E5E7EB]/35 flex-wrap">
      <Link href="/" className="flex items-center gap-1 hover:text-[#00FF88] transition-colors">
        <Home className="w-3 h-3" /> Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-[#E5E7EB]/15" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#00FF88] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#E5E7EB]/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
