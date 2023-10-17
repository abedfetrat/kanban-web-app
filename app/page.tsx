"use client";

import { redirect } from "next/navigation";
import Home from "./home/Home";
import { useAuth } from "./providers/AuthProvider";

export default function Page() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    redirect("/login");
  }

  return <Home />;
}
