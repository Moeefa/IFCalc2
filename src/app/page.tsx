import Data, { getPeriods } from "@/app/subjects/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import Bimonthly from "@/components/tabs/bimonthly";
import Loading from "@/app/subjects/loading";
import { PencilRuler } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import Yearly from "@/components/tabs/yearly";

export default async function Home() {
  const periods = await getPeriods();

  const period = periods.at(0);

  return (
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
          Matérias <PencilRuler className="w-4 h-4" />{" "}
          {typeof period !== "string" && (
            <Badge>
              {period?.ano_letivo}/{period?.periodo_letivo}
            </Badge>
          )}
        </h4>
        <ScrollArea className="w-full sm:h-full h-96 rounded-xl border shadow [&>div>div]:!block [&>div>div]:w-full [&>div>div]:h-full [&>div>div>div]:h-full">
          <Suspense fallback={<Loading />}>
            <Data />
          </Suspense>
        </ScrollArea>
      </div>
    </div>
  );
}
