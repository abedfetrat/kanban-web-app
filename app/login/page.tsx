import Button from "@/components/Button";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <p className="mb-6 font-bold text-medium-grey md:mb-8">
        Log in to sync your boards and tasks accross your devices.
      </p>
      <div className="flex flex-col gap-4">
        <Button color="primary" size="large" className="w-full">
          Continue with Google
        </Button>
        <Button color="primary" size="large" className="w-full">
          Continue with GitHub
        </Button>
        <Link href="/login/email">
          <Button color="primary" size="large" className="w-full">
            Continue with Email
          </Button>
        </Link>
        <div className="flex items-center gap-x-4">
          <span className="h-[2px] w-full bg-light-border dark:bg-dark-border"></span>
          <span className="text-medium-grey">or</span>
          <span className="h-[2px] w-full bg-light-border dark:bg-dark-border"></span>
        </div>
        <Button color="secondary" size="large" className="w-full">
          Continue as Guest
        </Button>
      </div>
    </>
  );
}
