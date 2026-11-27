"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LoginForm } from "@/components/auth/login-form";

export function AuthLoginCard({
  redirectTo,
  initialError,
  initialMode = "login",
}: {
  redirectTo?: string;
  initialError?: string;
  initialMode?: "login" | "forgot";
}) {
  const [mode, setMode] = useState<"login" | "forgot">(initialMode);
  const t = useTranslations("Auth");
  const subtitleSuffix = t("login.subtitleSuffix");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] space-y-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {mode === "login" ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 mb-1">
                <LogIn className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {t("login.title")}
              </h1>
              <p className="text-sm text-slate-600">
                {t("login.subtitlePrefix")}{" "}
                <span className="text-primary font-semibold">Xether AI</span>
                {subtitleSuffix ? ` ${subtitleSuffix}` : ""}
              </p>
            </div>

            <LoginForm
              redirectTo={redirectTo}
              initialError={initialError}
              onForgotPassword={() => setMode("forgot")}
            />
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 mb-1">
                <KeyRound className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {t("forgotPassword.title")}
              </h1>
              <p className="text-sm text-slate-600">
                {t("forgotPassword.subtitle")}
              </p>
            </div>

            <ForgotPasswordForm onBackToSignIn={() => setMode("login")} />
          </>
        )}
      </div>

      {mode === "login" && (
        <p className="mt-6 text-center text-sm text-slate-600">
          {t("login.noAccount")}{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-semibold"
          >
            {t("login.createAccount")}
          </Link>
        </p>
      )}
    </div>
  );
}
