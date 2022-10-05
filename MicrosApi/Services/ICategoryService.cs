using MicrosApi.Dtos;
using MicrosApi.Models;

namespace MicrosApi.Services;

public interface ICategoryService
{
    List<Category> GetCategoriesByUser(string username);
    Category AddCategory(CategoryDto categoryDto, string username);
    void DeleteCategory(int categoryId, string username);
    void EditCategory(int categoryId,CategoryDto categoryDto, string username);
}