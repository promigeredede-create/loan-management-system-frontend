"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { applicationsApi, type ApplicationResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";

type SalarySlipUploadProps = {
  disabled?: boolean;
  hasUploaded?: boolean;
  fileName?: string | null;
  onSuccess: (application: ApplicationResponse) => void;
};

export function SalarySlipUpload({
  disabled = false,
  hasUploaded = false,
  fileName,
  onSuccess,
}: SalarySlipUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setError("");

    if (!selectedFile) {
      setError("Please select a salary slip file.");
      return;
    }

    try {
      setIsUploading(true);
      const response = await applicationsApi.uploadSalarySlip(selectedFile);
      onSuccess(response.data);
      setSelectedFile(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload salary slip",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-card">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Step 2 · Upload salary slip
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload your latest salary slip to continue the loan application.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium text-slate-900">
              {hasUploaded && fileName
                ? `Uploaded: ${fileName}`
                : "Choose salary slip file"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Supported: PDF / image as allowed by backend upload rules.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            Select file
            <input
              type="file"
              className="hidden"
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedFile(file);
              }}
            />
          </label>
        </div>

        {selectedFile ? (
          <p className="mt-4 text-sm text-slate-700">
            Selected: {selectedFile.name}
          </p>
        ) : null}
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5">
        <Button
          type="button"
          onClick={handleUpload}
          disabled={disabled || isUploading}
          className="h-11 rounded-xl"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload salary slip"
          )}
        </Button>
      </div>
    </div>
  );
}
