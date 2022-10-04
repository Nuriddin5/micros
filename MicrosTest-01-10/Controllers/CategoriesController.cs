using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MicrosTest_01_10.Context;
using MicrosTest_01_10.Dtos;
using MicrosTest_01_10.Models;
using MicrosTest_01_10.Services;

namespace MicrosTest_01_10.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly ICategoryService _service;

        public CategoriesController(ApiDbContext context, ICategoryService service)
        {
            _context = context;
            _service = service;
        }


        // GET: api/Categories/user
        [Authorize]
        [HttpGet("User")]
        public ActionResult<List<Category>> GetCategoriesByUser()
        {
            List<Category> categories;
            try
            {
                var username = HttpContext.User.Identity?.Name;
                categories = _service.GetCategoriesByUser(username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(categories);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Categories
        [HttpPost]
        public ActionResult<Category> PostCategory(CategoryDto categoryDto)
        {
            Category category;
            try
            {
                var username = HttpContext.User.Identity?.Name;
                category = _service.AddCategory(categoryDto, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                var username = HttpContext.User.Identity?.Name;
                _service.DeleteCategory(id, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}