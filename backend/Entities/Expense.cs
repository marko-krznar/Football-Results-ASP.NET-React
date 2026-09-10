using System;

namespace backend.Entities;

public enum ExpenseOption
{
    HPD_PRSTEN,
    OTHER
}

public class Expense
{
    public int Id { get; set; }
    public ExpenseOption Option { get; set; }
    public decimal Amount { get; set; }
    // For HPD_PRSTEN expenses
    public DateOnly? Date { get; set; }
    public string? Description { get; set; }
}
