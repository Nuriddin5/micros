using MicrosApi.Dtos;
using MicrosApi.Exception;
using Microsoft.AspNetCore.Mvc;
using MicrosApi.Context;
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
        if (string.IsNullOrEmpty(password))
            throw new CustomException("Password is empty");

        if (!password.Equals(registerDto.PrePassword))
            throw new CustomException("Passwords doesn't match ");

        if (password.Length < 6)
            throw new CustomException("Passwords length  should be 6 character minimum");

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

        if (string.IsNullOrEmpty(loginDto.Password) || loginDto.Password.Length < 6)
            throw new CustomException("Username or password incorrect");


        if (!loginDto.Password.Equals(user.Password))
            throw new CustomException("Username or password incorrect");
    }
}