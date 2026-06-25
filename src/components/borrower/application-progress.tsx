import { CheckCircle2, Circle, XCircle } from "lucide-react";

type StepState = "pending" | "active" | "completed" | "failed";

type Step = {
  id: string;
  title: string;
  description: string;
  state: StepState;
};

type ApplicationProgressProps = {
  steps: Step[];
};

export function ApplicationProgress({ steps }: ApplicationProgressProps) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-card">
      <h3 className="text-lg font-semibold text-slate-900">
        Application progress
      </h3>

      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border",
                    step.state === "completed" &&
                      "border-emerald-200 bg-emerald-50 text-emerald-600",
                    step.state === "active" &&
                      "border-primary/20 bg-primary/10 text-primary",
                    step.state === "failed" &&
                      "border-red-200 bg-red-50 text-red-600",
                    step.state === "pending" &&
                      "border-slate-200 bg-slate-50 text-slate-400",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {step.state === "completed" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : step.state === "failed" ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>

                {!isLast ? (
                  <div className="mt-2 h-8 w-px bg-slate-200" />
                ) : null}
              </div>

              <div className="pb-4">
                <p className="font-medium text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
