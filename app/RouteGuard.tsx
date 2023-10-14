"use client";

import { useRouter } from "next/navigation";

/* TODO: implement */
export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authorized = false;

  if (!authorized) {
    router.push("/login");
  }

  return authorized && children;
}
