using MicrosTest_01_10.Dtos;

namespace MicrosTest_01_10.Services;

public interface IAuthService
{
    void Register(RegisterDto registerDto);
    bool Login(LoginDto loginDto);
    // bool Logout();
}