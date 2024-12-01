"use client";

import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      login(data).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <div className="rounded-md bg-white p-12 shadow-md">
      <div className="flex w-[400px] flex-col items-center justify-center gap-y-12">
        <div className="flex w-full flex-col items-center gap-8">
          {/* Header */}
          <div className="flex w-full flex-col items-center gap-4">
            <Image
              src="/android-chrome-192x192.png"
              alt="ProjectMaster"
              width={32}
              height={32}
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="font-semibold">Sign In to Project Master</h1>
              <p className="text-sm font-light text-slate-500">
                Welcome back! Please sign in to continue
              </p>
            </div>
          </div>

          {/* Sign In Content */}
          <div className="flex w-full flex-col gap-8">
            {/* Social sign-in buttons */}
            <div className="flex w-full items-center gap-x-2 text-sm">
              <button className="flex w-full cursor-pointer items-center justify-center gap-4 border border-slate-200 p-2 transition-colors duration-300 ease-in-out hover:bg-slate-100">
                <FcGoogle className="h-4 w-4" />
                <span>Google</span>
              </button>
              <button className="flex w-full cursor-pointer items-center justify-center gap-4 border border-slate-200 p-2 transition-colors duration-300 ease-in-out hover:bg-slate-100">
                <FaGithub className="h-4 w-4" />
                <span>GitHub</span>
              </button>
            </div>
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 text-sm"
            >
              <label className="flex flex-col gap-2 font-semibold">
                Email address
                <input
                  {...register("email")}
                  className="w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-normal outline-none disabled:bg-slate-100"
                  disabled={isPending}
                />
                {errors.email && (
                  <span className="font-semibold text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2 font-semibold">
                Password
                <input
                  type="password"
                  {...register("password")}
                  className="w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-normal outline-none disabled:bg-slate-100"
                  disabled={isPending}
                />
                {errors.password && (
                  <span className="font-semibold text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <FormError message={error} />
              <FormSuccess message={success} />
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-sky-500 p-2 px-4 font-semibold text-white enabled:hover:bg-sky-600 disabled:bg-sky-600/45"
                disabled={isPending}
              >
                <span>Continue</span>
              </button>
            </form>
          </div>
        </div>
        {/* Sign up page redirect */}
        <div>
          <Link
            href={"/auth/register"}
            className="w-full text-sm underline-offset-4 hover:underline"
          >
            <p>Don&apos;t have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
