using System.ComponentModel.DataAnnotations.Schema;

namespace MicrosApi.Models;

public class User
{
    [Column("id")] public int Id { get; set; }

    [Column("full_name")] public string? FullName { get; set; }

    [Column("user_name")] public string? UserName { get; set; }

    [Column("password")] public string? Password { get; set; }
}