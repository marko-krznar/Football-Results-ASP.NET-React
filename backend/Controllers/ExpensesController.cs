using backend.Entities;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class ExpensesController : ControllerBase
{
    private readonly IExpenseService _expenseService;


    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ExpenseDto>>> Get()
    {
        var expenses = await _expenseService.GetAll();
        var dtos = expenses.Select(e => new ExpenseDto
        {
            Id = e.Id,
            Option = e.Option,
            Amount = e.Amount,
            Date = e.Date,
            Description = e.Description
        }).ToList();
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseDto>> Create([FromBody] CreateExpenseDto dto)
    {
        var expense = new Expense
        {
            Option = dto.Option,
            Amount = dto.Amount,
            Date = dto.Date,
            Description = dto.Description
        };
        var created = await _expenseService.Create(expense);
        var resultDto = new ExpenseDto
        {
            Id = created.Id,
            Option = created.Option,
            Amount = created.Amount,
            Date = created.Date,
            Description = created.Description
        };
        return CreatedAtAction(nameof(Get), new { id = created.Id }, resultDto);
    }
}
