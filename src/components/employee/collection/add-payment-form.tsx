"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type AddPaymentFormValues = {
  amount: number;
  utrNumber: string;
  paymentDate: string;
};

type AddPaymentFormProps = {
  defaultValues?: Partial<AddPaymentFormValues>;
  isSubmitting?: boolean;
  onSubmit: (values: AddPaymentFormValues) => Promise<void> | void;
};

export function AddPaymentForm({
  defaultValues,
  isSubmitting,
  onSubmit,
}: AddPaymentFormProps) {
  const form = useForm<AddPaymentFormValues>({
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      utrNumber: defaultValues?.utrNumber ?? "",
      paymentDate:
        defaultValues?.paymentDate ??
        new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = async (values: AddPaymentFormValues) => {
    await onSubmit({
      ...values,
      amount: Number(values.amount),
    });
  };

  return (
    <Card className="rounded-2xl border-border/70 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Add payment</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="amount"
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  Number(value) > 0 || "Amount should be greater than 0",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter payment amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="utrNumber"
              rules={{
                required: "UTR number is required",
                minLength: {
                  value: 6,
                  message: "UTR number looks too short",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UTR Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unique UTR number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentDate"
              rules={{
                required: "Payment date is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
