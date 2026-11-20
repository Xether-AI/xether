import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

export default function ForgotPasswordPage() {
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
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-400 mb-1">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we&apos;ll send you a secure reset
              link.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </AuthSplitLayout>
  );
}
