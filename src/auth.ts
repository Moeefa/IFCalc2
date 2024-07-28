import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Contributor } from "../types/utils";
import type { Provider } from "next-auth/providers";

/*
 * Contributors that helped adding more auth providers.
 */
export const contributors: Contributor[] = [];

const providers: Provider[] = [
  {
    id: "suap_ifmt",
    name: "Mato Grosso",
    type: "oauth",
    token: "https://suap.ifmt.edu.br/o/token/",
    userinfo: "https://suap.ifmt.edu.br/api/eu/",
    authorization: {
      url: "https://suap.ifmt.edu.br/o/authorize",
      params: { scope: "email identificacao" },
    },
    profile(profile) {
      return {
        id: profile.identificacstao,
        ...profile,
      };
    },
  },
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const config = {
  providers,
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        session.user.name = token.uid?.nome_social || token.uid?.nome_usual;
        session.user.image = token.uid?.foto;
        session.access_token = token.access_token as string;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      token.access_token ??= account?.access_token;
      token.uid ??= user;

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
