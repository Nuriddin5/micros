using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi.Models;

public class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool IsIncome { get; set; }


    //  [JsonIgnore] 
    public int UserId { get; set; }
}