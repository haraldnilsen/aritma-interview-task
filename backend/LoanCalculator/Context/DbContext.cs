using LoanCalculator.Models;
using Microsoft.EntityFrameworkCore;

public class LoanDbContext: DbContext
{
    public LoanDbContext(DbContextOptions<LoanDbContext> options) : base(options)
    {
    }

    public DbSet<LoanType> LoanTypes { get; set; }
}