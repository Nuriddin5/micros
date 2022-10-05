using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi.Models;

public class Category
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("name")]
    public string? Name { get; set; }

    [Column("is_income")]
    public bool IsIncome { get; set; }

    [Column("user_id")]
    [JsonIgnore]
    public User? User { get; set; }
}