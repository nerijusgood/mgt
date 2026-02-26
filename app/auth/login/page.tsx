import Link from "next/link";
import { AuthForm } from "@/components/marketing/auth-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-semibold">Log in</h1>
      <AuthForm mode="login" />
      <p className="text-sm text-muted-foreground">
        New here? <Link href="/auth/register" className="underline">Create an account</Link>
      </p>
    </div>
  );
}
