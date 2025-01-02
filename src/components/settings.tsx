"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";

import { CogIcon } from "lucide-react";
import Link from "next/link";
import { SettingsContext } from "@/contexts/settings";
import { TextureButton } from "@/components/ui/texture-button";
import { ToggleTheme } from "@/components/toggle-theme";

export const Settings = () => {
  const { averageType, setAverageType } = useContext(SettingsContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TextureButton className="size-10 group" variant="icon">
          <div>
            <CogIcon className="size-4 group-hover:rotate-180 duration-500 transition-transform" />
          </div>
        </TextureButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={5} className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tipo de média</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={averageType}
            onValueChange={(value) =>
              setAverageType(value as "weighted" | "simple")
            }
          >
            <DropdownMenuRadioItem
              onSelect={(e) => e.preventDefault()}
              value="weighted"
            >
              Média ponderada (ensino médio)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              onSelect={(e) => e.preventDefault()}
              value="simple"
            >
              Média simples (ensino superior)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ToggleTheme />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
