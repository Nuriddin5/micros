using MicrosApi.Context;
using MicrosApi.Dtos;
using MicrosApi.Exception;
using MicrosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi.Services;

public class CategoryService : ICategoryService
{
    private readonly ApiDbContext _context;

    public CategoryService(ApiDbContext context)
    {
        _context = context;
    }


    public List<Category> GetCategoriesByUser(string username)
    {
        List<Category> categories;
        try
        {
            var user = UserChecking(username);

            categories = _context.categories.Include("Type").Where(category => category.User!.Id == user.Id)
                .ToList();
        }
        catch (System.Exception e)
        {
            throw new CustomException(e.Message);
        }

        return categories;
    }


    public Category AddCategory(CategoryDto categoryDto, string username)
    {
        var user = UserChecking(username);
        var isCategoryExistsForUser =
            _context.categories.Any(c => c.Name!.Equals(categoryDto.Name) && c.User!.Id == user.Id);
        if (isCategoryExistsForUser)
        {
            throw new CustomException("You already add this category name!");
        }

        if (string.IsNullOrEmpty(categoryDto.Name))
        {
            throw new CustomException("Category name can't be empty!");
        }

        if (string.IsNullOrEmpty(categoryDto.TypeName))
        {
            throw new CustomException("Type can't be empty!");
        }

        var type = _context.types.First(type => type.Name!.Equals(categoryDto.TypeName));

        if (type == null)
        {
            throw new CustomException("Type can't be empty!");
        }

        Category category = new()
        {
            Name = categoryDto.Name,
            Type = type,
            User = user
        };
        _context.categories.Add(category);
        _context.SaveChanges();

        return category;
    }

    public void DeleteCategory(int categoryId, string username)
    {
        var user = UserChecking(username);

        CategoryValidChecking(categoryId, user, out var category);

        _context.categories.Remove(category!);
        _context.SaveChanges();
    }


    public void EditCategory(int categoryId, CategoryDto categoryDto, string username)
    {
        var user = UserChecking(username);

        CategoryValidChecking(categoryId, user, out var category);

        if (string.IsNullOrEmpty(categoryDto.TypeName))
        {
            throw new CustomException("Type can't be empty!");
        }

        var type = _context.types.First(type => type.Name!.Equals(categoryDto.TypeName));

        if (type == null)
        {
            throw new CustomException("Type can't be empty!");
        }

        if (category!.Name!.Equals(categoryDto.Name) && category.Type!.Name!.Equals(categoryDto.TypeName))
        {
            throw new CustomException("You should edit or back!");
        }

        category.Name = categoryDto.Name;
        category.Type = type;

        _context.Entry(category).State = EntityState.Modified;

        _context.SaveChanges();
    }


    private void CategoryValidChecking(int categoryId, User? user, out Category? category)
    {
        category = _context.categories.Include("Type").First(category=> category.Id == categoryId);
        if (category == null || category.User!.Id != user!.Id)
        {
            throw new CustomException("Problem with account");
        }
    }

    private User UserChecking(string username)
    {
        var user = _context.users.FirstOrDefault(user => username.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }

        return user;
    }
}