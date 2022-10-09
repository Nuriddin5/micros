namespace MicrosApi.Models;

public class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public Type? Type { get; set; }

    public User? User { get; set; }
}