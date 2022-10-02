using MicrosTest_01_10.Context;
using MicrosTest_01_10.Dtos;
using MicrosTest_01_10.Exception;
using MicrosTest_01_10.Models;
using Npgsql;

namespace MicrosTest_01_10.Services;

public class AuthService : IAuthService
{
    private readonly ApiDbContext _context;

    public AuthService(ApiDbContext context)
    {
        _context = context;
    }

    public void Register(RegisterDto registerDto)
    
    {
        var fullName = registerDto.FullName;
        if (string.IsNullOrEmpty(fullName) || fullName.Length < 2)
            throw new RegisterException("FullNames length should be 3 length minimum");

        var username = registerDto.UserName;

        if (string.IsNullOrEmpty(username) || username.Length < 2)
            throw new RegisterException("Usernames length should be 3 character minimum");

        bool isUserNameExists = _context.Users.Any(user =>
            username.Equals(user.UserName));

        if (isUserNameExists)
            throw new RegisterException("This username already taken");


        var password = registerDto.Password;
        if (string.IsNullOrEmpty(password))
            throw new RegisterException("Password is empty");

        if (!password.Equals(registerDto.PrePassword))
            throw new RegisterException("Passwords doesn't match ");

        if (password.Length < 6)
            throw new RegisterException("Passwords length  should be 6 character minimum");

        User user = new()
        {
            FullName = fullName,
            UserName = username,
            Password = password
        };
        try
        {
            _context.Add(user);
            _context.SaveChanges();
        }
        catch (System.Exception e)
        {
            throw new NpgsqlException("Server error");
        }
    }

    public bool Login(LoginDto loginDto)
    {
        throw new NotImplementedException();
    }
}