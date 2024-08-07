import { LogIn, LogOut } from "lucide-react";
import { SignIn, SignOut } from "./auth-buttons";

import { auth } from "@/auth";
import { cookies } from "next/headers";
import { ToggleTheme } from "./toggle-theme";

export const Header = async () => {
  const session = await auth();
  const csrfToken = cookies().get("authjs.csrf-token")?.value ?? "";

  return (
    <div className="fixed flex items-center w-full z-10 filter backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-2 px-8">
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
          {session?.user ?
            <SignOut variant="outline">
              Encerrar sessão <LogOut className="w-4 h-4 ml-2" />
            </SignOut>
          : <SignIn variant="outline">
              Entrar com o SUAP <LogIn className="w-4 h-4 ml-2" />
            </SignIn>
          }
        </div>
      </div>
    </div>
  );
};
