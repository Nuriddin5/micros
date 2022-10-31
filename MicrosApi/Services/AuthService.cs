using MicrosApi.Context;
using MicrosApi.Dtos;
using MicrosApi.Exception;
using MicrosApi.Models;
using Npgsql;

namespace MicrosApi.Services;

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
            throw new CustomException("FullNames length should be 3 length minimum");

        var username = registerDto.UserName;

        if (string.IsNullOrEmpty(username) || username.Length < 2)
            throw new CustomException("Usernames length should be 3 character minimum");

        bool isUserNameExists = _context.users.Any(user =>
            username.Equals(user.UserName));

        if (isUserNameExists)
            throw new CustomException("This username already taken");


        var password = registerDto.Password;

        var prePassword = registerDto.PrePassword;
        CheckingPasswordValidness(password,prePassword);


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

    private static void CheckingPasswordValidness(string password, string prePassword)
    {
        if (string.IsNullOrEmpty(password))
            throw new CustomException("Password is empty");

        if (!password.Any(char.IsUpper))
            throw new CustomException("Password  should have one uppercase letter least");

        if (password.Length < 8)
            throw new CustomException("Passwords length  should be 8 character minimum");


        if (password.All(char.IsLetterOrDigit))
            throw new CustomException("Password should have one special character");
        
        if (!password.Equals(prePassword))
            throw new CustomException("Passwords doesn't match");
    }

    public void Login(LoginDto loginDto)
    {
        var username = loginDto.UserName;

        if (string.IsNullOrEmpty(username) || username.Length < 2)
            throw new CustomException("Usernames length should be 3 character minimum");

        bool isUserNameExists = _context.users.Any(user =>
            username.Equals(user.UserName));

        if (!isUserNameExists)
        {
            throw new CustomException("Username or password incorrect");
        }

        var user = _context.users.Single(user => username.Equals(user.UserName));

        if (!loginDto.Password.Equals(user.Password))
            throw new CustomException("Username or password incorrect");
    }
}