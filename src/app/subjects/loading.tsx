"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
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
  );
}
