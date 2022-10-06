using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MicrosApi.Context;

namespace MicrosApi.Authentication;

public class BasicAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly ApiDbContext _context;

    public BasicAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger,
        UrlEncoder encoder, ISystemClock clock, ApiDbContext context) : base(options, logger, encoder, clock)
    {
        _context = context;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
            return AuthenticateResult.Fail("No header found");

        var headerValue = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
        var bytes = Convert.FromBase64String(headerValue.Parameter ?? string.Empty);
        string credentials = Encoding.UTF8.GetString(bytes);
        if (!string.IsNullOrEmpty(credentials))
        {
            string[] array = credentials.Split(":");
            string username = array[0];
            string password = array[1];
            var user = _context.user.FirstOrDefault(item =>
                item.UserName == username && item.Password == password);
            if (user == null)
                return AuthenticateResult.Fail("UnAuthorized");

            var claim = new[] { new Claim(ClaimTypes.Name, username) };
            var identity = new ClaimsIdentity(claim, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);  
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }

        return AuthenticateResult.Fail("UnAuthorized");
    }
}