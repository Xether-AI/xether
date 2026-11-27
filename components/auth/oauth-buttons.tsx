"use client";

import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

interface OAuthButtonsProps {
  showDivider?: boolean;
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-900"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function GitLabIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#E24329"
        d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"
      />
      <path
        fill="#FC6D26"
        d="M12 22.13l4.05-12.46H7.95L12 22.13z"
      />
      <path
        fill="#FCA326"
        d="M12 22.13l-4.05-12.46H2.27L12 22.13zm0 0l4.05-12.46h5.68L12 22.13z"
      />
    </svg>
  );
}

export function OAuthButtons({ showDivider = true }: OAuthButtonsProps) {
  const googleEnabled =
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED !== "false";
  const githubEnabled =
    process.env.NEXT_PUBLIC_GITHUB_OAUTH_ENABLED !== "false";
  const gitlabEnabled =
    process.env.NEXT_PUBLIC_GITLAB_OAUTH_ENABLED !== "false";

  return (
    <>
      <div className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {googleEnabled && (
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-primary/40 shadow-2xs transition-all"
            >
              <a
                href="/api/auth/oauth2/google"
                className="flex items-center justify-center gap-2"
              >
                <GoogleIcon />
                <span>Google</span>
              </a>
            </Button>
          )}

          {githubEnabled && (
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-primary/40 shadow-2xs transition-all"
            >
              <a
                href="/api/auth/oauth2/github"
                className="flex items-center justify-center gap-2"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </Button>
          )}

          {gitlabEnabled && (
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-primary/40 shadow-2xs transition-all"
            >
              <a
                href="/api/auth/oauth2/gitlab"
                className="flex items-center justify-center gap-2"
              >
                <GitLabIcon />
                <span>GitLab</span>
              </a>
            </Button>
          )}
        </div>

        {/* Generic Enterprise SSO */}
        <Button
          asChild
          variant="outline"
          className="w-full h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-primary/40 shadow-2xs transition-all"
        >
          <a
            href="/api/auth/oauth2/start"
            className="flex items-center justify-center gap-2"
          >
            <KeyRound className="h-4 w-4 text-primary" />
            <span>Continue with Enterprise SSO</span>
          </a>
        </Button>
      </div>

      {showDivider && (
        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="bg-white px-3 text-slate-500 rounded-full">
              or continue with email
            </span>
          </div>
        </div>
      )}
    </>
  );
}
