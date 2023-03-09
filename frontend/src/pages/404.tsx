import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>404</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="form-control flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 flex-col   items-center justify-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-10 text-2xl font-bold">
            Page not found. Try again later.
          </p>
          <Link className="link mt-4" href="/">
            Go back
          </Link>
        </div>
      </main>
    </>
  );
}
