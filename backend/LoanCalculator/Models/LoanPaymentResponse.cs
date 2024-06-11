#nullable disable

namespace LoanCalculator.Models;

public class LoanPaymentResponse
{
    public LoanPaymentResponse(string Response, IEnumerable<LoanPayment> Results) {
        this.Response = Response;
        this.Results = Results;
    }

    public string Response {get; set;}
    
    public IEnumerable<LoanPayment> Results {get; set;}
}