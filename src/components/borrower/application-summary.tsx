import type { ApplicationResponse, LoanResponse } from "@/lib/api";

type ApplicationSummaryProps = {
  application: ApplicationResponse;
  loan?: LoanResponse | null;
};

export function ApplicationSummary({
  application,
  loan,
}: ApplicationSummaryProps) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-card">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Application summary
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your latest application and loan details.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Application</h4>

          <div className="mt-4 space-y-3 text-sm">
            <Row label="Full name" value={application.fullName || "-"} />
            <Row label="PAN" value={application.pan || "-"} />
            <Row
              label="Monthly salary"
              value={`₹${application.monthlySalary}`}
            />
            <Row label="Employment mode" value={application.employmentMode} />
            <Row
              label="BRE result"
              value={application.brePassed ? "Passed" : "Failed"}
            />
            <Row label="Status" value={application.status} />
            <Row
              label="Salary slip"
              value={application.salarySlipFileName || "Not uploaded"}
            />
          </div>

          {!application.brePassed && application.breReasons.length > 0 ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">BRE reasons</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                {application.breReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Loan</h4>

          {loan ? (
            <div className="mt-4 space-y-3 text-sm">
              <Row label="Loan number" value={loan.loanNumber} />
              <Row label="Amount" value={`₹${loan.amount}`} />
              <Row label="Tenure" value={`${loan.tenureDays} days`} />
              <Row label="Interest rate" value={`${loan.interestRate}%`} />
              <Row
                label="Simple interest"
                value={`₹${loan.simpleInterest.toFixed(2)}`}
              />
              <Row
                label="Total repayment"
                value={`₹${loan.totalRepayment.toFixed(2)}`}
              />
              <Row label="Loan status" value={loan.status} />
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed bg-white p-4 text-sm text-muted-foreground">
              Loan details will appear here after successful application
              submission.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-slate-900">{value}</span>
    </div>
  );
}
