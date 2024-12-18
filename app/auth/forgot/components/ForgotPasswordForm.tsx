"use client";

import { ForgotPasswordSchema } from "@/schemas";
import { AuthCardWrapper } from "../../error/components/Cards/AuthCardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { forgotPassword } from "@/actions/forgot-password";
import { useState, useTransition } from "react";
import { FormSuccess } from "../../components/Forms/FormSuccess";
import { FormError } from "../../components/Forms/FormError";

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      forgotPassword(data)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setSuccess(undefined);
          setError("Something went wrong!");
        });
    });
  };

  return (
    <AuthCardWrapper
      headerTitle="Reset password"
      headerSubtitle="We'll email you a password reset link."
      redirectTitle="Back to login"
      redirectLink="/auth/login"
    >
      <div className="flex w-full flex-col">
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
          <FormSuccess message={success} />
          <FormError message={error} />
          <button
            type="submit"
            className="items-center justify-center rounded-md bg-sky-500 p-2 px-4 font-semibold text-white enabled:hover:bg-sky-600 disabled:bg-sky-600/45"
            disabled={isPending}
          >
            <span>Send Email</span>
          </button>
        </form>
      </div>
    </AuthCardWrapper>
  );
};
