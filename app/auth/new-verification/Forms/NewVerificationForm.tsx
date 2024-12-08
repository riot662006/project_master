"use client";

import { BeatLoader } from "react-spinners";
import { AuthCardWrapper } from "../../error/components/Cards/AuthCardWrapper";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { newVerification } from "@/actions/new-verification";
import { FormError } from "../../components/Forms/FormError";
import { FormSuccess } from "../../components/Forms/FormSuccess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  // Trigger verification process when the page loads
  useEffect(() => {
    if (!token) return;
    if (error || success) return; // if you already have a message

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        console.log("HELLo")
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
        setSuccess(undefined);
      });
  }, [token, error, success]);

  return (
    <AuthCardWrapper
      headerTitle="Verifying Your Email"
      headerSubtitle="Please wait while we confirm your verification."
      redirectLink="/auth/login"
      redirectTitle="Back to Login"
    >
      <div className="flex w-full flex-col items-center gap-8">
        {/* Display loading spinner during verification */}
        {!error && !success && <BeatLoader />}

        {/* Show error message if verification fails */}
        {error && <FormError message={error} />}

        {/* Show success message if verification succeeds */}
        {success && <FormSuccess message={success} />}
      </div>
    </AuthCardWrapper>
  );
};
