import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <p className="mb-6 font-bold text-medium-grey">
        Enter the email address you want to log in with.
      </p>
      <Input className="mb-4 w-full" placeholder="Email address" />
      <Button className="mb-6 w-full" color="primary" size="large">
        Log in
      </Button>
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
