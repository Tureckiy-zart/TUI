"use client";

import { Button } from "@tenerife.music/ui";
import { useTheme } from "@tenerife.music/ui/theme";
import { Moon, Sun } from "lucide-react";

import { Search } from "@/components/docs/Search";

function ThemeSwitch() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      aria-label={`Switch to ${mode === "night" ? "day" : "night"} mode`}
    >
      {mode === "night" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Documentation</h1>
        </div>

        <div className="flex items-center gap-4">
          <Search />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
