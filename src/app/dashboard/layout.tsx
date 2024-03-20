import React from "react";

import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { useToast } from "@/components/ui/use-toast";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  } else {
    return <Navbar>{children}</Navbar>;
  }
}
