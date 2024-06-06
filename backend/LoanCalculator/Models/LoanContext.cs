using Microsoft.EntityFrameworkCore;

namespace LoanCalculator.Models;

public class LoanContext : DbContext
{
    public LoanContext(DbContextOptions<LoanContext> options) : base(options) {

    }

    public DbSet<LoanType> LoanTypes {get; set;} = null!; 
}