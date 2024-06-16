"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Bimonthly() {
  const [inputs, setInputs] = useState<number[]>([0, 0]);

  const total = (inputs[0] || 0) * 0.8 + (inputs[1] || 0);
  const result = Math.max(Math.min(total, 10), 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputs((prevState) => {
      const index = Number(e.target.id);
      const value = Number(e.target.value.replace(",", "."));

      const newInputs = [...prevState];
      newInputs[index] = value;

      return newInputs;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Média bimestral</CardTitle>
        <CardDescription>
          Cálculo da nota de um bimestre somado com o conceito.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-4">
          <div className="space-y-1 w-full">
            <Label htmlFor="grade-b">Nota</Label>
            <Input
              id="0"
              type="number"
              min={0}
              max={10}
              data-invalid={inputs[0] < 0 || inputs[0] > 10}
              className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
              onChange={handleChange}
              placeholder="Entre 0 e 10"
            />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="conc-b">Conceito</Label>
            <Input
              id="1"
              type="number"
              min={0}
              max={2}
              data-invalid={inputs[1] < 0 || inputs[1] > 2}
              className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
              onChange={handleChange}
              placeholder="Entre 1 e 2"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col border-t pt-4 items-center justify-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {Number(result.toPrecision(2)) < 6 ? "Reprovado" : "Aprovado"}
        </h4>
        <small className="text-sm font-medium leading-none text-muted-foreground">
          Nota bimestral:{" "}
          {Number(result.toPrecision(2)).toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
          })}
        </small>
      </CardFooter>
    </Card>
  );
}
