"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../../../components/Forms/FormError";
import { FormSuccess } from "../../../components/Forms/FormSuccess";
import { register as registerAction } from "@/actions/register";
import { useTransition, useState } from "react";
import { AuthCardWrapper } from "@/app/auth/error/components/Cards/AuthCardWrapper";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      registerAction(data).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <AuthCardWrapper
      headerTitle="Create an Account"
      headerSubtitle="Welcome! Please fill in the details to get started"
      redirectLink="/auth/login"
      redirectTitle="Already have an account?"
    >
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
            Name
            <input
              {...register("name")}
              className="w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-normal outline-none disabled:bg-slate-100"
              disabled={isPending}
            />
            {errors.name && (
              <span className="font-semibold text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
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
    </AuthCardWrapper>
  );
};
