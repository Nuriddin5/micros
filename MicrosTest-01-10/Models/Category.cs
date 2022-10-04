using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MicrosTest_01_10.Models;

public class Category
{
    
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool IsIncome { get; set; }

    [JsonIgnore]
    public User? User { get; set; }
}