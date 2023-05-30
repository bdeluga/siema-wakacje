import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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

        const foundUser: UserObject = await fetch(
          "http://127.0.0.1:8000/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
          }
        )
          .then((res) => res.json())
          .catch((err) => console.error(err));

        const { id, login, email: email_, image } = foundUser;
        return {
          id,
          name: login,
          email: email_,
          image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
