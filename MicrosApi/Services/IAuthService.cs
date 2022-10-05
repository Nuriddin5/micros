
using MicrosApi.Dtos;

namespace MicrosApi.Services;

public interface IAuthService
{
    void Register(RegisterDto registerDto);
    void Login(LoginDto loginDto);
    // bool Logout();
}