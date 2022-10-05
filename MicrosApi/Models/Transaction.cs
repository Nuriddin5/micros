using System.ComponentModel.DataAnnotations.Schema;

namespace MicrosApi.Models;

public class Transaction
{
    [Column("id")]
    public int Id { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    [Column("is_income")]
    public bool IsIncome { get; set; }

    [Column("category_id")]
    public Category? Category { get; set; }

    [Column("comment")]
    public string? Comment { get; set; }

    [Column("user_id")]
    public User? User { get; set; }
}