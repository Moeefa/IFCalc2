"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  TextureCardContent,
  TextureCardStyled,
} from "@/components/ui/texture-card";

import { Accordion } from "@/components/ui/accordion";
import { PencilRuler } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <h4 className="text-sm font-medium leading-none px-3 py-3 h-9 mb-2 flex gap-2">
        Matérias <PencilRuler className="w-4 h-4" />{" "}
      </h4>
      <TextureCardStyled className="w-full h-96 [&>div>div]:!block [&>div>div]:w-full [&>div>div]:h-full [&>div>div>div]:h-full">
        <TextureCardContent className="h-full w-full p-0">
          <ScrollArea className="w-full sm:h-full h-96 rounded-xl border shadow [&>div>div]:!block [&>div>div]:w-full [&>div>div]:h-full [&>div>div>div]:h-full">
            <Accordion type="single" collapsible>
              {[...Array(7)].map((_, i) => (
                <AccordionItem key={i} value={`skel-${i}`}>
                  <AccordionTrigger disabled className="px-4 space-x-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex flex-col gap-1 w-1/2 flex-1">
                      <Skeleton className="h-5 min-w-44" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </TextureCardContent>
      </TextureCardStyled>
    </>
  );
}
