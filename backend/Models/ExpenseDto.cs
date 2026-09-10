using System;
using System.ComponentModel.DataAnnotations;
using backend.Entities;

namespace backend.Models;

public class ExpenseDto
{
    public int Id { get; set; }
    public ExpenseOption Option { get; set; }
    public decimal Amount { get; set; }
    public DateOnly? Date { get; set; }
    public string? Description { get; set; }
}

public class CreateExpenseDto
{
    [Required]
    public ExpenseOption Option { get; set; }
    [Required]
    [Range(0, double.MaxValue)]
    public decimal Amount { get; set; }
    public DateOnly? Date { get; set; }
    public string? Description { get; set; }
}
