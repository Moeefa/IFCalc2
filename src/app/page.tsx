import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Biannual from "@/components/tabs/biannual";
import Bimonthly from "@/components/tabs/bimonthly";
import Data from "@/app/subjects/data";
import Loading from "@/app/subjects/loading";
import { Suspense } from "react";
import Yearly from "@/components/tabs/yearly";

export default async function Home() {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-center sm:gap-6 gap-12 w-full">
      <Tabs defaultValue="yearly" className="sm:w-[400px] w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="yearly">Anual</TabsTrigger>
          <TabsTrigger value="bimonthly">Bimestral</TabsTrigger>
          <TabsTrigger value="biannual">Semestral</TabsTrigger>
        </TabsList>
        <TabsContent value="yearly">
          <Yearly />
        </TabsContent>
        <TabsContent value="bimonthly">
          <Bimonthly />
        </TabsContent>
        <TabsContent value="biannual">
          <Biannual />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col items-center min-w-72 relative">
        <div className="block sm:hidden absolute -left-8 bottom-[28rem] m-auto border-b w-screen h-5"></div>
        <Suspense fallback={<Loading />}>
          <Data />
        </Suspense>
      </div>
    </div>
  );
}
