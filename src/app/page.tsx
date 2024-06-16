import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReportResponse, SuapResponse } from "../../types/responses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Bimonthly from "@/components/tabs/bimonthly";
import { PencilRuler } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Yearly from "@/components/tabs/yearly";
import { auth } from "@/auth";

async function getData(): Promise<ReportResponse> {
  const session = await auth();

  if (!session) return "Unauthorized";

  console.log("session", session);

  try {
    const res = await fetch(
      `https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`,
      {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    const json: SuapResponse[] = await res.json();

    console.log("json", json);

    const filtered = json.filter((a) => a.situacao !== "Transferido");
    const data = filtered.reduce((a: any, b) => {
      const grades = [
        b.nota_etapa_1.nota,
        b.nota_etapa_2.nota,
        b.nota_etapa_3.nota,
        b.nota_etapa_4.nota,
      ].map((a) => a.replace(",", "."));

      return [
        ...a,
        {
          name: b.disciplina
            .slice(b.disciplina.indexOf("-") + 1, b.disciplina.length)
            .replace(/(III|II|I)$/, "")
            .trim(),
          grades,
          final:
            b.media_final_disciplina?.replace(",", ".") ||
            (
              grades
                .map((a) => Number(a))
                .reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2) || 0, 0) /
              (2 + 2 + 3 + 3)
            ).toFixed(1),
          frequency: b.percentual_carga_horaria_frequentada,
          studying: grades.every((a) => a === "" || a === null),
        },
      ];
    }, []);

    /*
     * This calculation is inaccurate
     * And it isn't implemented in the code
     */
    const frequency =
      (filtered.reduce(
        (a: any, b: any) => a + b.percentual_carga_horaria_frequentada,
        0
      ) -
        4) /
      filtered.length;

    return { frequency, subjects: data };
  } catch (e: any) {
    return e?.response.data.detail || "An internal error occurred";
  }
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-center sm:gap-6 gap-12">
        <Tabs defaultValue="yearly" className="sm:w-[400px] w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="yearly">Anual</TabsTrigger>
            <TabsTrigger value="bimonthly">Bimestral</TabsTrigger>
          </TabsList>
          <TabsContent value="yearly">
            <Yearly />
          </TabsContent>
          <TabsContent value="bimonthly">
            <Bimonthly />
          </TabsContent>
        </Tabs>

        <div className="block sm:hidden absolute left-0 bottom-[25.5rem] m-auto border-b w-full h-5"></div>

        <div className="flex flex-col items-center min-w-72 h-[400px]">
          <h4 className="text-sm font-medium leading-none px-3 py-3 h-9 mb-2 flex gap-2">
            Matérias <PencilRuler className="w-4 h-4" />
          </h4>
          <ScrollArea className="w-full sm:h-full h-96 rounded-xl border shadow [&_>_div_>_div]:!block [&_>_div_>_div]:w-full">
            <Accordion type="single" collapsible>
              {!data ? (
                [...Array(7)].map((_, i) => {
                  return (
                    <AccordionItem key={i} value={`skel-${i}`}>
                      <AccordionTrigger disabled className="px-4 space-x-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex flex-col gap-1 w-1/2 flex-1">
                          <Skeleton className="h-5 min-w-44" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  );
                })
              ) : data === "Unauthorized" ? (
                <div className="flex items-center justify-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mt-6 max-w-48 text-center">
                    Entre com o SUAP para visualizar suas matérias e notas.
                  </p>
                </div>
              ) : data === "Não encontrado." ||
                data === "An internal error occurred" ? (
                <div className="flex items-center justify-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mt-6 max-w-48 text-center">
                    Nenhuma matéria encontrada.
                  </p>
                </div>
              ) : (
                data?.subjects.map((subject, i) => (
                  <AccordionItem
                    className="last:border-none"
                    key={i}
                    value={subject.name}
                  >
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
                              <TableHead
                                key={i}
                                className="text-center text-xs"
                              >
                                {i + 1}º
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr>td:first-child]:rounded-l-xl [&_tr>td:last-child]:rounded-r-xl [&_tr>td]:h-9">
                          <TableRow className="hover:bg-transparent">
                            {[...Array(4)].map((_, i) => (
                              <TableCell
                                key={i}
                                className="font-medium text-center"
                              >
                                {Number(subject.grades[i]).toLocaleString(
                                  "pt-BR"
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
