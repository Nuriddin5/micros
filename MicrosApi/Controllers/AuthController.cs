using MicrosApi.Dtos;
using MicrosApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MicrosApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/Register
        [Route("Register")]
        [HttpPost]
        public ActionResult Register(RegisterDto registerDto)
        {
            try
            {
                _authService.Register(registerDto);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok("User registered successfully");
        }

        [Route("login")]
        [HttpPost]
        public ActionResult Login(LoginDto loginDto)
        {
            try
            {
                _authService.Login(loginDto);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok("User registered successfully");
        }
    }
}