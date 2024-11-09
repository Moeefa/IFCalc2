"use client";

import { Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

import { TextureButton } from "@/components/ui/texture-button";
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TextureButton
            variant="icon"
            data-theme={resolvedTheme || "light"}
            className="group size-10"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <div className="group-data-[theme=dark]:rotate-180 transition-transform delay-150 duration-300">
              {hasMounted && resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </div>
          </TextureButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>Alternar temas</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
