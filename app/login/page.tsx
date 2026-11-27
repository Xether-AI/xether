import { redirect } from "next/navigation";

import { AuthLoginCard } from "@/components/auth/auth-login-card";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { isAuthenticated } from "@/lib/server/session";
import { safeRelativeRedirect } from "@/lib/security/redirect";

export default async function LoginPage(props: {
  searchParams: Promise<{ redirect?: string; error?: string; mode?: string }>;
}) {
  const searchParams = await props.searchParams;
  const appFallback = process.env.NEXT_PUBLIC_APP_URL || "/";
  const redirectTo = safeRelativeRedirect(searchParams.redirect, appFallback);

  if (await isAuthenticated()) redirect(redirectTo);

  const initialMode = searchParams.mode === "forgot" ? "forgot" : "login";

  return (
    <AuthSplitLayout>
      <AuthLoginCard
        redirectTo={redirectTo}
        initialError={searchParams.error}
        initialMode={initialMode}
      />
    </AuthSplitLayout>
  );
}
