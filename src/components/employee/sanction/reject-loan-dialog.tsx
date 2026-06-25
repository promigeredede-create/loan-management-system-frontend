"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type RejectLoanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loanNumber?: string;
  isSubmitting?: boolean;
  onSubmit: (values: { rejectionReason: string }) => Promise<void> | void;
};

type RejectLoanFormValues = {
  rejectionReason: string;
};

export function RejectLoanDialog({
  open,
  onOpenChange,
  loanNumber,
  isSubmitting,
  onSubmit,
}: RejectLoanDialogProps) {
  const form = useForm<RejectLoanFormValues>({
    defaultValues: {
      rejectionReason: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset({ rejectionReason: "" });
    }
  }, [form, open]);

  const handleSubmit = async (values: RejectLoanFormValues) => {
    await onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reject loan application</DialogTitle>
          <DialogDescription className="leading-6">
            Add a clear reason for rejecting{" "}
            <span className="font-medium text-foreground">
              {loanNumber || "this loan"}
            </span>
            . This reason can be shown later for audit and operational tracking.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="rejectionReason"
              rules={{
                required: "Rejection reason is required",
                minLength: {
                  value: 10,
                  message: "Please enter at least 10 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rejection reason</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Example: Salary slip details could not be verified, so the loan cannot be approved at this stage."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Rejecting..." : "Reject loan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
