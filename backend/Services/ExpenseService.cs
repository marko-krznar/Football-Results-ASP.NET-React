using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public interface IExpenseService
{
    Task<List<Expense>> GetAll();
    Task<Expense> Create(Expense expense);
}

public class ExpenseService : IExpenseService
{
    private readonly AppDbContext _context;
    public ExpenseService(AppDbContext context) => _context = context;

    public async Task<List<Expense>> GetAll()
    {
        return await _context.Expenses.ToListAsync();
    }

    public async Task<Expense> Create(Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();
        return expense;
    }
}
