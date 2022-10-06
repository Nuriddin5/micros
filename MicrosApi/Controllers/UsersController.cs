using MicrosApi.Context;
using MicrosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MicrosApi.Context;
using MicrosApi.Models;

namespace MicrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class usersController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public usersController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.user.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.user.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.user.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.user.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.user.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.user.Any(e => e.Id == id);
        }
    }
}