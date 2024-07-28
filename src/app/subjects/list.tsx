"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Subject } from "../../../types/responses";

export default function List({ data }: { data: Subject[] }) {
  return (
    <Accordion type="single" collapsible>
      {data.map((subject, i) => (
        <AccordionItem className="last:border-none" key={i} value={subject.id}>
          <AccordionTrigger className="flex justify-start px-4 gap-2 w-full hover:no-underline">
            <span className="flex text-xs items-center justify-center bg-secondary w-9 h-9 rounded-full hover:bg-muted/50">
              {Number(subject.final).toLocaleString("pt-BR")}
            </span>
            <div className="flex flex-col w-1/2 flex-1">
              <p className="truncate text-left text-base flex-1">
                {subject.name}
              </p>
              <p className="truncate text-left text-xs">
                {Number(subject.final) < 6 ? "Reprovado" : "Aprovado"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="w-full px-4">
            <Table className="w-full">
              <TableCaption>Notas bimestrais</TableCaption>
              <TableHeader className="[&_tr]:border-none [&_tr]:bg-muted [&_tr>th]:text-muted-foreground [&_tr]:rounded-xl [&_tr>th:first-child]:rounded-l-xl [&_tr>th:last-child]:rounded-r-xl [&_tr>th]:h-9">
                <TableRow>
                  {[...Array(4)].map((_, i) => (
                    <TableHead key={i} className="text-center text-xs">
                      {i + 1}º
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr>td:first-child]:rounded-l-xl [&_tr>td:last-child]:rounded-r-xl [&_tr>td]:h-9">
                <TableRow className="hover:bg-transparent">
                  {[...Array(4)].map((_, i) => (
                    <TableCell key={i} className="font-medium text-center">
                      {Number(subject.grades[i]).toLocaleString("pt-BR")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
