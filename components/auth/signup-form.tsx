"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AtSign, Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { api, safeRelativeRedirect } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Full name is required."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Please enter a valid email."),
  phone_number: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
}).refine((value) => value.password === value.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match." });

export function SignupForm({ redirectTo, initialError }: { redirectTo?: string; initialError?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => { if (initialError) toast.error(initialError) }, [initialError]);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", username: "", email: "", phone_number: "", password: "", confirmPassword: "" },
  });
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof schema>) => api.register({ full_name: values.name, username: values.username, email: values.email, phone_number: values.phone_number || undefined, password: values.password }),
    onSuccess: () => {
      toast.success("Account created. Redirecting…");
      window.location.assign(safeRelativeRedirect(redirectTo, process.env.NEXT_PUBLIC_APP_URL || "/"));
    },
    onError: (err) => toast.error(err instanceof ApiError ? err.message : "Sign up failed. Please try again."),
  });

  return <div className="space-y-5">
    <OAuthButtons />
    <Form {...form}><form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Full Name</FormLabel><FormControl><div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" /><Input placeholder="Jane Doe" autoComplete="name" className="h-10 rounded-xl pl-9 bg-background/60 border-border focus-visible:border-primary" {...field} /></div></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="username" render={({ field }) => <FormItem><FormLabel>Username</FormLabel><FormControl><div className="relative"><AtSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-400" /><Input placeholder="janedoe" autoComplete="username" className="h-10 rounded-xl pl-9 bg-background/60 border-border focus-visible:border-primary" {...field} /></div></FormControl><FormMessage /></FormItem>} />
      </div>
      <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Work Email</FormLabel><FormControl><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" /><Input placeholder="you@company.com" autoComplete="email" className="h-10 rounded-xl pl-9 bg-background/60 border-border focus-visible:border-primary" {...field} /></div></FormControl><FormMessage /></FormItem>} />
      <FormField control={form.control} name="phone_number" render={({ field }) => <FormItem><FormLabel>Phone Number (optional)</FormLabel><FormControl><div className="relative"><Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" /><Input placeholder="+1 234 567 890" autoComplete="tel" className="h-10 rounded-xl pl-9 bg-background/60 border-border focus-visible:border-primary" {...field} /></div></FormControl><FormMessage /></FormItem>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField control={form.control} name="password" render={({ field }) => <FormItem><FormLabel>Password</FormLabel><FormControl><div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" /><Input type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" className="h-10 rounded-xl pl-9 pr-9 bg-background/60 border-border focus-visible:border-primary" {...field} /><button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="confirmPassword" render={({ field }) => <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" /><Input type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" className="h-10 rounded-xl pl-9 bg-background/60 border-border focus-visible:border-primary" {...field} /></div></FormControl><FormMessage /></FormItem>} />
      </div>
      <Button type="submit" disabled={mutation.isPending} className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/15 mt-2">{mutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" />Creating account…</> : "Create account"}</Button>
    </form></Form>
  </div>
}
