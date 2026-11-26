"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
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
        className="max-w-[1200px] mx-auto rounded-[20px] border border-[#265955] px-6 sm:px-12 py-12 sm:py-14 flex flex-col items-center text-center gap-5 shadow-2xl"
        style={{
          background:
            "radial-gradient(85% 95% at 50% 0%, #133235 0%, #101722 86%)",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#10292B] border border-[#265955] px-3 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase text-primary">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Ready to Launch</span>
        </span>

        <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight text-foreground leading-tight">
          Data quality, made effortless.
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-[560px] leading-relaxed">
          Launch a Free Sandbox workspace in under two minutes or schedule an
          engineering review.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="w-full max-w-[492px] mt-1"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <div className="flex items-center justify-between gap-2 rounded-full bg-[#0A0E16] border border-[#2C3D54] pl-4 pr-1.5 py-1.5 focus-within:border-primary/60 transition-colors">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <Mail
                          className="w-4 h-4 text-slate-500 shrink-0"
                          aria-hidden="true"
                        />
                        <input
                          type="email"
                          placeholder="name@company.com"
                          autoComplete="email"
                          className="w-full bg-transparent text-sm text-foreground placeholder:text-slate-500 focus:outline-none"
                          {...field}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[13px] font-semibold hover:bg-primary/90 disabled:opacity-60 transition-all shrink-0 cursor-pointer"
                      >
                        <span>{mutation.isPending ? "Sending…" : "Get Started"}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-rose-400" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
