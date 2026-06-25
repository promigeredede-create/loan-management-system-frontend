import { ReactNode } from "react";
import { requireServerAuth } from "@/lib/server-auth";

export default async function BorrowerLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireServerAuth();

  return <>{children}</>;
}
