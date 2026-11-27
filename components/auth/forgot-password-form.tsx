"use client";

import { useMemo } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";

import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
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

export function ForgotPasswordForm() {
  const t = useTranslations("Auth");

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("forgotPassword.invalidEmail")),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: api.forgotPassword,
    onSuccess: () => {
      toast.success(t("forgotPassword.successToast"));
      form.reset();
    },
    onError: (err) => {
      const message =
        err instanceof ApiError ? err.message : t("forgotPassword.errorToast");
      toast.error(message);
    },
  });

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("forgotPassword.emailLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-600" />
                    <Input
                      placeholder={t("forgotPassword.emailPlaceholder")}
                      autoComplete="email"
                      className="h-11 rounded-xl pl-10 bg-slate-50/75 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-primary focus-visible:ring-primary/20"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-11 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("forgotPassword.submitting")}
              </>
            ) : (
              t("forgotPassword.submit")
            )}
          </Button>
        </form>
      </Form>

      <div className="pt-1 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-primary hover:border-primary/40 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("forgotPassword.backToSignIn")}
        </Link>
      </div>
    </div>
  );
}
