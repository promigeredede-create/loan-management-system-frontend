import Link from "next/link";
import {
  ShieldCheck,
  UserPlus,
  FileText,
  WalletCards,
  BadgeCheck,
} from "lucide-react";

import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-page">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Loan Management System</h2>
                  <p className="text-sm text-muted-foreground">
                    Fast digital borrower onboarding
                  </p>
                </div>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl">
                Start your loan application
                <span className="block text-primary">in minutes.</span>
              </h1>

              <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                Create your account, complete your details, upload documents,
                and track your loan journey from one secure workspace.
              </p>

              {/* Compact Borrower Preview */}
              <div className="mt-8">
                <div className="rounded-[28px] border bg-white p-5 shadow-soft">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Borrower Journey
                      </p>
                      <h3 className="mt-1 text-xl font-bold">4 simple steps</h3>
                    </div>

                    <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                      Start
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Sign up
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        Create account
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Details
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        Complete application
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <WalletCards className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Documents
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        Upload salary slip
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Track
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        Follow status
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-lg rounded-[32px] border bg-white shadow-elevated">
              <CardHeader className="space-y-5 pb-5">
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
                    Create your account
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm">
                    Register to start your loan application online.
                  </CardDescription>
                </div>

                {/* top trust row */}
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-xl bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Quick onboarding
                  </div>

                  <div className="rounded-xl bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Secure application
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <SignupForm />

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Already registered? Sign in to continue your application or
                    check your latest loan status.
                  </p>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Login
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
