import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
type Credentials = {
  email: string;
  password: string;
};

interface UserObject {
  id: string;
  login: string;
  email: string;
  image: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (res.ok) {
          const {
            id,
            login,
            email: email_,
            image,
          } = (await res.json()) as UserObject;
          return {
            id,
            name: login,
            email: email_,
            image,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
