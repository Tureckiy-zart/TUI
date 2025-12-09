"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/getting-started" },
      { name: "Installation", href: "/installation" },
    ],
  },
  {
    title: "Design System",
    items: [
      { name: "Tokens", href: "/tokens" },
      { name: "Theming", href: "/theming" },
      { name: "Motion", href: "/motion" },
    ],
  },
  {
    title: "Components",
    items: [{ name: "Overview", href: "/components" }],
  },
  {
    title: "Guides",
    items: [
      { name: "Architecture", href: "/architecture" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 h-screen w-64 overflow-y-auto border-r bg-background p-4"
      aria-label="Main navigation"
    >
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold" aria-label="Tenerife UI Home">
          Tenerife UI
        </Link>
      </div>

      <nav className="space-y-6" aria-label="Documentation navigation">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      pathname === item.href
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
