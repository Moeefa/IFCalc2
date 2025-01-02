"use client";

import { Badge } from "@/components/ui/badge";
import { SettingsContext } from "@/contexts/settings";
import { useContext } from "react";

export const AverageBadge = () => {
  const { averageType } = useContext(SettingsContext);

  return (
    <Badge
      className="h-4 text-muted-foreground mb-3 bg-transparent"
      variant="secondary"
    >
      {averageType === "weighted"
        ? "Média ponderada (ensino médio)"
        : "Média simples (ensino superior)"}
    </Badge>
  );
};
