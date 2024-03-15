"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [flip, setFlip] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col justify-center items-center px-4 sm:px-6 ">
            <Image
              width={1000}
              height={1000}
              className="h-12 w-auto"
              src="/dg.png"
              alt="Go-Design"
            />
            <h2 className="text-3xl my-4 font-bold text-green-900">DESIGN</h2>
          </div>

          <div className="mt-8">
            <motion.div
              drag
              dragConstraints={{
                top: 0,
                left: 0,
                right: 50,
                bottom: 50,
              }}
              animate={{
                rotateY: flip ? 180 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="mt-6"
            >
              <motion.div
                animate={{ rotateY: flip ? -180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {pathName == "/sign-in" ? "Login Form" : "Register Form"}
                    </CardTitle>
                    <CardDescription>
                      let login or register to help your store
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{children}</CardContent>
                </Card>

                <p className="text-sm text-right mt-4">
                  {pathName == "/sign-in" ? (
                    <>
                      Dont have an account ?{" "}
                      <Link href={"/sign-up"} className="text-indigo-500">
                        <span onClick={() => setFlip(!flip)}>Sign in</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      Have an account ?{" "}
                      <Link href="/sign-in" className="text-indigo-500">
                        <span onClick={() => setFlip(!flip)}>Sign up</span>
                      </Link>
                    </>
                  )}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          width={1000}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default Layout;
