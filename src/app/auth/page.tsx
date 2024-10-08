import { providerMap } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { SignIn } from "@/components/auth-buttons";
import { Discord } from "@/components/icons/socials/discord";
import { Github } from "@/components/icons/socials/github";
import { Gmail } from "@/components/icons/socials/gmail";
import { Instagram } from "@/components/icons/socials/instagram";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const socials = [
  {
    username: "@moeefa",
    icons: [Discord, Github],
  },
  {
    username: "@schneider_com_x",
    icons: [Instagram],
  },
  {
    username: "moeefa@protonmail.com",
    icons: [Gmail],
  },
];

export default async function SignInPage() {
  return (
    <div className="flex justify-center w-full">
      <Card className="w-full sm:w-3/4 sm:max-w-96 min-h-[calc(100vh-160px)] flex flex-col">
        <CardHeader className="flex justify-center items-center rounded-t-xl">
          <Image src="/icon.svg" alt="Logo" width={80} height={80} />
          <CardDescription className="text-center">
            Faça login com a conta do SUAP de seu Instituto Federal para acessar
            suas notas e frequência
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-6 flex flex-col justify-center items-center space-y-1">
          <p className="text-sm text-muted-foreground">Entrar com:</p>

          {Object.values(providerMap).map((provider) => (
            <SignIn
              key={provider.id}
              provider={provider.id}
              variant="default"
              className="w-full"
            >
              {provider.name}
            </SignIn>
          ))}
        </CardContent>
        <Separator className="mt-auto" />
        <CardFooter className="p-3 rounded-b-xl bg-muted">
          <small className="text-xs text-pretty font-medium leading-none text-center text-muted-foreground">
            Quer ajudar a incluir seu Intituto Federal nessa lista? Entre em
            contato:
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
  );
}