import { signIn, signOut } from "@/auth";

import { Button } from "./ui/button";

export async function SignIn({
  provider,
  children,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      className={props.className}
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button type="submit" {...props}>
        {children}
      </Button>
    </form>
  );
}

export async function SignOut({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" {...props}>
        {children}
      </Button>
    </form>
  );
}
