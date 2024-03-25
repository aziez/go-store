"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          NOT FOUND !
        </p>

        <p className="mt-4 text-gray-500">the page is your accses not found</p>

        <Button
          variant={"outline"}
          className=" text-blue-700  font-bold text-center mt-5 text-xl"
        >
          <Link href={"/dashboard"}>Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
