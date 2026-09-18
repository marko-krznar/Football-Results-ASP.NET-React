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

    [HttpPut("{id}")]
    public async Task<ActionResult<ExpenseDto>> Update(int id, [FromBody] UpdateExpenseDto dto)
    {
        var updated = await _expenseService.Update(id, dto);
        if (updated == null)
        {
            return NotFound();
        }

        var resultDto = new ExpenseDto
        {
            Id = updated.Id,
            Option = updated.Option,
            Amount = updated.Amount,
            Date = updated.Date,
            Description = updated.Description
        };
        return Ok(resultDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _expenseService.Delete(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}

