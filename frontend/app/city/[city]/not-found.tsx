"use client";
import Link from "next/link";

export const metadata = {
  title: "404",
  description: "City not found",
};

export default function NotFound() {
  return (
    <main className="form-control flex h-screen flex-col">
      <div className="flex flex-1 flex-col   items-center justify-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-10 text-2xl font-bold">City does not exist.</p>
        <Link className="link mt-4" href="/">
          Go back
        </Link>
      </div>
    </main>
  );
}
