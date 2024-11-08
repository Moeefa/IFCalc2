import { signIn, signOut } from "@/auth";

import { Button } from "./ui/button";
import { TextureButton } from "@/components/ui/texture-button";

export async function SignIn({
  provider,
  children,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof TextureButton>) {
  return (
    <form
      className={props.className}
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <TextureButton type="submit" {...props}>
        {children}
      </TextureButton>
    </form>
  );
}

export async function SignOut({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof TextureButton>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <TextureButton type="submit" {...props}>
        {children}
      </TextureButton>
    </form>
  );
}
