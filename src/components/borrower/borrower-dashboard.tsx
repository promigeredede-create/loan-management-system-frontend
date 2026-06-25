"use client";

import { useEffect, useMemo, useState } from "react";
import {
  applicationsApi,
  loansApi,
  type ApplicationResponse,
  type LoanResponse,
} from "@/lib/api";
import { ApplicationProgress } from "./application-progress";
import { PersonalDetailsForm } from "./personal-details-form";
import { SalarySlipUpload } from "./salary-slip-upload";
import { LoanRequestForm } from "./loan-request-form";
import { ApplicationSummary } from "./application-summary";

export function BorrowerDashboard() {
  const [application, setApplication] = useState<ApplicationResponse | null>(
    null,
  );
  const [loan, setLoan] = useState<LoanResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const applicationResponse =
          await applicationsApi.getMyLatestApplication();
        const latestApplication = applicationResponse.data;
        setApplication(latestApplication);

        if (latestApplication?.loanNumber) {
          try {
            const loanResponse = await loansApi.getMyLoanByNumber(
              latestApplication?.loanNumber,
            );
            setLoan(loanResponse?.data);
          } catch {
            setLoan(null);
          }
        }
      } catch (err) {
        // if no application exists yet, we just start fresh
        setApplication(null);
        setLoan(null);

        // optional: only show page error if it is not a not-found kind of case
        const message =
          err instanceof Error ? err.message.toLowerCase() : "unknown error";

        if (
          !message.includes("not found") &&
          !message.includes("application")
        ) {
          setPageError(
            err instanceof Error
              ? err.message
              : "Failed to load borrower dashboard",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const progressSteps = useMemo(() => {
    const hasPersonalDetails =
      !!application?.fullName &&
      !!application?.pan &&
      !!application?.dateOfBirth;

    const breFailed = !!application && !application.brePassed;
    const brePassed = !!application?.brePassed;
    const hasSalarySlip = !!application?.salarySlipUrl;
    const isSubmitted = application?.status === "SUBMITTED";
    const hasLoan = !!loan;

    return [
      {
        id: "personal-details",
        title: "Personal details",
        description: "Fill personal and employment information",
        state: hasPersonalDetails ? "completed" : "active",
      },
      {
        id: "bre-check",
        title: "BRE decision",
        description: breFailed
          ? "BRE failed. Review the reasons before continuing."
          : "System evaluates your profile based on submitted details.",
        state: breFailed
          ? "failed"
          : brePassed
            ? "completed"
            : hasPersonalDetails
              ? "active"
              : "pending",
      },
      {
        id: "salary-slip",
        title: "Salary slip upload",
        description: "Upload salary slip to continue application processing",
        state: hasSalarySlip ? "completed" : brePassed ? "active" : "pending",
      },
      {
        id: "loan-request",
        title: "Loan request",
        description: "Choose loan amount and tenure, then submit application",
        state:
          isSubmitted || hasLoan
            ? "completed"
            : hasSalarySlip
              ? "active"
              : "pending",
      },
    ] as const;
  }, [application, loan]);

  const canUploadSalarySlip = !!application?.brePassed;
  const canSubmitLoanRequest =
    !!application?.brePassed && !!application?.salarySlipUrl;

  const personalDetailsInitialValues = application
    ? {
        fullName: application.fullName,
        pan: application.pan,
        dateOfBirth: application.dateOfBirth?.slice(0, 10),
        monthlySalary: application.monthlySalary,
        employmentMode: application.employmentMode,
      }
    : undefined;

  return (
    <main className="min-h-screen bg-gradient-page">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Borrower dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete your loan application, upload documents, and track your
            loan journey from one place.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border bg-white p-8 shadow-card">
            <p className="text-sm text-muted-foreground">
              Loading your application workspace...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
            <div className="space-y-6">
              <ApplicationProgress
                steps={progressSteps.map((step) => ({
                  ...step,
                  state: step.state as
                    | "pending"
                    | "active"
                    | "completed"
                    | "failed",
                }))}
              />

              {application ? (
                <ApplicationSummary application={application} loan={loan} />
              ) : null}
            </div>

            <div className="space-y-6">
              {pageError ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                  {pageError}
                </div>
              ) : null}

              <PersonalDetailsForm
                initialValues={personalDetailsInitialValues}
                onSuccess={(nextApplication) => {
                  setApplication(nextApplication);
                  if (!nextApplication.loanNumber) {
                    setLoan(null);
                  }
                }}
              />

              {application && !application.brePassed ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                  <h3 className="text-lg font-semibold text-red-700">
                    BRE did not pass
                  </h3>
                  <p className="mt-2 text-sm text-red-700">
                    Your current details did not pass the eligibility rules.
                    Update your details and try again.
                  </p>

                  {application.breReasons.length > 0 ? (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-700">
                      {application.breReasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}

              <SalarySlipUpload
                disabled={!canUploadSalarySlip}
                hasUploaded={!!application?.salarySlipUrl}
                fileName={application?.salarySlipFileName}
                onSuccess={(nextApplication) => {
                  setApplication(nextApplication);
                }}
              />

              {canSubmitLoanRequest ? (
                <LoanRequestForm
                  onSuccess={({
                    application: nextApplication,
                    loan: nextLoan,
                  }) => {
                    setApplication(nextApplication);
                    setLoan(nextLoan);
                  }}
                />
              ) : (
                <div className="rounded-3xl border bg-slate-50 p-5 text-sm text-muted-foreground">
                  You can submit your loan request after BRE passes and salary
                  slip is uploaded successfully.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
