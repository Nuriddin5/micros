using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi.Models;

public class Transaction
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public bool IsIncome { get; set; }

    public int Amount { get; set; }

    //[JsonIgnore] 
    public Category Category { get; set; }

    public string? Comment { get; set; }


    // [JsonIgnore] 
    public User User { get; set; }
}