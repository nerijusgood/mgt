import Link from "next/link";
import { AuthForm } from "@/components/marketing/auth-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1>Log in</h1>
      <p className="text-sm text-muted-foreground">Access your dashboard to manage reservations and returns.</p>
      <AuthForm mode="login" />
      <p className="text-sm text-muted-foreground">
        New here? <Link href="/auth/register" className="underline underline-offset-2">Create an account</Link>
      </p>
    </div>
  );
}
