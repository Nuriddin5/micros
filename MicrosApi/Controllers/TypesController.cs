using MicrosApi.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Type = MicrosApi.Models.Type;

namespace MicrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public TypesController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Types
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Type>>> Gettypes()
        {
            return await _context.types.ToListAsync();
        }
    }
}