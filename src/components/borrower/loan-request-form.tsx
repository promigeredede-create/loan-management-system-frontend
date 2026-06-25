"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  applicationsApi,
  type ApplicationResponse,
  type LoanResponse,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoanRequestFormProps = {
  onSuccess: (payload: {
    application: ApplicationResponse;
    loan: LoanResponse;
  }) => void;
};

export function LoanRequestForm({ onSuccess }: LoanRequestFormProps) {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenureDays, setTenureDays] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amount = Number(loanAmount || 0);
  const tenure = Number(tenureDays || 0);

  const preview = useMemo(() => {
    if (!amount || !tenure) return null;

    const interestRate = 12;
    const simpleInterest = (amount * interestRate * tenure) / (100 * 365);
    const totalRepayment = amount + simpleInterest;

    return {
      interestRate,
      simpleInterest,
      totalRepayment,
    };
  }, [amount, tenure]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!loanAmount.trim() || !tenureDays.trim()) {
      setError("Please enter loan amount and tenure.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await applicationsApi.submitApplication({
        loanAmount: Number(loanAmount),
        tenureDays: Number(tenureDays),
      });

      onSuccess(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-card">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Step 3 · Loan request
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose your loan amount and tenure to submit the application.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan amount</Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenureDays">Tenure (days)</Label>
            <Input
              id="tenureDays"
              type="number"
              placeholder="Enter tenure in days"
              value={tenureDays}
              onChange={(e) => setTenureDays(e.target.value)}
            />
          </div>
        </div>

        {preview ? (
          <div className="rounded-2xl border bg-slate-50 p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Interest rate
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {preview.interestRate}% p.a.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Estimated interest
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  ₹{preview.simpleInterest.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Estimated repayment
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  ₹{preview.totalRepayment.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-11 rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting application...
            </>
          ) : (
            "Submit application"
          )}
        </Button>
      </form>
    </div>
  );
}
