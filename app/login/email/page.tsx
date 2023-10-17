"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  isLogInWithEmailLink,
  logInWithEmailLink,
  sendLogInLinkToEmail,
} from "@/../firebase/auth";

export default function Page() {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(() => {
    const email = window.localStorage.getItem("emailForSignIn");
    return email || "";
  });
  const link = window.location.href;
  const isLogin = isLogInWithEmailLink(link);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await logInWithEmailLink(email, link);
      } catch (error) {
        console.log(error);
        // TODO: show error in UI
      }
    } else {
      try {
        await sendLogInLinkToEmail(email);
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {success ? (
        <p className="mb-8 font-bold text-medium-grey">
          Done. Use the link we have sent to your email to log in to kanban.
        </p>
      ) : (
        <>
          <p className="mb-6 font-bold text-medium-grey">
            {isLogin
              ? "Enter your email address to log in."
              : "Enter an email address you want to log in with. We will send you a link that you can use to log in."}
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-4 w-full"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              className="mb-6 w-full"
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
    </>
  );
}
