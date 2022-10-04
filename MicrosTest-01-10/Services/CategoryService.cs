using MicrosTest_01_10.Context;
using MicrosTest_01_10.Dtos;
using MicrosTest_01_10.Exception;
using MicrosTest_01_10.Models;

namespace MicrosTest_01_10.Services;

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
            var user = _context.Users.FirstOrDefault(user => username!.Equals(user.UserName));
            if (user == null)
            {
                throw new CustomException("Uncaught error");
            }

            categories = _context.Categories.Where(category => category.User!.Id == user.Id)
                .ToList();
        }
        catch (System.Exception e)
        {
            throw new CustomException("Uncaught error");
        }

        return categories;
    }

    public Category AddCategory(CategoryDto categoryDto, string username)
    {
        var user = _context.Users.FirstOrDefault(user => username!.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }

        Category category = new()
        {
            Name = categoryDto.Name,
            IsIncome = categoryDto.IsIncome,
            User = user
        };
        _context.Categories.Add(category);
        _context.SaveChanges();

        return category;
    }

    public void DeleteCategory(int categoryId, string username)
    {
        var user = _context.Users.FirstOrDefault(user => username!.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }

        var category = _context.Categories.Find(categoryId);
        if (category == null || category.User!.Id != user.Id)
        {
            throw new CustomException("Problem with account");
        }

        _context.Categories.Remove(category);
        _context.SaveChanges();
    }

    public void EditCategory(CategoryDto categoryDto, string username)
    {
        var user = _context.Users.FirstOrDefault(user => username!.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }
    }
}