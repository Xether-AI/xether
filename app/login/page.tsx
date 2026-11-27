import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { isAuthenticated } from "@/lib/server/session";
import { safeRelativeRedirect } from "@/lib/security/redirect";

export default async function LoginPage(props: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;
  const appFallback = process.env.NEXT_PUBLIC_APP_URL || "/";
  const redirectTo = safeRelativeRedirect(searchParams.redirect, appFallback);

  if (await isAuthenticated()) redirect(redirectTo);

  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] space-y-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 mb-1">
              <LogIn className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600">
              Sign in to access your{" "}
              <span className="text-primary font-semibold">Xether AI</span>{" "}
              workspace
            </p>
          </div>

          <LoginForm redirectTo={redirectTo} initialError={searchParams.error} />
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-semibold"
          >
            Create one for free
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
