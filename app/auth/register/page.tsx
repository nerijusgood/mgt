import Link from "next/link";
import { AuthForm } from "@/components/marketing/auth-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1>Create account</h1>
      <p className="text-sm text-muted-foreground">Set up your family profile and start reserving toys with points.</p>
      <AuthForm mode="register" />
      <p className="text-sm text-muted-foreground">
        Already have an account? <Link href="/auth/login" className="underline underline-offset-2">Log in</Link>
      </p>
    </div>
  );
}
