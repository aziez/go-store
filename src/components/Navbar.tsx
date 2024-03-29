"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FcBarChart,
  FcBusinessman,
  FcCalculator,
  FcCalendar,
  FcFolder,
  FcHome,
  FcMenu,
} from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: FcHome, current: false },
  {
    name: "Produk",
    href: "/dashboard/products",
    icon: FcBarChart,
    current: false,
  },
  {
    name: "Kategori",
    href: "/dashboard/categories",
    icon: FcFolder,
    current: false,
  },
  {
    name: "Transaksi",
    href: "/dashboard/transactions",
    icon: FcCalculator,
    current: false,
  },
  {
    name: "Report",
    href: "/dashboard/reports",
    icon: FcCalendar,
    current: false,
  },
  { name: "Customer", href: "#", icon: FcBusinessman, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

async function getDataUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
export default function Navbar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [updatedNavigation, setUpdatedNavigation] = useState(navigation);

  const [userData, setDataUser] = useState<any | null>(null);

  useEffect(() => {
    navigation.map((item) => ({
      ...item,
      current: item.href === pathname,
    }));
    const updatedNav = navigation.map((item) => ({
      ...item,
      current: item.href === pathname,
    }));

    setUpdatedNavigation(updatedNav);

    getDataUser().then((user) => {
      return setDataUser(user);
    });
  }, [pathname]);

  // console.log(userData);

  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/sign-in");

    // console.log("sihnOUTTTTT");
  };

  return (
    <nav>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <HiXMark
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Image
                        className="h-8 w-auto"
                        height={24}
                        width={24}
                        src={"/dg.png"}
                        alt="Go-Design"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {updatedNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <Link href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <Image
                            width={36}
                            height={36}
                            className="inline-block h-9 w-9 rounded-full"
                            src="/avatars/1.png"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            {userData?.email}
                          </p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            Logout
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Image
                  className="h-8 w-auto"
                  height={8}
                  width={8}
                  src={"/dg.png"}
                  alt="Your Company"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {updatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <div className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <Image
                      width={36}
                      height={36}
                      className="inline-block h-9 w-9 rounded-full"
                      src="/avatars/1.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex flex-col">
                    <p className="text-sm font-medium text-white">
                      {userData?.email}
                    </p>
                    <span
                      onClick={handleSignOut}
                      className="text-xs cursor-pointer font-medium text-gray-300 group-hover:text-gray-200"
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FcMenu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </nav>
  );
}
