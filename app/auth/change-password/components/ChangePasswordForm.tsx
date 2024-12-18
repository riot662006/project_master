"use client";

import { ChangePasswordSchema } from "@/schemas";
import { AuthCardWrapper } from "../../error/components/Cards/AuthCardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { changePassword, verifyToken } from "@/actions/change-password";
import { FormError } from "../../components/Forms/FormError";
import { BeatLoader } from "react-spinners";
import { FormSuccess } from "../../components/Forms/FormSuccess";

export const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    startTransition(() => {
      verifyToken(token).then((data) => {
        if (data.error) {
          setError(data.error);
        }
      });
    });
  }, [token]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      changePassword(token ?? "", data)
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

  if (isPending) {
    return (
      <AuthCardWrapper
        headerTitle="Change Password"
        headerSubtitle=""
        redirectTitle="Back to login"
        redirectLink="/auth/login"
      >
        <div className="flex w-full flex-col items-center gap-8">
          <BeatLoader />
        </div>
      </AuthCardWrapper>
    );
  }

  if (error || success) {
    return (
      <AuthCardWrapper
        headerTitle="Change Password"
        headerSubtitle=""
        redirectTitle="Back to login"
        redirectLink="/auth/login"
      >
        <div className="flex w-full flex-col items-center gap-8">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </AuthCardWrapper>
    );
  }

  return (
    <AuthCardWrapper
      headerTitle="Change Password"
      headerSubtitle="Type and confirm your new password in the fields below"
      redirectTitle="Back to login"
      redirectLink="/auth/login"
    >
      <div className="flex w-full flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-sm"
        >
          <label className="flex flex-col gap-2 font-semibold">
            Password
            <input
              {...register("password")}
              className="w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-normal outline-none disabled:bg-slate-100"
              disabled={isPending}
              type="password"
            />
            {errors.password && (
              <span className="font-semibold text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2 font-semibold">
            Confirm Password
            <input
              {...register("confirm_password")}
              className="w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-normal outline-none disabled:bg-slate-100"
              disabled={isPending}
              type="password"
            />
            {errors.confirm_password && (
              <span className="font-semibold text-red-500">
                {errors.confirm_password.message}
              </span>
            )}
          </label>
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
