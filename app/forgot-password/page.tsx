import { KeyRound } from "lucide-react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] space-y-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 mb-1">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Reset your password
            </h1>
            <p className="text-sm text-slate-600">
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
