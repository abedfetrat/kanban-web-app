"use client";

import {
  isLogInWithEmailLink,
  logInWithEmailLink,
  sendLogInLinkToEmail,
} from "@/../firebase/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
};

const STORAGE_EMAIL_KEY = "emailForSignIn";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: window.localStorage.getItem(STORAGE_EMAIL_KEY) || "",
    },
  });
  const [success, setSuccess] = useState(false);
  const link = window.location.href;
  const isLogin = isLogInWithEmailLink(link);

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    if (isLogin) {
      try {
        await logInWithEmailLink(email, link);
        window.localStorage.removeItem(STORAGE_EMAIL_KEY);
      } catch (error) {
        console.log(error);
        toast.error("Error while loggin in. Please try again.");
      }
    } else {
      try {
        await sendLogInLinkToEmail(email);
        setSuccess(true);
        window.localStorage.setItem(STORAGE_EMAIL_KEY, email);
      } catch (error) {
        console.log(error);
        toast.error("Error while sending login link. Please try again soon.");
      }
    }
  };

  return (
    <div className="h-full">
      {success ? (
        <>
          <h2 className="mb-4 text-xl font-bold">Success</h2>
          <p className="mb-8 font-bold text-medium-grey">
            Use the link we have sent to your email to log in.
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold">Log in with email</h2>
          <p className="mb-6 font-bold text-medium-grey">
            {isLogin
              ? "Enter your email address to log in."
              : "Enter an email address you want to log in with. We'll send you a link that you can use to log in."}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="mb-2 w-full"
              placeholder="Email address"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              error={!!errors?.email}
            />
            <Transition
              show={!!errors?.email}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as="p"
              className="mb-2 text-sm font-bold text-danger"
            >
              Please enter an email address.
            </Transition>
            <Button
              className="mb-12 mt-2 w-full"
              color="primary"
              size="large"
              type="submit"
            >
              {isLogin ? "Log in" : "Send link"}
            </Button>
          </form>
        </>
      )}
      <Link
        href="/login"
        className="flex items-center gap-x-2 text-medium-grey"
      >
        <svg width="12" height="9" viewBox="0 0 10 7" className="-rotate-90">
          <path
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            d="M9 6 5 2 1 6"
          />
        </svg>
        <p className="text-sm font-bold">Other ways to log in</p>
      </Link>
    </div>
  );
}
