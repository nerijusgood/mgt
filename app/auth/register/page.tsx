import Link from "next/link";
import { AuthForm } from "@/components/marketing/auth-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-semibold">Create account</h1>
      <AuthForm mode="register" />
      <p className="text-sm text-muted-foreground">
        Already have an account? <Link href="/auth/login" className="underline">Log in</Link>
      </p>
    </div>
  );
}
