"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { contributors } from "@/auth";

export const Footer = () => {
  return (
    <footer className="border-t p-2 h-16 bg-background w-full flex gap-4 justify-center items-center">
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/32604322?v=4"
          alt="Luiz Henrique da Silva Xinaider"
        />
        <AvatarFallback>LH</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
          Luiz Henrique da Silva Xinaider
        </h4>
        <div className="flex justify-start gap-6">
          <Link
            className="text-sm underline flex items-center"
            rel="noopener noreferrer"
            href="https://github.com/Moeefa"
            target="_blank"
          >
            Github <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
          <Link
            className="text-sm underline flex items-center"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/xinaider"
            target="_blank"
          >
            LinkedIn <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      {!!contributors.length && (
        <>
          <Separator orientation="vertical" />
          <div className="flex flex-col">
            <div>Contribuidores:</div>
            <div className="flex space-x-3">
              {contributors.map((contributor, i) => (
                <HoverCard key={i}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center space-x-1">
                      <Avatar className="size-6">
                        <AvatarImage
                          src={contributor.image}
                          alt={contributor.name}
                        />
                        <AvatarFallback className="text-xs">
                          {contributor.name.at(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="link"
                        className="p-0 h-auto w-auto underline-offset-1 justify-start"
                      >
                        {contributor.name}
                      </Button>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={contributor.image} />
                        <AvatarFallback>
                          {contributor.name.at(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {contributor.name}
                        </h4>
                        <p className="text-sm">
                          Contribuiu com a autenticação do {contributor.origin}.
                        </p>
                        <div className="flex items-center pt-2">
                          {contributor.socials.map((social, i) => (
                            <Link
                              key={i}
                              rel="noopener"
                              target="_blank"
                              href={social.url}
                              className="text-xs text-muted-foreground underline flex items-center"
                            >
                              {social.name}{" "}
                              <ExternalLink className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </>
      )}
    </footer>
  );
};
