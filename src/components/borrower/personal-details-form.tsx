"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  applicationsApi,
  type ApplicationResponse,
  type EmploymentMode,
  type SavePersonalDetailsRequest,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PersonalDetailsFormProps = {
  initialValues?: Partial<SavePersonalDetailsRequest>;
  onSuccess: (application: ApplicationResponse) => void;
};

export function PersonalDetailsForm({
  initialValues,
  onSuccess,
}: PersonalDetailsFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [pan, setPan] = useState(initialValues?.pan ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(
    initialValues?.dateOfBirth ?? "",
  );
  const [monthlySalary, setMonthlySalary] = useState(
    initialValues?.monthlySalary ? String(initialValues.monthlySalary) : "",
  );
  const [employmentMode, setEmploymentMode] = useState<EmploymentMode>(
    initialValues?.employmentMode ?? "SALARIED",
  );

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !fullName.trim() ||
      !pan.trim() ||
      !dateOfBirth.trim() ||
      !monthlySalary.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await applicationsApi.savePersonalDetails({
        fullName: fullName.trim(),
        pan: pan.trim().toUpperCase(),
        dateOfBirth,
        monthlySalary: Number(monthlySalary),
        employmentMode,
      });

      onSuccess(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save personal details",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-card">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Step 1 · Personal details
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill your personal and employment details for BRE evaluation.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pan">PAN</Label>
            <Input
              id="pan"
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthlySalary">Monthly salary</Label>
            <Input
              id="monthlySalary"
              type="number"
              placeholder="Enter monthly salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentMode">Employment mode</Label>
            <select
              id="employmentMode"
              value={employmentMode}
              onChange={(e) =>
                setEmploymentMode(e.target.value as EmploymentMode)
              }
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none"
            >
              <option value="SALARIED">Salaried</option>
              <option value="SELF_EMPLOYED">Self employed</option>
              <option value="UNEMPLOYED">Unemployed</option>
            </select>
          </div>
        </div>

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
              Saving details...
            </>
          ) : (
            "Save & run BRE"
          )}
        </Button>
      </form>
    </div>
  );
}
