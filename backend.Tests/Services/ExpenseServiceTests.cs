using backend.Data;
using backend.Entities;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Xunit;

using backend.Models;

namespace backend.Tests.Services;

public class ExpenseServiceTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly ExpenseService _service;

    public ExpenseServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new AppDbContext(options);
        _service = new ExpenseService(_context);
    }

    [Fact]
    public async Task GetAll_ShouldReturnAllExpenses()
    {
        // Arrange
        _context.Expenses.Add(new Expense { Option = ExpenseOption.HPD_PRSTEN, Amount = 100, Date = new DateOnly(2026, 1, 1), Description = "Test 1" });
        _context.Expenses.Add(new Expense { Option = ExpenseOption.OTHER, Amount = 50, Date = new DateOnly(2026, 1, 2), Description = "Test 2" });
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.GetAll();

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task Create_ShouldAddNewExpense()
    {
        // Arrange
        var expense = new Expense { Option = ExpenseOption.HPD_PRSTEN, Amount = 150, Date = new DateOnly(2026, 2, 1), Description = "New Expense" };

        // Act
        var result = await _service.Create(expense);

        // Assert
        result.Id.Should().NotBe(0);
        result.Amount.Should().Be(150);
        _context.Expenses.Should().ContainSingle(e => e.Id == result.Id);
    }

    [Fact]
    public async Task Update_ShouldModifyExpense_WhenExpenseExists()
    {
        // Arrange
        var existing = new Expense { Option = ExpenseOption.OTHER, Amount = 100, Date = new DateOnly(2026, 3, 1), Description = "Old" };
        _context.Expenses.Add(existing);
        await _context.SaveChangesAsync();

        var updatedInfo = new UpdateExpenseDto { Option = ExpenseOption.HPD_PRSTEN, Amount = 200, Date = new DateOnly(2026, 3, 2), Description = "Updated" };

        // Act
        var result = await _service.Update(existing.Id, updatedInfo);

        // Assert
        result.Should().NotBeNull();
        result!.Option.Should().Be(ExpenseOption.HPD_PRSTEN);
        result.Amount.Should().Be(200);
        result.Description.Should().Be("Updated");
    }

    [Fact]
    public async Task Update_ShouldReturnNull_WhenExpenseDoesNotExist()
    {
        // Arrange
        var updatedInfo = new UpdateExpenseDto { Option = ExpenseOption.HPD_PRSTEN, Amount = 200, Date = new DateOnly(2026, 3, 2) };

        // Act
        var result = await _service.Update(999, updatedInfo);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task Delete_ShouldRemoveExpense_WhenExpenseExists()
    {
        // Arrange
        var existing = new Expense { Option = ExpenseOption.OTHER, Amount = 50, Date = new DateOnly(2026, 4, 1) };
        _context.Expenses.Add(existing);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.Delete(existing.Id);

        // Assert
        result.Should().BeTrue();
        _context.Expenses.Should().BeEmpty();
    }

    [Fact]
    public async Task Delete_ShouldReturnFalse_WhenExpenseDoesNotExist()
    {
        // Act
        var result = await _service.Delete(999);

        // Assert
        result.Should().BeFalse();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
