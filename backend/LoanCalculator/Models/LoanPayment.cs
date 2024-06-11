namespace backend;

public class LoanPayment
{
    public int Month { get; set; }
    public decimal PrincipalPayment { get; set; }
    public decimal InterestPayment { get; set; }
    public decimal TotalPayment { get; set; }
    public decimal RemainingPrincipal { get; set; }
} 