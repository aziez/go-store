"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Define type for form data
interface RegisterFormValues {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(schema) });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    const supabase = createClient();
    const email = data?.email as string;
    const password = data?.password as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      toast({
        title: "Register Successfully",
        description: "Your account has been succesfully register",
        duration: 1000,
      });

      router.push("/sign-in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <Input
          id="username"
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            id="password"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            {...register("password")}
          ></Input>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        variant={"secondary"}
        type="submit"
        className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
      >
        Register
      </Button>
    </form>
  );
};
export default RegisterForm;
