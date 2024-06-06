#nullable disable

namespace LoanCalculator.Models;

public class LoanTypeResponse
{
    public LoanTypeResponse(string Response, IEnumerable<LoanType> Results) {
        this.Response = Response;
        this.Results = Results;
    }

    public string Response {get; set;}
    public string Name {get; set;}
    
    public IEnumerable<LoanType> Results {get; set;}
}