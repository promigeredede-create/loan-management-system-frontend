import { applicationsApi } from "@/lib/api";
import { requireServerAuth } from "@/lib/server-auth";
import { BorrowerDashboard } from "@/components/borrower/borrower-dashboard";

export default async function BorrowerDashboardPage() {
  await requireServerAuth();

  // We cannot safely call applicationsApi.getMyLatestApplication() here directly
  // because applicationsApi currently reads token from localStorage in client flow.
  // So this page stays SSR-protected, but the data fetching + actions happen in client component.
  // Later, if needed, we can add a server-fetch helper that reads token from cookie and calls Express.

  return <BorrowerDashboard />;
}
