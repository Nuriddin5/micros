namespace MicrosApi.Dtos;

public class RegisterDto
{
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public string? PrePassword { get; set; }
}