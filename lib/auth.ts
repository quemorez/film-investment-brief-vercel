import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

function isAllowed(email?: string | null) {
  const allowlist = (process.env.APP_ALLOWLIST || "")
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);

  if (!email) return false;
  if (allowlist.length === 0) return true;
  return allowlist.includes(email.toLowerCase());
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/gmail.send",
          access_type: "offline",
          prompt: "consent"
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      return isAllowed(user.email);
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
};
