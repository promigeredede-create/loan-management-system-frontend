const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

/* =========================================================
   GENERIC API TYPES
========================================================= */

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: unknown;
  stack?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/* =========================================================
   ROLES / COMMON TYPES
========================================================= */

export type UserRole =
  | "ADMIN"
  | "SALES"
  | "SANCTION"
  | "DISBURSEMENT"
  | "COLLECTION"
  | "BORROWER";

export type EmploymentMode = "SALARIED" | "SELF_EMPLOYED" | "UNEMPLOYED";

export type ApplicationStatus =
  | "DRAFT"
  | "BRE_FAILED"
  | "BRE_PASSED"
  | "SUBMITTED";

export type LoanStatus =
  | "APPLIED"
  | "SANCTIONED"
  | "REJECTED"
  | "DISBURSED"
  | "CLOSED";

/* =========================================================
   AUTH TYPES
========================================================= */

export interface AuthUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthResponseData {
  token: string;
  user: AuthUser;
}

export interface RegisterRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/* =========================================================
   USER TYPES
========================================================= */

export interface UserResponse {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: Exclude<UserRole, "BORROWER">;
}

export interface UpdateUserStatusRequest {
  isActive: boolean;
}

/* =========================================================
   APPLICATION TYPES
========================================================= */

export interface SavePersonalDetailsRequest {
  fullName: string;
  pan: string;
  dateOfBirth: string; // YYYY-MM-DD
  monthlySalary: number;
  employmentMode: EmploymentMode;
}

export interface SubmitApplicationRequest {
  loanAmount: number;
  tenureDays: number;
}

export interface ApplicationResponse {
  id: string;
  borrowerId: string;
  fullName: string;
  pan: string;
  dateOfBirth: string;
  monthlySalary: number;
  employmentMode: EmploymentMode;
  brePassed: boolean;
  breReasons: string[];
  salarySlipUrl?: string | null;
  salarySlipFileName?: string | null;
  salarySlipMimeType?: string | null;
  salarySlipSize?: number | null;
  status: ApplicationStatus;
  loanNumber?: string | null;
  submittedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   LOAN TYPES
========================================================= */

export interface LoanResponse {
  id: string;
  borrowerId: string;
  applicationId: string;
  loanNumber: string;
  amount: number;
  tenureDays: number;
  interestRate: number;
  simpleInterest: number;
  totalRepayment: number;
  status: LoanStatus;

  sanctionedBy?: string | null;
  sanctionedAt?: string | null;
  rejectedBy?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;

  disbursedBy?: string | null;
  disbursedAt?: string | null;

  totalPaid: number;
  outstandingAmount: number;
  closedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   PAYMENT TYPES
========================================================= */

export interface CreatePaymentRequest {
  loanId: string;
  utrNumber: string;
  amount: number;
  paymentDate: string; // YYYY-MM-DD
}

export interface PaymentResponse {
  id: string;
  loanId: string;
  borrowerId: string;
  utrNumber: string;
  amount: number;
  paymentDate: string;
  recordedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentResult {
  payment: PaymentResponse;
  loan: {
    id: string;
    loanNumber: string;
    status: LoanStatus;
    totalRepayment: number;
    totalPaid: number;
    outstandingAmount: number;
    closedAt?: string | null;
  };
}

/* =========================================================
   DASHBOARD TYPES
========================================================= */

export interface SalesLeadResponse {
  borrowerId: string;
  firstName: string;
  lastName?: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface InProgressApplicationResponse {
  applicationId: string;
  borrowerId: string;
  fullName: string;
  email?: string;
  pan: string;
  monthlySalary: number;
  employmentMode: EmploymentMode;
  brePassed: boolean;
  breReasons: string[];
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLoanResponse {
  id: string;
  borrowerId: string;
  applicationId: string;
  loanNumber: string;
  amount: number;
  tenureDays: number;
  interestRate: number;
  simpleInterest: number;
  totalRepayment: number;
  status: LoanStatus;

  borrowerName?: string;
  borrowerEmail?: string;

  sanctionedBy?: string | null;
  sanctionedAt?: string | null;
  rejectedBy?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;

  disbursedBy?: string | null;
  disbursedAt?: string | null;

  totalPaid: number;
  outstandingAmount: number;
  closedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface RejectLoanRequest {
  rejectionReason: string;
}

/* =========================================================
   TOKEN HELPERS
========================================================= */

const TOKEN_KEY = "lms_token";

export const tokenStorage = {
  get: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

/* =========================================================
   CORE REQUEST HELPER
========================================================= */

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
  headers?: HeadersInit;
  isFormData?: boolean;
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiSuccessResponse<T>> {
  const {
    method = "GET",
    body,
    token,
    headers = {},
    isFormData = false,
  } = options;

  const authToken = token ?? tokenStorage.get();

  const finalHeaders: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...headers,
  };

  if (authToken) {
    finalHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body
      ? isFormData
        ? (body as FormData)
        : JSON.stringify(body)
      : undefined,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result?.message || "Something went wrong");
  }

  return result as ApiSuccessResponse<T>;
}

/* =========================================================
   AUTH API
========================================================= */

export const authApi = {
  register: (payload: RegisterRequest) =>
    apiRequest<AuthResponseData>("/auth/register", {
      method: "POST",
      body: payload,
    }),

  login: (payload: LoginRequest) =>
    apiRequest<AuthResponseData>("/auth/login", {
      method: "POST",
      body: payload,
    }),

  getCurrentUser: () => apiRequest<AuthUser>("/auth/me"),
};

/* =========================================================
   USERS API
========================================================= */

export const usersApi = {
  getMyProfile: () => apiRequest<UserResponse>("/users/me"),

  getUsers: (params?: { role?: UserRole }) => {
    const search = new URLSearchParams();
    if (params?.role) search.set("role", params.role);

    const query = search.toString() ? `?${search.toString()}` : "";
    return apiRequest<UserResponse[]>(`/users${query}`);
  },

  getUserById: (userId: string) => apiRequest<UserResponse>(`/users/${userId}`),

  createEmployee: (payload: CreateEmployeeRequest) =>
    apiRequest<UserResponse>("/users/employee", {
      method: "POST",
      body: payload,
    }),

  updateUserStatus: (userId: string, payload: UpdateUserStatusRequest) =>
    apiRequest<UserResponse>(`/users/${userId}/status`, {
      method: "PATCH",
      body: payload,
    }),
};

/* =========================================================
   APPLICATIONS API
========================================================= */

export const applicationsApi = {
  savePersonalDetails: (payload: SavePersonalDetailsRequest) =>
    apiRequest<ApplicationResponse>("/applications/personal-details", {
      method: "POST",
      body: payload,
    }),

  uploadSalarySlip: (file: File) => {
    const formData = new FormData();
    formData.append("salarySlip", file);

    return apiRequest<ApplicationResponse>("/applications/upload-salary-slip", {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },

  submitApplication: (payload: SubmitApplicationRequest) =>
    apiRequest<{
      application: ApplicationResponse;
      loan: LoanResponse;
    }>("/applications/submit", {
      method: "POST",
      body: payload,
    }),

  getMyLatestApplication: () =>
    apiRequest<ApplicationResponse>("/applications/me/latest"),

  getMyApplicationById: (applicationId: string) =>
    apiRequest<ApplicationResponse>(`/applications/me/${applicationId}`),
};

/* =========================================================
   LOANS API
========================================================= */

export const loansApi = {
  getMyLoans: (params?: { status?: LoanStatus }) => {
    const search = new URLSearchParams();
    if (params?.status) search.set("status", params.status);

    const query = search.toString() ? `?${search.toString()}` : "";
    return apiRequest<LoanResponse[]>(`/loans/me${query}`);
  },

  getMyLoanById: (loanId: string) =>
    apiRequest<LoanResponse>(`/loans/me/id/${loanId}`),

  getMyLoanByNumber: (loanNumber: string) =>
    apiRequest<LoanResponse>(`/loans/me/number/${loanNumber}`),
};

/* =========================================================
   PAYMENTS API
========================================================= */

export const paymentsApi = {
  createPayment: (payload: CreatePaymentRequest) =>
    apiRequest<CreatePaymentResult>("/payments", {
      method: "POST",
      body: payload,
    }),

  getPaymentsByLoanId: (loanId: string) =>
    apiRequest<PaymentResponse[]>(`/payments/loan/${loanId}`),

  getPaymentById: (paymentId: string) =>
    apiRequest<PaymentResponse>(`/payments/${paymentId}`),
};

/* =========================================================
   DASHBOARD - SALES
========================================================= */

export const salesDashboardApi = {
  getLeads: () => apiRequest<SalesLeadResponse[]>("/dashboard/sales/leads"),

  getInProgressApplications: () =>
    apiRequest<InProgressApplicationResponse[]>(
      "/dashboard/sales/in-progress-applications",
    ),
};

/* =========================================================
   DASHBOARD - SANCTION
========================================================= */

export const sanctionDashboardApi = {
  getAppliedLoans: () =>
    apiRequest<DashboardLoanResponse[]>("/dashboard/sanction/applied-loans"),

  approveLoan: (loanId: string) =>
    apiRequest<DashboardLoanResponse>(`/dashboard/sanction/${loanId}/approve`, {
      method: "PATCH",
    }),

  rejectLoan: (loanId: string, payload: RejectLoanRequest) =>
    apiRequest<DashboardLoanResponse>(`/dashboard/sanction/${loanId}/reject`, {
      method: "PATCH",
      body: payload,
    }),
};

/* =========================================================
   DASHBOARD - DISBURSEMENT
========================================================= */

export const disbursementDashboardApi = {
  getSanctionedLoans: () =>
    apiRequest<DashboardLoanResponse[]>(
      "/dashboard/disbursement/sanctioned-loans",
    ),

  disburseLoan: (loanId: string) =>
    apiRequest<DashboardLoanResponse>(
      `/dashboard/disbursement/${loanId}/disburse`,
      {
        method: "PATCH",
      },
    ),
};

/* =========================================================
   DASHBOARD - COLLECTION
========================================================= */

export const collectionDashboardApi = {
  getDisbursedLoans: () =>
    apiRequest<DashboardLoanResponse[]>(
      "/dashboard/collection/disbursed-loans",
    ),

  getLoanPayments: (loanId: string) =>
    apiRequest<PaymentResponse[]>(`/dashboard/collection/${loanId}/payments`),

  addPayment: (payload: CreatePaymentRequest) =>
    apiRequest<CreatePaymentResult>("/dashboard/collection/payment", {
      method: "POST",
      body: payload,
    }),
};

/* =========================================================
   SINGLE EXPORT (OPTIONAL)
========================================================= */

export const api = {
  auth: authApi,
  users: usersApi,
  applications: applicationsApi,
  loans: loansApi,
  payments: paymentsApi,
  dashboard: {
    sales: salesDashboardApi,
    sanction: sanctionDashboardApi,
    disbursement: disbursementDashboardApi,
    collection: collectionDashboardApi,
  },
};
