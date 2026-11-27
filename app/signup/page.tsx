import Link from "next/link";
import { redirect } from "next/navigation";
import { UserPlus } from "lucide-react";

import { SignupForm } from "@/components/auth/signup-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { isAuthenticated } from "@/lib/server/session";
import { safeRelativeRedirect } from "@/lib/security/redirect";

export default async function SignupPage(props: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const appFallback = process.env.NEXT_PUBLIC_APP_URL || "/";
  const redirectTo = safeRelativeRedirect(searchParams.redirect, appFallback);

  if (await isAuthenticated()) redirect(redirectTo);

  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.28)] space-y-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />

          <div className="space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 mb-1">
              <UserPlus className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Get started with{" "}
              <span className="text-primary font-medium">Xether AI</span>{" "}
              automated data infrastructure.
            </p>
          </div>

          <SignupForm
            redirectTo={redirectTo}
            initialError={searchParams.error}
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
