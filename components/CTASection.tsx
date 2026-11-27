"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { analytics } from "@/lib/analytics";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function CTASection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: api.submitEmailCapture,
    onSuccess: () => {
      toast.success("Thanks for your interest! We'll be in touch soon.");
      analytics.trackFormSubmit("cta_email_capture", "success");
      form.reset();
    },
    onError: (err) => {
      analytics.trackFormSubmit("cta_email_capture", "error");
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  return (
    <section className="w-full px-4 sm:px-6 pt-12 pb-6">
      <div
        className="max-w-300 mx-auto rounded-[20px] border border-emerald-200/90 px-6 sm:px-12 py-12 sm:py-14 flex flex-col items-center text-center gap-5 shadow-[0_20px_55px_-15px_rgba(14,165,122,0.15)]"
        style={{
          background:
            "radial-gradient(85% 95% at 50% 0%, #e6fbf4 0%, #ffffff 82%)",
        }}
      >
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-300/70 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-emerald-800">
          <span>Ready to Launch</span>
        </span>

        <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight text-foreground leading-tight">
          Data quality, made effortless.
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-140 leading-relaxed">
          Launch a Free Sandbox workspace in under two minutes or schedule an
          engineering review.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="w-full max-w-123 mt-1"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <div className="flex items-center justify-between gap-2 rounded-full bg-white border border-slate-300/90 pl-4 pr-1.5 py-1.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <Mail
                          className="w-4 h-4 text-slate-400 shrink-0"
                          aria-hidden="true"
                        />
                        <input
                          type="email"
                          placeholder="name@company.com"
                          autoComplete="email"
                          className="w-full bg-transparent text-sm text-foreground placeholder:text-slate-400 focus:outline-none"
                          {...field}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[13px] font-semibold hover:bg-primary/90 disabled:opacity-60 transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        <span>{mutation.isPending ? "Sending…" : "Get Started"}</span>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-rose-600" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
