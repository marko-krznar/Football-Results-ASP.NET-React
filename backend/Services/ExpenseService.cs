using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

using backend.Models;

namespace backend.Services;

public class ExpenseService : IExpenseService
{
    private readonly AppDbContext _context;
    public ExpenseService(AppDbContext context) => _context = context;

    public async Task<List<Expense>> GetAll()
    {
        return await _context.Expenses.ToListAsync();
    }

    public async Task<Expense?> GetById(int id)
    {
        return await _context.Expenses.FindAsync(id);
    }

    public async Task<Expense> Create(Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();
        return expense;
    }

    public async Task<Expense?> Update(int id, UpdateExpenseDto dto)
    {
        var existing = await _context.Expenses.FindAsync(id);
        if (existing == null) return null;

        existing.Option = dto.Option;
        existing.Amount = dto.Amount;
        existing.Date = dto.Date;
        existing.Description = dto.Description;

        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> Delete(int id)
    {
        var existing = await _context.Expenses.FindAsync(id);
        if (existing == null) return false;

        _context.Expenses.Remove(existing);
        await _context.SaveChangesAsync();
        return true;
    }
}

