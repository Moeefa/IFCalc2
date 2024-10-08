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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PlusCircle } from "lucide-react";

export default function Biannual() {
  const [inputs, setInputs] = useState<number[]>([0]);

  const result = inputs.reduce((a, b) => a + b || 0, 0) / inputs.length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputs((prevState) => {
      const index = Number(e.target.dataset.index);
      const value = Number(e.target.value.replace(",", "."));

      const newInputs = [...prevState];
      newInputs[index] = value;

      return newInputs;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Média semestral{" "}
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => setInputs([...inputs, 0])}
          >
            <PlusCircle />
          </Button>
        </CardTitle>
        <CardDescription>
          Cálculo da média aritmética das notas do semestre.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 gap-x-4">
          {inputs.map((_, i) => (
            <div className="space-y-1" key={i}>
              <Label htmlFor={`grade-${i + 1}-y`}>{i + 1}º</Label>
              <Input
                type="number"
                data-index={i}
                data-invalid={inputs[i] < 0 || inputs[i] > 10}
                className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
                onChange={handleChange}
                id={`grade-${i + 1}-y`}
                placeholder="Entre 0 e 10"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex bg-muted rounded-b-xl flex-col border-t pt-4 items-center justify-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {Number(result.toPrecision(2)) < 6 ? "Reprovado" : "Aprovado"}
        </h4>
        <small className="text-sm font-medium leading-none text-muted-foreground">
          Nota final:{" "}
          {Number(result.toPrecision(2)).toLocaleString("pt-BR", {
            maximumFractionDigits: 1,
          })}
        </small>
      </CardFooter>
    </Card>
  );
}
