using MicrosApi.Dtos;
using MicrosApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MicrosApi.Context;
using MicrosApi.Models;

namespace MicrosApi.Controllers
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
        public async Task<IActionResult> PutCategory(int id, CategoryDto categoryDto)
        {
            try
            {
                var username = HttpContext.User.Identity?.Name;
                _service.EditCategory(id, categoryDto, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok("Successfully edited");
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
    }
}