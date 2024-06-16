"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Discord } from "@/components/icons/socials/discord";
import { Github } from "@/components/icons/socials/github";
import Image from "next/image";
import { Instagram } from "@/components/icons/socials/instagram";
import { Provider } from "../../../types/utils";
import { Separator } from "@/components/ui/separator";

const socials = [
  {
    username: "@moeefa",
    icons: [Discord, Github],
  },
  {
    username: "@schneider_com_x",
    icons: [Instagram],
  },
];

export default function SignIn() {
  const [providers, setProviders] = useState<Provider | null>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProviders(providers);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full">
        <Card className="w-2/5 max-w-96 min-h-[calc(100vh-160px)] flex flex-col">
          <CardHeader className="flex justify-center items-center">
            <Image src="/icon.svg" alt="Logo" width={80} height={80} />
            <CardDescription>
              Faça login com a sua conta do SUAP
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 flex flex-col justify-center items-center space-y-1">
            <p className="text-sm text-muted-foreground">Entrar com:</p>

            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  className="w-full"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              ))}
          </CardContent>
          <CardFooter className="mt-auto">
            <small className="text-xs text-pretty font-medium leading-none text-center text-muted-foreground">
              Quer nos ajudar a incluir mais Intitutos Federais nessa lista?
              <br />
              Entre em contato:
              <div className="flex flex-wrap gap-1 justify-center mt-1">
                {socials.map((social, i) => (
                  <Badge key={i} className="flex gap-1">
                    {social.icons.map((Icon, i) => (
                      <Icon key={i} />
                    ))}
                    {social.username}
                  </Badge>
                ))}
              </div>
            </small>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
