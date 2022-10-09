namespace MicrosApi.Models;

public class Transaction
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int Amount { get; set; }

    public Category? Category { get; set; }

    public string? Comment { get; set; }

    public User? User { get; set; }
}