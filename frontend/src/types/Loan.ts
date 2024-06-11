export interface LoanTypeResponse {
  response: string;
  results: LoanType[];
}

export interface LoanType {
  name: string;
  interest: number;
}

export interface LoanPaymentResponse {
  response: string;
  results: LoanPayment[];
}

export interface LoanPayment {
  month: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  remainingPrincipal: number;
}
