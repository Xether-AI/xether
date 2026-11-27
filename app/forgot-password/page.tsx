import { KeyRound } from "lucide-react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.28)] space-y-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />

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
