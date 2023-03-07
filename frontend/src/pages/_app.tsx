import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { api } from "../utils/api";
import Toast from "@/components/Toast";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        <Component {...pageProps} />
        <Toast />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
