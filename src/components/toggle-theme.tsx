"use client";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export function ToggleTheme() {
  const hasMounted = useHasMounted();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      className="group"
      data-theme={resolvedTheme}
      onSelect={(e) => e.preventDefault()}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      Tema {resolvedTheme === "dark" ? "claro" : "escuro"}
      <DropdownMenuShortcut>
        <div className="group-data-[theme=dark]:rotate-180 transition-transform delay-150 duration-300">
          {hasMounted && resolvedTheme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </div>
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
