import Link from "next/link";
import { ShieldCheck, CreditCard, Landmark, BadgeCheck } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-page">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Loan Management System</h2>
                  <p className="text-sm text-muted-foreground">
                    Secure digital lending platform
                  </p>
                </div>
              </div>

              <h1 className="text-5xl font-bold leading-tight text-slate-900">
                Manage loans with
                <span className="block text-primary">
                  speed and confidence.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
                A centralized platform for borrowers, sales teams, sanction
                officers, disbursement teams and collections.
              </p>

              {/* Product Preview */}
              <div className="mt-12">
                <div className="rounded-[32px] border bg-white p-6 shadow-soft">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b pb-5">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Loan Portfolio Overview
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">₹12.4 Cr</h3>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                      +18.2%
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Applications
                        </span>
                      </div>

                      <p className="mt-3 text-xl font-bold">1,284</p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Disbursed
                        </span>
                      </div>

                      <p className="mt-3 text-xl font-bold">842</p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Collections
                        </span>
                      </div>

                      <p className="mt-3 text-xl font-bold">96%</p>
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Monthly Target
                      </span>
                      <span className="font-medium">78%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[78%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-lg rounded-[32px] border bg-white shadow-elevated">
              <CardHeader className="space-y-6 pb-6">
                {/* mobile logo */}
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">LMS</p>
                    <p className="text-sm text-muted-foreground">
                      Loan Management System
                    </p>
                  </div>
                </div>

                <div>
                  <CardTitle className="text-3xl font-bold">
                    Welcome back
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm">
                    Sign in to continue to your workspace.
                  </CardDescription>
                </div>

                {/* top trust row */}
                <div className="flex gap-3">
                  <div className="rounded-xl bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Secure Login
                  </div>

                  <div className="rounded-xl bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Role Based Access
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <LoginForm />

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Access your applications, loan approvals, disbursements and
                    collection workflows from one place.
                  </p>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
