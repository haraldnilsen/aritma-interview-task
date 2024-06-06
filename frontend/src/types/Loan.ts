export interface LoanTypeResponse {
  response: string;
  results: LoanType[];
}

export interface LoanType {
  name: string;
  interest: number;
}
