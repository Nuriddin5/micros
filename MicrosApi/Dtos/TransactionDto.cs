using MicrosApi.Models;

namespace MicrosApi.Dtos;

public class TransactionDto
{
    public string? Date { get; set; }

    public bool IsIncome { get; set; }

    public int Amount { get; set; }

    public string? CategoryName { get; set; }

    public string? Comment { get; set; }

    public int UserId { get; set; }
}