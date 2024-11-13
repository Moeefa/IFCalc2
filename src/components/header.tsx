import { LogIn, LogOut } from "lucide-react";
import { SignIn, SignOut } from "./auth-buttons";

import { ToggleTheme } from "./toggle-theme";
import { auth } from "@/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <div className="fixed flex items-center w-full z-10 p-2 px-8 before:absolute before:top-0 before:left-0 before:right-0 before:h-[calc(100%+3rem)] before:pointer-events-none before:-z-10 before:[content:''] before:bg-background before:[mask:linear-gradient(to_bottom,rgb(0,0,0),rgba(0,0,0,0))]">
      <div className="justify-start">
        {session?.user && (
          <div className="hidden sm:flex justify-center items-center gap-4 text-sm">
            <p>Bem-vindo, {session.user.name}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex justify-between w-full flex-1 sm:flex-none sm:w-fit items-center gap-3">
          <ToggleTheme />
          {session?.user ? (
            <SignOut variant="destructive">
              Encerrar sessão <LogOut className="w-4 h-4 ml-2" />
            </SignOut>
          ) : (
            <SignIn variant="accent">
              Entrar com o SUAP <LogIn className="w-4 h-4 ml-2" />
            </SignIn>
          )}
        </div>
      </div>
    </div>
  );
};
