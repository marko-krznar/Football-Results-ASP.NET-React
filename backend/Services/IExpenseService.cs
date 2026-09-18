using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;
using backend.Models;

namespace backend.Services;

public interface IExpenseService
{
    Task<List<Expense>> GetAll();
    Task<Expense?> GetById(int id);
    Task<Expense> Create(Expense expense);
    Task<Expense?> Update(int id, UpdateExpenseDto dto);
    Task<bool> Delete(int id);
}

