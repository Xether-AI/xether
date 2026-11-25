import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";

import { SignupForm } from "@/components/auth/signup-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { isAuthenticated } from "@/lib/server/session";

export default async function SignupPage(props: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectTo =
    searchParams.redirect || process.env.NEXT_PUBLIC_APP_URL || "/";

  if (await isAuthenticated()) {
    redirect(redirectTo);
  }

  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-card/60 group-hover:border-primary/50 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
          </span>
          Back to home
        </Link>

        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
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
            redirectTo={searchParams.redirect}
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
