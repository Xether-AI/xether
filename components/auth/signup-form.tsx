"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  AtSign,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";

import { api, safeRelativeRedirect } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const inputClassName =
  "h-10 rounded-xl pl-9 bg-slate-50/75 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-primary focus-visible:ring-primary/20";

export function SignupForm({
  redirectTo,
  initialError,
}: {
  redirectTo?: string;
  initialError?: string;
}) {
  const t = useTranslations("Auth");
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(1, t("signup.nameRequired")),
          username: z.string().min(3, t("signup.usernameMin")),
          email: z.string().email(t("signup.invalidEmail")),
          phone_number: z.string().optional(),
          password: z.string().min(8, t("signup.passwordMin")),
          confirmPassword: z.string().min(8, t("signup.passwordMin")),
        })
        .refine((value) => value.password === value.confirmPassword, {
          path: ["confirmPassword"],
          message: t("signup.passwordsMismatch"),
        }),
    [t],
  );

  useEffect(() => {
    if (initialError) toast.error(initialError);
  }, [initialError]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof schema>) =>
      api.register({
        full_name: values.name,
        username: values.username,
        email: values.email,
        phone_number: values.phone_number || undefined,
        password: values.password,
      }),
    onSuccess: () => {
      toast.success(t("signup.successToast"));
      window.location.assign(
        safeRelativeRedirect(redirectTo, process.env.NEXT_PUBLIC_APP_URL || "/"),
      );
    },
    onError: (err) =>
      toast.error(
        err instanceof ApiError ? err.message : t("signup.errorToast"),
      ),
  });

  return (
    <div className="space-y-5">
      <OAuthButtons />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="space-y-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.fullNameLabel")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                      <Input
                        placeholder={t("signup.fullNamePlaceholder")}
                        autoComplete="name"
                        className={inputClassName}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.usernameLabel")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-600" />
                      <Input
                        placeholder={t("signup.usernamePlaceholder")}
                        autoComplete="username"
                        className={inputClassName}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("signup.workEmailLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-600" />
                    <Input
                      placeholder={t("signup.workEmailPlaceholder")}
                      autoComplete="email"
                      className={inputClassName}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("signup.phoneLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                    <Input
                      placeholder={t("signup.phonePlaceholder")}
                      autoComplete="tel"
                      className={inputClassName}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.passwordLabel")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={`${inputClassName} pr-9`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword
                            ? t("signup.hidePassword")
                            : t("signup.showPassword")
                        }
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.confirmPasswordLabel")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputClassName}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-11 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 mt-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("signup.submitting")}
              </>
            ) : (
              t("signup.submit")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
